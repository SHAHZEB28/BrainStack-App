import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
// This component creates the interactive 3D particle background.
export const ThreeJSBackground = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        if (!mountRef.current)
            return;
        // Use a variable to hold the mount point to avoid issues in the cleanup function.
        const currentMount = mountRef.current;
        // Scene, Camera, Renderer setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        // Particle setup
        const particleCount = 5000;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 200;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            size: 0.15,
            color: 0xa855f7, // Purple color for particles
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        // Mouse tracking
        const mouse = new THREE.Vector2();
        const handleMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        // Animation loop
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const time = Date.now() * 0.0001;
            particles.rotation.x = time * 0.25;
            particles.rotation.y = time * 0.5;
            camera.position.x += (mouse.x * 10 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 10 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);
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
        // Cleanup function to prevent memory leaks
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            // Check if the renderer's DOM element is still a child before removing it.
            if (currentMount.contains(renderer.domElement)) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);
    return _jsx("div", { ref: mountRef, style: { position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100vw', height: '100vh' } });
};
