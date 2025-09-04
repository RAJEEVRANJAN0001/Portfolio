'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface LargeEarthSectionProps {
  className?: string;
}

export default function LargeEarthSection({ className = '' }: LargeEarthSectionProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      preserveDrawingBuffer: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Texture loader
    const loader = new THREE.TextureLoader();
    
    // Create materials with fallback colors
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x4A90E2,
      transparent: false,
      shininess: 100,
    });

    const cloudsMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });

    // Load Earth textures with the dramatic clouds texture
    loader.load(
      '/textures/earth-albedo.jpg',
      (texture) => {
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      (error) => console.warn('Earth texture failed to load:', error)
    );

    loader.load(
      '/textures/earth-bump.jpg',
      (texture) => {
        earthMaterial.bumpMap = texture;
        earthMaterial.bumpScale = 0.05;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      (error) => console.warn('Bump texture failed to load:', error)
    );

    loader.load(
      '/textures/earth-night-lights.png',
      (texture) => {
        earthMaterial.emissiveMap = texture;
        earthMaterial.emissive = new THREE.Color(0x444444);
        earthMaterial.emissiveIntensity = 0.8;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      (error) => console.warn('Night lights texture failed to load:', error)
    );

    // Load the dramatic clouds texture from the attachment
    loader.load(
      '/textures/clouds-earth.png',
      (texture) => {
        cloudsMaterial.map = texture;
        cloudsMaterial.needsUpdate = true;
      },
      undefined,
      (error) => console.warn('Clouds texture failed to load:', error)
    );

    // Large Earth geometry and mesh
    const earthGeometry = new THREE.SphereGeometry(3, 64, 64);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);

    // Large clouds layer
    const cloudsGeometry = new THREE.SphereGeometry(3.05, 64, 64);
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(clouds);

    // Enhanced star field
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      starsPositions[i] = (Math.random() - 0.5) * 200;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 5, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    scene.add(directionalLight);

    // Rim lighting for dramatic effect
    const rimLight = new THREE.DirectionalLight(0x00ccff, 1);
    rimLight.position.set(-10, 0, -5);
    scene.add(rimLight);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Earth rotation
      earth.rotation.y += 0.002;
      
      // Clouds rotation (slightly faster)
      clouds.rotation.y += 0.003;

      // Gentle camera orbit
      const time = Date.now() * 0.00005;
      camera.position.x = Math.cos(time) * 8;
      camera.position.z = Math.sin(time) * 8;
      camera.lookAt(0, 0, 0);

      // Stars rotation
      stars.rotation.y += 0.0001;

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
  }, []);

  return (
    <section className={`relative h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* 3D Earth Background */}
      <div 
        ref={mountRef} 
        className="absolute inset-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full flex justify-end pr-8 md:pr-16 lg:pr-24">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Name with animation */}
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              Rajeev Ranjan Pratap Singh
            </motion.h2>
            
            {/* Tagline with animation */}
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-cyan-300 mb-8 font-medium"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
            >
              The future isn’t AI replacing us—it’s us reimagining what’s possible with AI."


            </motion.p>
            
            {/* Buttons with staggered animation */}
            <motion.div
              className="flex flex-col space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden group w-full"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                viewport={{ once: true }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 font-semibold">Discover My Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.a 
                href="/resume.pdf" 
                target="_blank" 
                className="px-8 py-3 bg-gray-800/60 backdrop-blur-sm border border-cyan-500/40 rounded-full hover:bg-gray-700/60 hover:border-cyan-400/60 transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center"
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(6, 182, 212, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="font-semibold">Resume</span>
              </motion.a>
              
              <motion.a 
                href="https://github.com/RAJEEVRANJAN0001" 
                target="_blank" 
                className="px-8 py-3 bg-gray-800/60 backdrop-blur-sm border border-cyan-500/40 rounded-full hover:bg-gray-700/60 hover:border-cyan-400/60 transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center"
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(6, 182, 212, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="font-semibold">GitHub</span>
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com/in/rajeev-ranjan-pratap-singh" 
                target="_blank" 
                className="px-8 py-3 bg-gray-800/60 backdrop-blur-sm border border-cyan-500/40 rounded-full hover:bg-gray-700/60 hover:border-cyan-400/60 transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center"
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(6, 182, 212, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.9, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="font-semibold">LinkedIn</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
