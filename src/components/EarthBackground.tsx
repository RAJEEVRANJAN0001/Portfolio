'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FallbackBackground from './FallbackBackground';

interface EarthBackgroundProps {
  className?: string;
}

export default function EarthBackground({ className = '' }: EarthBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 3;
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      mountRef.current.appendChild(renderer.domElement);

      // Texture loader with error handling
      const loader = new THREE.TextureLoader();
      
      let texturesLoaded = 0;
      const totalTextures = 5;
      
      const onTextureLoad = () => {
        texturesLoaded++;
        if (texturesLoaded === totalTextures) {
          setIsLoaded(true);
        }
      };
      
      const onTextureError = (error: any) => {
        console.warn('Texture loading error:', error);
        setHasError(true);
      };

      // Earth textures with error handling
      const earthTexture = loader.load('/textures/earth-albedo.jpg', onTextureLoad, undefined, onTextureError);
      const bumpTexture = loader.load('/textures/earth-bump.jpg', onTextureLoad, undefined, onTextureError);
      const cloudTexture = loader.load('/textures/clouds-earth.png', onTextureLoad, undefined, onTextureError);
      const nightTexture = loader.load('/textures/earth-night-lights.png', onTextureLoad, undefined, onTextureError);
      const oceanMaskTexture = loader.load('/textures/earth-land-ocean-mask.png', onTextureLoad, undefined, onTextureError);

    // Earth geometry and material
    const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.02,
      normalMap: bumpTexture,
      normalScale: new THREE.Vector2(1, 1),
      emissiveMap: nightTexture,
      emissive: new THREE.Color(0x444444),
      emissiveIntensity: 0.5,
      shininess: 100,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);

    // Clouds layer
    const cloudsGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(clouds);

    // Stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      starsPositions[i] = (Math.random() - 0.5) * 100;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate Earth
      earth.rotation.y += 0.002;
      
      // Rotate clouds slightly faster
      clouds.rotation.y += 0.003;

      // Slow camera orbit
      const time = Date.now() * 0.0001;
      camera.position.x = Math.cos(time) * 5;
      camera.position.z = Math.sin(time) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.clear();
      renderer.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      cloudsGeometry.dispose();
      cloudsMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
    } catch (error) {
      console.error('Earth background error:', error);
      setHasError(true);
    }
  }, []);

  // Show fallback if there's an error or textures haven't loaded
  if (hasError || !isLoaded) {
    return <FallbackBackground className={className} />;
  }

  return (
    <>
      <div 
        ref={mountRef} 
        className={`absolute inset-0 ${className}`}
        style={{ 
          pointerEvents: 'none', 
          zIndex: 1 
        }}
      />
      {!isLoaded && <FallbackBackground className={className} />}
    </>
  );
}
