import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import profilePicture from '../assets/images/Profile Picture-2.png';

const ParticleBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const groupRef = useRef<THREE.Group | null>(null);
    const animationFrameIdRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        let isMounted = true;
        const mountPoint = mountRef.current;
        if (!mountPoint) return;

        gsap.registerPlugin(ScrollTrigger);

        const initialWidth = mountPoint.clientWidth;
        const initialHeight = mountPoint.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, initialWidth / initialHeight, 0.1, 1000);
        camera.position.z = 180;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(initialWidth, initialHeight);
        renderer.setClearColor(0xe0e0e0);
        mountPoint.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;

        const loader = new THREE.TextureLoader();
        loader.load(profilePicture, 
            (texture) => {
                if (!isMounted) return;
                createParticlesFromImage(texture.image);
                if (groupRef.current) {
                    setupScrollAnimation(groupRef.current);
                }
                animate();
            },
            undefined,
            (error) => {
                if (!isMounted) return;
                console.error('An error occurred while loading the texture:', error);
            }
        );

        function createParticlesFromImage(image: HTMLImageElement) {
            const group = new THREE.Group();
            groupRef.current = group;
            scene.add(group);

            const width = image.width, height = image.height;
            const canvas = document.createElement('canvas');
            canvas.width = width; canvas.height = height;
            const context = canvas.getContext('2d');
            if (!context) return;
            context.drawImage(image, 0, 0);
            const imageData = context.getImageData(0, 0, width, height).data;

            const geometry = new THREE.BufferGeometry();
            const positions: number[] = [];
            const colors: number[] = [];
            const scale = 0.7, depth = 15, brightnessThreshold = 80;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;
                    const brightness = 0.299 * imageData[i] + 0.587 * imageData[i+1] + 0.114 * imageData[i+2];
                    if (imageData[i+3] > 128 && brightness < brightnessThreshold) {
                        if (Math.random() < 0.1) continue;
                        positions.push((x - width/2)*scale, -(y-height/2)*scale, (Math.random()-0.5)*depth);
                        const darkColor = new THREE.Color(0x222222);
                        const lightColor = new THREE.Color(0x888888);
                        if (Math.random() < 0.3) {
                            colors.push(darkColor.r, darkColor.g, darkColor.b, 1.0);
                        } else {
                            colors.push(lightColor.r, lightColor.g, lightColor.b, 0.3);
                        }
                    }
                }
            }

            if (positions.length === 0) return;

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));

            const triangleVertices: number[] = [];
            const triangleAmplitude = 2;
            for (let i = 0; i < positions.length; i += 3) {
                const ox = positions[i], oy = positions[i+1], oz = positions[i+2];
                triangleVertices.push(ox, oy, oz);
                triangleVertices.push(ox + triangleAmplitude, oy, oz + triangleAmplitude * 0.5);
                triangleVertices.push(ox + triangleAmplitude * 0.5, oy + triangleAmplitude, oz - triangleAmplitude * 0.5);
            }
            geometry.setAttribute('triangleVertices', new THREE.Float32BufferAttribute(triangleVertices, 9));
            geometry.setAttribute('currentSegment', new THREE.Float32BufferAttribute(Array.from({length: positions.length / 3}, () => Math.floor(Math.random() * 3)), 1));
            geometry.setAttribute('segmentProgress', new THREE.Float32BufferAttribute(Array.from({length: positions.length / 3}, () => Math.random()), 1));

            const hexagonTexture = createHexagonTexture();
            const pointsMaterial = new THREE.PointsMaterial({ 
                size: 1.2, 
                vertexColors: true,
                map: hexagonTexture,
                transparent: true,
                alphaTest: 0.1 
            });

            const points = new THREE.Points(geometry, pointsMaterial);
            group.add(points);

            const numParticles = positions.length / 3;
            const connections: number[] = [], maxDistance = 3;
            const darkParticleIndices: number[] = [];
            const lightParticleIndices: number[] = [];
            const particleColors = geometry.attributes.color.array;

            for (let i = 0; i < numParticles; i++) {
                if (particleColors[i * 4 + 3] === 1.0) {
                    darkParticleIndices.push(i);
                } else {
                    lightParticleIndices.push(i);
                }
            }

            const selectedDarkParticles: number[] = [];
            const numDarkToSelect = Math.floor(darkParticleIndices.length * 0.1);
            for (let i = 0; i < numDarkToSelect; i++) {
                const randomIndex = Math.floor(Math.random() * darkParticleIndices.length);
                selectedDarkParticles.push(darkParticleIndices.splice(randomIndex, 1)[0]);
            }

            const selectedLightParticles: number[] = [];
            const numLightToSelect = Math.floor(lightParticleIndices.length * 0.1);
            for (let i = 0; i < numLightToSelect; i++) {
                const randomIndex = Math.floor(Math.random() * lightParticleIndices.length);
                selectedLightParticles.push(lightParticleIndices.splice(randomIndex, 1)[0]);
            }

            const combinedSelectedParticles = [...selectedDarkParticles, ...selectedLightParticles];

            for (let i = 0; i < combinedSelectedParticles.length; i++) {
                const p1Index = combinedSelectedParticles[i];
                for (let j = i + 1; j < combinedSelectedParticles.length; j++) {
                    const p2Index = combinedSelectedParticles[j];
                    const p1 = new THREE.Vector3().fromArray(positions, p1Index * 3);
                    const p2 = new THREE.Vector3().fromArray(positions, p2Index * 3);
                    if (p1.distanceTo(p2) < maxDistance) connections.push(p1Index, p2Index);
                }
            }
            const plexusGeom = new THREE.BufferGeometry();
            plexusGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(connections.length * 3), 3).setUsage(THREE.DynamicDrawUsage));
            const plexusLines = new THREE.LineSegments(plexusGeom, new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 }));
            plexusLines.userData.connections = connections;
            group.add(plexusLines);

            const emitterIndices: number[] = [];
            for (let i = 0; i < 40; i++) emitterIndices.push(Math.floor(Math.random() * numParticles));
            const emergingGeom = new THREE.BufferGeometry();
            emergingGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(emitterIndices.length * 2 * 3), 3).setUsage(THREE.DynamicDrawUsage));
            const emergingLines = new THREE.LineSegments(emergingGeom, new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.4 }));
            emergingLines.userData.emitters = emitterIndices;
            group.add(emergingLines);
        }

        function createHexagonTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const context = canvas.getContext('2d');
            if (!context) return new THREE.Texture();
            
            context.fillStyle = 'white';
            context.beginPath();
            const size = 30;
            const centerX = 32;
            const centerY = 32;
            context.moveTo(centerX + size * Math.cos(0), centerY + size * Math.sin(0));
            for (let i = 1; i <= 6; i += 1) {
                context.lineTo(centerX + size * Math.cos(i * 2 * Math.PI / 6), centerY + size * Math.sin(i * 2 * Math.PI / 6));
            }
            context.closePath();
            context.fill();
            
            return new THREE.CanvasTexture(canvas);
        }

        function setupScrollAnimation(group: THREE.Group) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".App", // Use the main App container as the trigger
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                }
            });

            tl.to(group.rotation, { y: Math.PI * 2 })
              .to(group.scale, { x: 0.5, y: 0.5, z: 0.5 })
              .to(group.position, { x: 100, y: -100 });
        }

        const clock = new THREE.Clock();
        const animate = () => {
            animationFrameIdRef.current = requestAnimationFrame(animate);
            
            const time = clock.getElapsedTime();
            const group = groupRef.current;

            if (group) {
                const points = group.children[0] as THREE.Points;
                const plexusLines = group.children[1] as THREE.LineSegments;
                const emergingLines = group.children[2] as THREE.LineSegments;

                if (points && plexusLines && emergingLines) {
                    const positions = points.geometry.attributes.position.array as Float32Array;
                    const triangleVertices = points.geometry.attributes.triangleVertices.array as Float32Array;
                    const currentSegment = points.geometry.attributes.currentSegment.array as Float32Array;
                    const segmentProgress = points.geometry.attributes.segmentProgress.array as Float32Array;
                    const segmentSpeed = 0.01;

                    for (let i = 0; i < positions.length / 3; i++) {
                        let seg = currentSegment[i];
                        let prog = segmentProgress[i];
                        const p_idx = i * 3;
                        const v_idx = i * 9;

                        const v1x = triangleVertices[v_idx], v1y = triangleVertices[v_idx + 1], v1z = triangleVertices[v_idx + 2];
                        const v2x = triangleVertices[v_idx + 3], v2y = triangleVertices[v_idx + 4], v2z = triangleVertices[v_idx + 5];
                        const v3x = triangleVertices[v_idx + 6], v3y = triangleVertices[v_idx + 7], v3z = triangleVertices[v_idx + 8];

                        let startX, startY, startZ, endX, endY, endZ;
                        if (seg === 0) { startX = v1x; startY = v1y; startZ = v1z; endX = v2x; endY = v2y; endZ = v2z; }
                        else if (seg === 1) { startX = v2x; startY = v2y; startZ = v2z; endX = v3x; endY = v3y; endZ = v3z; }
                        else { startX = v3x; startY = v3y; startZ = v3z; endX = v1x; endY = v1y; endZ = v1z; }

                        positions[p_idx] = startX + (endX - startX) * prog;
                        positions[p_idx + 1] = startY + (endY - startY) * prog;
                        positions[p_idx + 2] = startZ + (endZ - startZ) * prog;

                        prog += segmentSpeed;
                        if (prog >= 1.0) {
                            prog = 0.0;
                            seg = (seg + 1) % 3;
                        }
                        segmentProgress[i] = prog;
                        currentSegment[i] = seg;
                    }
                    points.geometry.attributes.position.needsUpdate = true;

                    const plexusPos = plexusLines.geometry.attributes.position.array as Float32Array;
                    const connections = plexusLines.userData.connections;
                    for (let i = 0, j = 0; i < connections.length; i += 2, j += 6) {
                        const p1 = connections[i] * 3, p2 = connections[i+1] * 3;
                        plexusPos[j] = positions[p1]; plexusPos[j+1] = positions[p1+1]; plexusPos[j+2] = positions[p1+2];
                        plexusPos[j+3] = positions[p2]; plexusPos[j+4] = positions[p2+1]; plexusPos[j+5] = positions[p2+2];
                    }
                    plexusLines.geometry.attributes.position.needsUpdate = true;

                    const emergingPos = emergingLines.geometry.attributes.position.array as Float32Array;
                    const emitters = emergingLines.userData.emitters;
                    for (let i = 0, j = 0; i < emitters.length; i++, j += 6) {
                        const p1_idx = emitters[i] * 3;
                        const p1 = new THREE.Vector3(positions[p1_idx], positions[p1_idx+1], positions[p1_idx+2]);
                        
                        if (p1.lengthSq() === 0) continue; 

                        const dir = p1.clone().normalize();
                        const len = 50 + 50 * Math.sin(time * 3 + p1.x);
                        const p2 = p1.clone().add(dir.multiplyScalar(len));
                        emergingPos[j] = p1.x; emergingPos[j+1] = p1.y; emergingPos[j+2] = p1.z;
                        emergingPos[j+3] = p2.x; emergingPos[j+4] = p2.y; emergingPos[j+5] = p2.z;
                }
                emergingLines.geometry.attributes.position.needsUpdate = true;
                }
            }

            controls.update();
            renderer.render(scene, camera);
        };

        const onWindowResize = () => {
            if (!mountPoint) return;
            const newWidth = mountPoint.clientWidth;
            const newHeight = mountPoint.clientHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', onWindowResize, false);

        return () => {
            isMounted = false;
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            ScrollTrigger.killAll();
            window.removeEventListener('resize', onWindowResize);
            if (mountPoint) {
                mountPoint.removeChild(renderer.domElement);
            }
            renderer.dispose();
            controls.dispose();
            scene.clear();
        };
    }, []);

    return (
        <div ref={mountRef} style={{ position: 'sticky', top: 0, width: '100%', height: '100vh' }} />
    );
};

export default ParticleBackground;
