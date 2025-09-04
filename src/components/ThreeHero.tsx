import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../contexts/ThemeContext';

export default function ThreeHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 15);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Simple Star Field
    const createStarField = () => {
      const starsGeometry = new THREE.BufferGeometry();
      const starCount = 1500;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      
      for (let i = 0; i < starCount; i++) {
        // Distribute stars in a sphere around the camera
        positions[i * 3] = (Math.random() - 0.5) * 800;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 800;
        
        // Star colors - white with slight variations
        const intensity = 0.5 + Math.random() * 0.5;
        colors[i * 3] = intensity;
        colors[i * 3 + 1] = intensity;
        colors[i * 3 + 2] = intensity;
        
        // Vary star sizes
        sizes[i] = Math.random() * 2 + 0.5;
      }
      
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      const starsMaterial = new THREE.PointsMaterial({
        vertexColors: true,
        transparent: true,
        opacity: isDark ? 0.8 : 0.6,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });
      
      return new THREE.Points(starsGeometry, starsMaterial);
    };

    const stars = createStarField();
    scene.add(stars);

    // Simple Floating Spheres (Planets/Moons)
    const createFloatingSpheres = () => {
      const spheres: THREE.Mesh[] = [];
      
      for (let i = 0; i < 5; i++) {
        const radius = Math.random() * 0.5 + 0.3;
        const geometry = new THREE.SphereGeometry(radius, 16, 16);
        
        const material = new THREE.MeshBasicMaterial({
          color: isDark ? 
            new THREE.Color().setHSL(Math.random(), 0.7, 0.6) :
            new THREE.Color().setHSL(Math.random(), 0.5, 0.4),
          transparent: true,
          opacity: 0.7
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        
        // Position spheres around the scene
        sphere.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        );
        
        spheres.push(sphere);
        scene.add(sphere);
      }
      
      return spheres;
    };

    const spheres = createFloatingSpheres();

    // Simple Connecting Lines (Space Network)
    const createSpaceNetwork = () => {
      const networkGroup = new THREE.Group();
      
      // Create connection points
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < 8; i++) {
        points.push(new THREE.Vector3(
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15
        ));
      }
      
      // Create lines between some points
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          if (Math.random() < 0.3) { // Only connect 30% of possible connections
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([points[i], points[j]]);
            const lineMaterial = new THREE.LineBasicMaterial({
              color: isDark ? 0x00ffff : 0x4169e1,
              transparent: true,
              opacity: 0.3
            });
            
            const line = new THREE.Line(lineGeometry, lineMaterial);
            networkGroup.add(line);
          }
        }
      }
      
      // Add small spheres at connection points
      points.forEach(point => {
        const nodeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: isDark ? 0x00ffff : 0x4169e1,
          transparent: true,
          opacity: 0.8
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.copy(point);
        networkGroup.add(node);
      });
      
      return networkGroup;
    };

    const spaceNetwork = createSpaceNetwork();
    scene.add(spaceNetwork);

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();
    
    const animate = () => {
      const time = clock.getElapsedTime();
      
      // Slowly rotate the star field
      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;
      
      // Animate floating spheres
      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.005;
        
        // Gentle floating motion
        sphere.position.y += Math.sin(time * 0.5 + index) * 0.01;
        sphere.position.x += Math.cos(time * 0.3 + index) * 0.005;
      });
      
      // Rotate space network slowly
      spaceNetwork.rotation.y += 0.001;
      spaceNetwork.rotation.z += 0.0005;
      
      // Pulse the network opacity
      const networkOpacity = 0.3 + Math.sin(time * 0.5) * 0.1;
      spaceNetwork.children.forEach(child => {
        if (child instanceof THREE.Line || child instanceof THREE.Mesh) {
          const material = child.material as THREE.Material & { opacity?: number };
          if (material.opacity !== undefined) {
            material.opacity = networkOpacity;
          }
        }
      });
      
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (!mount) return;
      
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 1 }}
    />
  );
}