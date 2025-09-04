'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SimpleEarthBackgroundProps {
  className?: string;
  opacity?: number;
}

export default function SimpleEarthBackground({ 
  className = '', 
  opacity = 0.7 
}: SimpleEarthBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      preserveDrawingBuffer: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Texture loader with error handling
    const loader = new THREE.TextureLoader();
    
    // Create materials first with fallback colors
    const earthMaterial = new THREE.MeshBasicMaterial({
      color: 0x4A90E2,
      transparent: true,
      opacity: opacity * 0.8,
    });

    const cloudsMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: opacity * 0.3,
      depthWrite: false,
    });

    // Load textures with fallbacks
    loader.load(
      '/textures/earth-albedo.jpg',
      (texture) => {
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.warn('Earth texture failed to load:', error);
      }
    );

    loader.load(
      '/textures/clouds-earth.png',
      (texture) => {
        cloudsMaterial.map = texture;
        cloudsMaterial.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.warn('Clouds texture failed to load:', error);
      }
    );

    // Earth geometry and mesh - Made LARGER
    const earthGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(4, 0, -1);
    scene.add(earth);

    // Clouds layer - Made LARGER
    const cloudsGeometry = new THREE.SphereGeometry(2.52, 32, 32);
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    clouds.position.set(4, 0, -1);
    scene.add(clouds);

    // Stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      starsPositions[i] = (Math.random() - 0.5) * 100;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: opacity * 0.8,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Simple lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate Earth and clouds
      earth.rotation.y += 0.005;
      clouds.rotation.y += 0.007;

            // Gentle camera movement
      const time = Date.now() * 0.0001;
      camera.position.x = 8 + Math.cos(time) * 2;
      camera.position.z = 8 + Math.sin(time) * 2;
      camera.lookAt(4, 0, -1);

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

    // Cleanup function
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        try {
          mountRef.current.removeChild(renderer.domElement);
        } catch (e) {
          console.warn('Error removing renderer element:', e);
        }
      }
      
      // Dispose of Three.js objects
      earthGeometry.dispose();
      earthMaterial.dispose();
      cloudsGeometry.dispose();
      cloudsMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      renderer.dispose();
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
