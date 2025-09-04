'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface EarthBackgroundLightProps {
  className?: string;
  opacity?: number;
}

export default function EarthBackgroundLight({ 
  className = '', 
  opacity = 0.3 
}: EarthBackgroundLightProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    if (!mountRef.current) return;

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
    camera.position.set(8, 2, 8);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Texture loader
    const loader = new THREE.TextureLoader();

    // Earth textures with lower quality for performance
    const earthTexture = loader.load('/textures/earth-albedo.jpg');
    const cloudTexture = loader.load('/textures/clouds-earth.png');

    // Earth geometry and material (MUCH LARGER and simpler)
    const earthGeometry = new THREE.SphereGeometry(2.8, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({
      map: earthTexture,
      transparent: true,
      opacity: opacity * 0.8,
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(5, 0, -3);
    scene.add(earth);

    // Clouds layer (MUCH LARGER)
    const cloudsGeometry = new THREE.SphereGeometry(2.85, 32, 32);
    const cloudsMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: opacity * 0.4,
      depthWrite: false,
    });

    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    clouds.position.set(5, 0, -3);
    scene.add(clouds);

    // Minimal stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 500;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      starsPositions[i] = (Math.random() - 0.5) * 50;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: opacity * 0.6,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Simple ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Slow rotation
      earth.rotation.y += 0.001;
      clouds.rotation.y += 0.0015;

      // Gentle camera movement
      const time = Date.now() * 0.00005;
      camera.position.x = 8 + Math.cos(time) * 2;
      camera.position.z = 8 + Math.sin(time) * 2;
      camera.lookAt(5, 0, -3);

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
  }, [opacity]);

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
