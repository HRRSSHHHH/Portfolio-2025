import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import profilePicture from '../assets/images/Profile Picture-2.png';
import profilePicture2 from '../assets/images/Profile Picture-2.1.png';

interface ParticleBackgroundProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ containerRef }) => {
    console.log("ParticleBackground: Rendering");
    const mountRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
    const groupRef = useRef<THREE.Group | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const animationFrameIdRef = useRef<number | undefined>(undefined);

    // Mouse interaction state
    const mouseRef = useRef(new THREE.Vector2(-1000, -1000));
    const raycasterRef = useRef(new THREE.Raycaster());
    const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));

    // Particle state refs
    const targets1Ref = useRef<Float32Array | null>(null);
    const targets2Ref = useRef<Float32Array | null>(null);
    const initialPositionsRef = useRef<Float32Array | null>(null);
    const burstDirectionsRef = useRef<Float32Array | null>(null);
    const morphOffsetsRef = useRef<Float32Array | null>(null); // Per-particle offsets

    // CTA Repulsion Refs
    const ctaPositionRef = useRef(new THREE.Vector3(9999, 9999, 9999));
    const ctaSizeRef = useRef({ w: 0, h: 0 }); // World size half-extents
    const isCtaVisibleRef = useRef(false);

    // Animation progress objects (for GSAP)
    const formationProgress = useRef({ value: 0 }).current;
    const morphProgress = useRef({ value: 0 }).current;
    const burstProgress = useRef({ value: 0 }).current;


    useEffect(() => {
        let isMounted = true;
        const mountPoint = mountRef.current;
        if (!mountPoint) return;

        gsap.registerPlugin(ScrollTrigger);

        // [MOBILE OPTIMIZATION]
        // isMobile check is now handled via state at the top level

        const initialWidth = mountPoint.clientWidth;
        const initialHeight = mountPoint.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, initialWidth / initialHeight, 0.1, 1000);
        camera.position.z = 180;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(initialWidth, initialHeight);
        renderer.setClearColor(0xF0EEE9);

        // Explicitly handle touch-action to ensure scrolling works on mobile
        if (isMobile) {
            renderer.domElement.style.touchAction = 'pan-y';
            renderer.domElement.style.pointerEvents = 'none';
        } else {
            renderer.domElement.style.touchAction = 'none';
            renderer.domElement.style.pointerEvents = 'auto';
        }

        mountPoint.appendChild(renderer.domElement);

        if (!isMobile) {
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enableZoom = false;
            controlsRef.current = controls;
        } else {
            if (controlsRef.current) {
                controlsRef.current.dispose();
                controlsRef.current = null;
            }
        }

        const onMouseMove = (event: MouseEvent) => {
            if (!isMobile) { // Disable mouse tracking on mobile
                mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
            }
        };

        if (!isMobile) {
            window.addEventListener('mousemove', onMouseMove);
        }

        const loader = new THREE.TextureLoader();

        Promise.all([
            new Promise<THREE.Texture>((resolve, reject) => loader.load(profilePicture, resolve, undefined, reject)),
            new Promise<THREE.Texture>((resolve, reject) => loader.load(profilePicture2, resolve, undefined, reject))
        ]).then(([texture1, texture2]) => {
            if (!isMounted) return;
            createMorphingParticles(texture1.image, texture2.image);
            if (groupRef.current) {
                setupScrollAnimation(groupRef.current);
            }
            console.log("ParticleBackground: Animation started");
            animate();
        }).catch(err => {
            console.error("Error loading profile images:", err);
        });

        function getParticlesFromImage(image: HTMLImageElement) {
            const width = image.width;
            const height = image.height;
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return { positions: [], colors: [] };

            ctx.drawImage(image, 0, 0);
            const data = ctx.getImageData(0, 0, width, height).data;

            const positions: number[] = [];
            const colors: number[] = [];

            // Auto-fit Logic
            const TARGET_WORLD_HEIGHT = 240;
            const scale = TARGET_WORLD_HEIGHT / height;

            const depth = 15;
            const brightnessThreshold = 80;

            // [MOBILE OPTIMIZATION] Sampling factor 3 for balance
            const samplingFactor = isMobile ? 3 : 2;

            for (let y = 0; y < height; y += samplingFactor) {
                for (let x = 0; x < width; x += samplingFactor) {
                    const i = (y * width + x) * 4;
                    const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];

                    if (data[i + 3] > 128 && brightness < brightnessThreshold) {
                        if (Math.random() < 0.1) continue;

                        positions.push((x - width / 2) * scale, -(y - height / 2) * scale, (Math.random() - 0.5) * depth);

                        const darkColor = new THREE.Color(0x222222);
                        const lightColor = new THREE.Color(0x888888);

                        // [MOBILE OPTIMIZATION] Reduce opacity
                        const baseAlpha = isMobile ? 0.6 : 1.0;
                        const secondaryAlpha = isMobile ? 0.2 : 0.3;

                        if (Math.random() < 0.3) {
                            colors.push(darkColor.r, darkColor.g, darkColor.b, baseAlpha);
                        } else {
                            colors.push(lightColor.r, lightColor.g, lightColor.b, secondaryAlpha);
                        }
                    }
                }
            }
            return { positions, colors };
        }

        function createMorphingParticles(image1: HTMLImageElement, image2: HTMLImageElement) {
            const group = new THREE.Group();
            groupRef.current = group;
            scene.add(group);

            const data1 = getParticlesFromImage(image1);
            const data2 = getParticlesFromImage(image2);

            const count1 = data1.positions.length / 3;
            const count2 = data2.positions.length / 3;
            const maxCount = Math.max(count1, count2);

            console.log(`Particle Count: ${maxCount} (Mobile: ${isMobile})`);

            const combinedPositions = new Float32Array(maxCount * 3);
            const combinedColors = new Float32Array(maxCount * 4);

            const t1 = new Float32Array(maxCount * 3);
            const t2 = new Float32Array(maxCount * 3);
            const initPos = new Float32Array(maxCount * 3);
            const offsets = new Float32Array(maxCount); // [NEW]

            for (let i = 0; i < maxCount; i++) {
                if (i < count1) {
                    t1[i * 3] = data1.positions[i * 3];
                    t1[i * 3 + 1] = data1.positions[i * 3 + 1];
                    t1[i * 3 + 2] = data1.positions[i * 3 + 2];
                } else {
                    t1[i * 3] = (Math.random() - 0.5) * 5000;
                    t1[i * 3 + 1] = (Math.random() - 0.5) * 5000;
                    t1[i * 3 + 2] = -5000;
                }

                if (i < count2) {
                    t2[i * 3] = data2.positions[i * 3];
                    t2[i * 3 + 1] = data2.positions[i * 3 + 1];
                    t2[i * 3 + 2] = data2.positions[i * 3 + 2];
                } else {
                    t2[i * 3] = (Math.random() - 0.5) * 5000;
                    t2[i * 3 + 1] = (Math.random() - 0.5) * 5000;
                    t2[i * 3 + 2] = -5000;
                }

                initPos[i * 3] = (Math.random() - 0.5) * 1500;
                initPos[i * 3 + 1] = (Math.random() - 0.5) * 1500;
                initPos[i * 3 + 2] = (Math.random() - 0.5) * 1500;

                if (i < count1) {
                    combinedColors.set([data1.colors[i * 4], data1.colors[i * 4 + 1], data1.colors[i * 4 + 2], data1.colors[i * 4 + 3]], i * 4);
                } else if (i < count2) {
                    combinedColors.set([data2.colors[i * 4], data2.colors[i * 4 + 1], data2.colors[i * 4 + 2], data2.colors[i * 4 + 3]], i * 4);
                } else {
                    combinedColors.set([0, 0, 0, 0], i * 4);
                }

                combinedPositions.set([initPos[i * 3], initPos[i * 3 + 1], initPos[i * 3 + 2]], i * 3);
                offsets[i] = Math.random();
            }

            targets1Ref.current = t1;
            targets2Ref.current = t2;
            initialPositionsRef.current = initPos;
            morphOffsetsRef.current = offsets;

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(combinedPositions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(combinedColors, 4));

            const triangleVertices = new Float32Array(maxCount * 9);
            const triangleAmplitude = 2;
            for (let i = 0; i < maxCount; i++) {
                const ox = combinedPositions[i * 3], oy = combinedPositions[i * 3 + 1], oz = combinedPositions[i * 3 + 2];
                triangleVertices.set([
                    ox, oy, oz,
                    ox + triangleAmplitude, oy, oz + triangleAmplitude * 0.5,
                    ox + triangleAmplitude * 0.5, oy + triangleAmplitude, oz - triangleAmplitude * 0.5
                ], i * 9);
            }
            geometry.setAttribute('triangleVertices', new THREE.BufferAttribute(triangleVertices, 9));
            geometry.setAttribute('currentSegment', new THREE.BufferAttribute(new Float32Array(Array.from({ length: maxCount }, () => Math.floor(Math.random() * 3))), 1));
            geometry.setAttribute('segmentProgress', new THREE.BufferAttribute(new Float32Array(Array.from({ length: maxCount }, () => Math.random())), 1));

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

            // Pre-calculate burst directions
            const burstDirs = new Float32Array(maxCount * 3);
            for (let i = 0; i < maxCount; i++) {
                const angle1 = Math.random() * Math.PI * 2;
                const angle2 = Math.random() * Math.PI * 2;
                const radius = 50 + Math.random() * 200;
                burstDirs[i * 3] = Math.cos(angle1) * Math.sin(angle2) * radius;
                burstDirs[i * 3 + 1] = Math.sin(angle1) * Math.sin(angle2) * radius;
                burstDirs[i * 3 + 2] = Math.cos(angle2) * radius;
            }
            burstDirectionsRef.current = burstDirs;

            const generateConnections = (targetPos: Float32Array, connectivity: number = 0.10, dMax: number = 3.0) => {
                const conns: number[] = [];
                const connectors: number[] = [];
                for (let i = 0; i < maxCount; i++) {
                    if (Math.random() < connectivity) connectors.push(i);
                }
                for (let i = 0; i < connectors.length; i++) {
                    const i1 = connectors[i];
                    const p1 = new THREE.Vector3(targetPos[i1 * 3], targetPos[i1 * 3 + 1], targetPos[i1 * 3 + 2]);
                    let cFound = 0;
                    for (let j = i + 1; j < connectors.length; j++) {
                        if (cFound > 3) break;
                        const i2 = connectors[j];
                        const p2 = new THREE.Vector3(targetPos[i2 * 3], targetPos[i2 * 3 + 1], targetPos[i2 * 3 + 2]);
                        if (p1.distanceTo(p2) < dMax) {
                            conns.push(i1, i2);
                            cFound++;
                        }
                    }
                }
                return conns;
            };

            const silkConnections1 = generateConnections(t1);
            const silkConnections2 = generateConnections(t2);

            const CURVE_SEGMENTS = 6;
            const totalSilkVertexCount = ((silkConnections1.length + silkConnections2.length) / 2) * CURVE_SEGMENTS * 2;

            const silkGeom = new THREE.BufferGeometry();
            const silkPosBuffer = new Float32Array(totalSilkVertexCount * 3);
            const silkColorBuffer = new Float32Array(totalSilkVertexCount * 4);
            silkGeom.setAttribute('position', new THREE.BufferAttribute(silkPosBuffer, 3).setUsage(THREE.DynamicDrawUsage));
            silkGeom.setAttribute('color', new THREE.BufferAttribute(silkColorBuffer, 4).setUsage(THREE.DynamicDrawUsage));

            const silkMaterial = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            const silkLines = new THREE.LineSegments(silkGeom, silkMaterial);
            silkLines.userData = {
                connections1: silkConnections1,
                connections2: silkConnections2,
                segments: CURVE_SEGMENTS
            };
            group.add(silkLines);

            const ciliaIndices: number[] = [];
            for (let i = 0; i < 20; i++) ciliaIndices.push(Math.floor(Math.random() * maxCount));
            const ciliaGeom = new THREE.BufferGeometry();
            const ciliaSegments = 10;
            const ciliaPosArray = new Float32Array(ciliaIndices.length * ciliaSegments * 2 * 3);
            ciliaGeom.setAttribute('position', new THREE.BufferAttribute(ciliaPosArray, 3).setUsage(THREE.DynamicDrawUsage));
            const ciliaLines = new THREE.LineSegments(ciliaGeom, new THREE.LineBasicMaterial({ color: 0x55aaaa, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending }));
            ciliaLines.userData = { indices: ciliaIndices, segments: ciliaSegments };
            group.add(ciliaLines);

            gsap.to(formationProgress, { value: 1, duration: 3.5, delay: 0.2, ease: "power4.out" });
        }


        function createHexagonTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 64; canvas.height = 64;
            const ctx = canvas.getContext('2d');
            if (!ctx) return new THREE.Texture();
            ctx.fillStyle = 'white';
            ctx.beginPath();
            const size = 30;
            ctx.moveTo(32 + size * Math.cos(0), 32 + size * Math.sin(0));
            for (let i = 1; i <= 6; i++) ctx.lineTo(32 + size * Math.cos(i * 2 * Math.PI / 6), 32 + size * Math.sin(i * 2 * Math.PI / 6));
            ctx.closePath();
            ctx.fill();
            return new THREE.CanvasTexture(canvas);
        }

        function setupScrollAnimation(_group: THREE.Group) {
            if (!containerRef.current) return;

            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                }
            })
                .to(_group.scale, {
                    x: 1.15,
                    y: 1.15,
                    z: 1.15,
                    duration: 0.5,
                    ease: "power2.out"
                })
                .to(morphProgress, {
                    value: 1,
                    ease: "power2.inOut",
                    duration: 2
                }, ">-0.1")
                .to(burstProgress, {
                    value: 1,
                    ease: "power2.in",
                    duration: 1
                });
        }

        const clock = new THREE.Clock();
        const animate = () => {
            animationFrameIdRef.current = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();
            if (groupRef.current && targets1Ref.current && targets2Ref.current && initialPositionsRef.current) {
                const group = groupRef.current;
                const points = group.children[0] as THREE.Points;
                const silkLines = group.children[1] as THREE.LineSegments;
                const ciliaLines = group.children[2] as THREE.LineSegments;

                if (points && silkLines && ciliaLines) {
                    const positions = points.geometry.attributes.position.array as Float32Array;
                    const t1 = targets1Ref.current;
                    const t2 = targets2Ref.current;
                    const initPos = initialPositionsRef.current;
                    const burstDirs = burstDirectionsRef.current;
                    const fVal = formationProgress.value;
                    const mVal = morphProgress.value;
                    const bVal = burstProgress.value;

                    // Update CTA Position & Size
                    const ctaBtn = document.getElementById('hero-cta');
                    if (ctaBtn) {
                        const rect = ctaBtn.getBoundingClientRect();
                        const cx = rect.left + rect.width / 2;
                        const cy = rect.top + rect.height / 2;

                        const ndcX = (cx / window.innerWidth) * 2 - 1;
                        const ndcY = -(cy / window.innerHeight) * 2 + 1;
                        const ndcRight = ((rect.right) / window.innerWidth) * 2 - 1;
                        const ndcTop = -((rect.top) / window.innerHeight) * 2 + 1;

                        const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
                        vec.unproject(camera);
                        vec.sub(camera.position).normalize();
                        const distance = -camera.position.z / vec.z;
                        const pos = camera.position.clone().add(vec.multiplyScalar(distance));

                        const vecRight = new THREE.Vector3(ndcRight, ndcY, 0.5);
                        vecRight.unproject(camera);
                        vecRight.sub(camera.position).normalize();
                        const distanceRight = -camera.position.z / vecRight.z;
                        const posRight = camera.position.clone().add(vecRight.multiplyScalar(distanceRight));

                        const vecTop = new THREE.Vector3(ndcX, ndcTop, 0.5);
                        vecTop.unproject(camera);
                        vecTop.sub(camera.position).normalize();
                        const distanceTop = -camera.position.z / vecTop.z;
                        const posTop = camera.position.clone().add(vecTop.multiplyScalar(distanceTop));

                        const localCtaPos = pos.clone();
                        group.worldToLocal(localCtaPos);
                        ctaPositionRef.current.copy(localCtaPos);

                        const localRight = posRight.clone();
                        group.worldToLocal(localRight);

                        const localTop = posTop.clone();
                        group.worldToLocal(localTop);

                        const sX = group.scale.x || 1;
                        const sY = group.scale.y || 1;

                        ctaSizeRef.current.w = Math.abs(localRight.x - localCtaPos.x) + (12 / sX);
                        ctaSizeRef.current.h = Math.abs(localTop.y - localCtaPos.y) + (12 / sY);

                        isCtaVisibleRef.current = true;
                    } else {
                        isCtaVisibleRef.current = false;
                    }

                    for (let i = 0; i < positions.length / 3; i++) {
                        const idx = i * 3;

                        const offset = morphOffsetsRef.current ? morphOffsetsRef.current[i] : 0;
                        const localM = THREE.MathUtils.clamp((mVal - offset * 0.4) / 0.6, 0, 1);

                        const mTargetX = THREE.MathUtils.lerp(t1[idx], t2[idx], localM);
                        const mTargetY = THREE.MathUtils.lerp(t1[idx + 1], t2[idx + 1], localM);
                        const mTargetZ = THREE.MathUtils.lerp(t1[idx + 2], t2[idx + 2], localM);

                        let finalX = THREE.MathUtils.lerp(initPos[idx], mTargetX, fVal);
                        let finalY = THREE.MathUtils.lerp(initPos[idx + 1], mTargetY, fVal);
                        let finalZ = THREE.MathUtils.lerp(initPos[idx + 2], mTargetZ, fVal);

                        if (isCtaVisibleRef.current && !isMobile) {
                            const cPos = ctaPositionRef.current;
                            const sizes = ctaSizeRef.current;
                            const rx = sizes.w;
                            const ry = sizes.h;

                            const dx = finalX - cPos.x;
                            const dy = finalY - cPos.y;

                            const ellipseDistSq = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);

                            if (ellipseDistSq < 1.0) {
                                const dist = Math.sqrt(dx * dx + dy * dy);
                                const forceMag = (1.0 - ellipseDistSq) * 80;

                                if (dist > 0.001) {
                                    finalX += (dx / dist) * forceMag;
                                    finalY += (dy / dist) * forceMag;
                                }
                            }
                        }

                        if (bVal > 0 && burstDirs) {
                            finalX += burstDirs[idx] * bVal;
                            finalY += burstDirs[idx + 1] * bVal;
                            finalZ += burstDirs[idx + 2] * bVal;
                        }

                        positions[idx] = finalX;
                        positions[idx + 1] = finalY;
                        positions[idx + 2] = finalZ;

                        const breath = Math.sin(time * 2 + idx) * 0.5 * (1 - bVal);
                        positions[idx] += breath;
                        positions[idx + 2] += breath;
                    }
                    points.geometry.attributes.position.needsUpdate = true;
                    points.geometry.attributes.color.needsUpdate = true; // IMPORTANT: Colors update needed for fade

                    if (controlsRef.current) controlsRef.current.update();

                    // Calculate Mouse Interaction Target (or Dummy)
                    let tMX = 99999, tMY = 99999, tMZ = 99999;
                    let isMouseActive = false;

                    if (!isMobile) {
                        raycasterRef.current.setFromCamera(mouseRef.current, camera);
                        const tempMouse = new THREE.Vector3();
                        if (raycasterRef.current.ray.intersectPlane(planeRef.current, tempMouse)) {
                            group.worldToLocal(tempMouse);
                            tMX = tempMouse.x; tMY = tempMouse.y; tMZ = tempMouse.z;
                            isMouseActive = true;
                        }
                    }

                    // Mouse Interaction with Particles (Visuals: Fade Color etc.)
                    // Only run if mouse is active (to avoid perf hit on mobile or off-screen)
                    const colors = points.geometry.attributes.color.array as Float32Array;
                    if (isMouseActive) {
                        const interactionRadius = 60;
                        const attractSpeed = 0.03;
                        const rotSpeed = 0.05;

                        for (let i = 0; i < positions.length / 3; i++) {
                            const idx = i * 3;
                            const cidx = i * 4;
                            const dx = positions[idx] - tMX, dy = positions[idx + 1] - tMY, dz = positions[idx + 2] - tMZ;
                            const distSq = dx * dx + dy * dy + dz * dz;

                            if (distSq < interactionRadius * interactionRadius) {
                                const f = (1 - Math.sqrt(distSq) / interactionRadius);
                                positions[idx] -= dx * f * attractSpeed;
                                positions[idx + 1] -= dy * f * attractSpeed;
                                positions[idx + 2] -= dz * f * attractSpeed;

                                const s = Math.sin(rotSpeed * f), c = Math.cos(rotSpeed * f);
                                const rx = positions[idx] - tMX, ry = positions[idx + 1] - tMY;
                                positions[idx] = tMX + (rx * c - ry * s);
                                positions[idx + 1] = tMY + (rx * s + ry * c);

                                colors[cidx] = THREE.MathUtils.lerp(colors[cidx], 0.0, 0.1);
                                colors[cidx + 1] = THREE.MathUtils.lerp(colors[cidx + 1], 1.0, 0.1);
                                colors[cidx + 2] = THREE.MathUtils.lerp(colors[cidx + 2], 1.0, 0.1);
                                colors[cidx + 3] = 1.0;
                            } else {
                                // Restore original colors
                                if (colors[cidx + 1] > 0.6) {
                                    colors[cidx] = THREE.MathUtils.lerp(colors[cidx], 0.5, 0.05);
                                    colors[cidx + 1] = THREE.MathUtils.lerp(colors[cidx + 1], 0.5, 0.05);
                                    colors[cidx + 2] = THREE.MathUtils.lerp(colors[cidx + 2], 0.5, 0.05);
                                    colors[cidx + 3] = THREE.MathUtils.lerp(colors[cidx + 3], 0.5 * (1 - bVal), 0.05);
                                } else {
                                    colors[cidx + 3] = THREE.MathUtils.lerp(colors[cidx + 3], 0.5 * (1 - bVal), 0.1);
                                }
                            }
                        }
                        // Position update for mouse interaction
                        points.geometry.attributes.position.needsUpdate = true;
                    } else {
                        // Just run color fade maintenance if needed
                        // (Optional: if we want colors to settle back when mouse leaves)
                        for (let i = 0; i < positions.length / 3; i++) {
                            const cidx = i * 4;
                            // Ensure colors fade out based on burst progress if no interaction
                            colors[cidx + 3] = THREE.MathUtils.lerp(colors[cidx + 3], (1 - bVal) * (isMobile ? 0.6 : 1.0) * (Math.random() > 0.5 ? 1 : 0.3), 0.1);
                            // *Approximation logic here simplified for perf; strictly we should respect the original dark/light distribution*
                            // Actually, let's just let them stay as is or fade out if burst.
                        }
                    }

                    // --- SILK & CILIA UPDATES (Decoupled from Mouse) ---
                    // Run these ALWAYS so they render, using tMX/tMY (which are far away if !isMouseActive)
                    // This ensures ambient animation works on Mobile.

                    const silkPos = silkLines.geometry.attributes.position.array as Float32Array;
                    const silkColors = silkLines.geometry.attributes.color.array as Float32Array;
                    const conn1 = silkLines.userData.connections1;
                    const conn2 = silkLines.userData.connections2;
                    const segs = silkLines.userData.segments;
                    let vIdx = 0;
                    let cIdx = 0;

                    const silkBaseColor = new THREE.Color(0x2d936c);
                    const maxSilkDist = 8.0;

                    const updateSilkConnections = (conn: number[], currentOpacityBase: number) => {
                        for (let i = 0; i < conn.length; i += 2) {
                            const idx1 = conn[i] * 3, idx2 = conn[i + 1] * 3;
                            const p1x = positions[idx1], p1y = positions[idx1 + 1], p1z = positions[idx1 + 2];
                            const p2x = positions[idx2], p2y = positions[idx2 + 1], p2z = positions[idx2 + 2];

                            const dxLine = p1x - p2x, dyLine = p1y - p2y, dzLine = p1z - p2z;
                            const currentDist = Math.sqrt(dxLine * dxLine + dyLine * dyLine + dzLine * dzLine);

                            if (currentDist > maxSilkDist) {
                                for (let s = 1; s <= segs; s++) {
                                    vIdx += 6;
                                    for (let k = 0; k < 2; k++) {
                                        cIdx += 3;
                                        silkColors[cIdx++] = 0; // Alpha 0
                                    }
                                }
                                continue;
                            }

                            let opacity = currentOpacityBase;
                            if (currentDist > 6.0) {
                                opacity = Math.max(0, currentOpacityBase * (1 - (currentDist - 6.0) / (maxSilkDist - 6.0)));
                            }

                            const midX = (p1x + p2x) * 0.5, midY = (p1y + p2y) * 0.5, midZ = (p1z + p2z) * 0.5;
                            // Ambient Animation
                            let cX = midX + Math.sin(time + i * 0.1) * 5, cY = midY + Math.cos(time * 0.8 + i * 0.1) * 5, cZ = midZ + Math.sin(time * 1.2 + i * 0.1) * 5;

                            // Mouse Interaction (Only if mouse is close, tMX defaults to 99999)
                            const dmx = midX - tMX, dmy = midY - tMY;
                            const dmsq = dmx * dmx + dmy * dmy;
                            if (dmsq < 150 * 150) {
                                const f = Math.max(0, 1 - Math.sqrt(dmsq) / 150);
                                cX -= dmx * f * 1.2; cY -= dmy * f * 1.2; cZ += f * 20;
                                opacity = Math.min(0.4, opacity + f * 0.3);
                            }

                            opacity *= (1 - bVal);

                            let px = p1x, py = p1y, pz = p1z;
                            for (let s = 1; s <= segs; s++) {
                                const t = s / segs, it = 1 - t;
                                const bx = it * it * p1x + 2 * it * t * cX + t * t * p2x;
                                const by = it * it * p1y + 2 * it * t * cY + t * t * p2y;
                                const bz = it * it * p1z + 2 * it * t * cZ + t * t * p2z;

                                silkPos[vIdx++] = px; silkPos[vIdx++] = py; silkPos[vIdx++] = pz;
                                silkPos[vIdx++] = bx; silkPos[vIdx++] = by; silkPos[vIdx++] = bz;

                                for (let iAlpha = 0; iAlpha < 2; iAlpha++) {
                                    silkColors[cIdx++] = silkBaseColor.r;
                                    silkColors[cIdx++] = silkBaseColor.g;
                                    silkColors[cIdx++] = silkBaseColor.b;
                                    silkColors[cIdx++] = opacity;
                                }
                                px = bx; py = by; pz = bz;
                            }
                        }
                    };

                    updateSilkConnections(conn1, 0.15 * (1 - mVal));
                    updateSilkConnections(conn2, 0.15 * mVal);

                    silkLines.geometry.attributes.position.needsUpdate = true;
                    silkLines.geometry.attributes.color.needsUpdate = true;

                    // Update Cilia
                    const ciliaPos = ciliaLines.geometry.attributes.position.array as Float32Array;
                    const cInd = ciliaLines.userData.indices;
                    const cSeg = ciliaLines.userData.segments;
                    let cvIdx = 0;
                    for (let i = 0; i < cInd.length; i++) {
                        const idx = cInd[i] * 3;
                        const rx = positions[idx], ry = positions[idx + 1], rz = positions[idx + 2];
                        let px = rx, py = ry, pz = rz;

                        const mdx = tMX - rx, mdy = tMY - ry;
                        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                        const mf = mdist < 225 ? Math.max(0, 1 - mdist / 225) : 0;

                        for (let s = 1; s <= cSeg; s++) {
                            const ext = s * 3.5 + mf * s * 2, wave = Math.sin(time * 2 + s * 0.3 + i) * (2 + mf * 5);
                            let tx = rx + Math.sin(time + i) * ext, ty = ry + Math.cos(time + i) * ext, tz = rz + ext * 0.8 + wave;

                            if (mf > 0) { const infl = (s / cSeg) * mf; tx += mdx * infl * 0.8; ty += mdy * infl * 0.8; tz += 20 * infl; }

                            ciliaPos[cvIdx++] = px; ciliaPos[cvIdx++] = py; ciliaPos[cvIdx++] = pz;
                            ciliaPos[cvIdx++] = tx; ciliaPos[cvIdx++] = ty; ciliaPos[cvIdx++] = tz;
                            px = tx; py = ty; pz = tz;
                        }
                    }
                    (ciliaLines.material as THREE.LineBasicMaterial).opacity = 0.2 * (1 - bVal);
                    ciliaLines.geometry.attributes.position.needsUpdate = true;
                }
                renderer.render(scene, camera);
            }
        };

        const onWindowResize = () => {
            if (!mountPoint) return;
            const width = mountPoint.clientWidth;
            const height = mountPoint.clientHeight;

            setIsMobile(window.innerWidth < 768);

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', onWindowResize);

        return () => {
            isMounted = false;
            if (!isMobile) {
                window.removeEventListener('mousemove', onMouseMove);
            }
            window.removeEventListener('resize', onWindowResize);
            if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
            ScrollTrigger.killAll();
            if (mountPoint) mountPoint.removeChild(renderer.domElement);
            renderer.dispose();
            if (controlsRef.current) {
                controlsRef.current.dispose();
                controlsRef.current = null;
            }
            scene.clear();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]); // Re-run effect when isMobile changes to toggle controls and styles correctly

    return <div ref={mountRef} className={`absolute inset-0 w-full h-full ${isMobile ? 'pointer-events-none' : ''}`} />;
};

export default ParticleBackground;
