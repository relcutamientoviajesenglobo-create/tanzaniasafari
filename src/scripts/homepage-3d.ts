import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const isMobile = window.innerWidth <= 768;

const canvas = document.querySelector('#webgl-canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile,
    powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 0.75));
renderer.toneMapping = THREE.ReinhardToneMapping;

const scene = new THREE.Scene();

const video = document.querySelector('.bg-video') as HTMLVideoElement | null;
if (video) {
    video.muted = true;
    video.playsInline = true;
    const playVideo = () => {
        video.play().catch(e => console.log("Autoplay prevented:", e));
    };
    playVideo();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    scene.background = videoTexture;
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 10;

const cursorFollowGroup = new THREE.Group();
scene.add(cursorFollowGroup);

const animalsContainer = new THREE.Group();
cursorFollowGroup.add(animalsContainer);

const createPointCloudFromImage = (textOrEmoji: string, colorHex: number, pointSize = 0.05, density = 4): THREE.Points => {
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d', { willReadFrequently: true })!;
    tempCanvas.width = 512;
    tempCanvas.height = 512;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.font = '300px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textOrEmoji, tempCanvas.width / 2, tempCanvas.height / 2);

    const imgData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const pixels = imgData.data;

    const positions: number[] = [];
    const randomOffsets: number[] = [];

    for (let y = 0; y < tempCanvas.height; y += density) {
        for (let x = 0; x < tempCanvas.width; x += density) {
            const i = (y * tempCanvas.width + x) * 4;
            const r = pixels[i];

            if (r > 100) {
                const px = (x / tempCanvas.width) * 10 - 5;
                const py = -(y / tempCanvas.height) * 10 + 5;
                const pz = (Math.random() - 0.5) * 1.5;

                positions.push(px, py, pz);
                randomOffsets.push(Math.random() * Math.PI * 2);
            }
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('aOffset', new THREE.Float32BufferAttribute(randomOffsets, 1));

    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(colorHex) },
            uOpacity: { value: 0.0 },
            uSize: { value: pointSize },
            uMouse: { value: new THREE.Vector2(-999.0, -999.0) },
            uClick: { value: 0.0 }
        },
        vertexShader: `
            uniform float uTime;
            uniform float uSize;
            uniform vec2 uMouse;
            uniform float uClick;
            attribute float aOffset;
            varying float vAlpha;

            void main() {
                vec3 newPosition = position;
                newPosition.z += sin(uTime * 2.0 + aOffset) * 0.3;
                newPosition.x += cos(uTime * 1.5 + aOffset) * 0.1;

                vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
                gl_Position = projectionMatrix * mvPosition;

                vec2 ndcPos = gl_Position.xy / gl_Position.w;
                float dist = distance(ndcPos, uMouse);
                float hoverRadius = 0.4;

                float pushForce = 0.0;
                if (dist < hoverRadius) {
                    float force = pow((hoverRadius - dist) / hoverRadius, 2.0);
                    vec2 dir = normalize(ndcPos - uMouse);

                    float strength = 0.1 + (uClick * 0.5);
                    gl_Position.xy += dir * force * strength * gl_Position.w;

                    pushForce = force;
                }

                gl_PointSize = uSize * (30.0 / -mvPosition.z) + (pushForce * 25.0 * (1.0 + uClick * 1.5));

                vAlpha = 0.5 + (sin(uTime * 3.0 + aOffset) * 0.5);
                vAlpha += pushForce * 0.5;
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            uniform float uOpacity;
            varying float vAlpha;

            void main() {
                float dist = length(gl_PointCoord - vec2(0.5));
                if (dist > 0.5) discard;

                float alpha = (0.5 - dist) * 2.0 * vAlpha * uOpacity;

                gl_FragColor = vec4(uColor, alpha);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    return new THREE.Points(geometry, material);
};

const pointDensity = isMobile ? 6 : 3;
const pointScale = isMobile ? 2.0 : 1.5;

const lionCloud = createPointCloudFromImage("\u{1F981}", 0xffaa00, pointScale, pointDensity);
const zebraCloud = createPointCloudFromImage("\u{1F993}", 0x00ffaa, pointScale, pointDensity);
const giraffeCloud = createPointCloudFromImage("\u{1F992}", 0xcc00ff, pointScale, pointDensity);

animalsContainer.add(lionCloud);
animalsContainer.add(zebraCloud);
animalsContainer.add(giraffeCloud);

const particleCount = isMobile ? 600 : 2500;
const particlesGeo = new THREE.BufferGeometry();
const particlePos = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    particlePos[i] = (Math.random() - 0.5) * 25;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
const particleMat = new THREE.PointsMaterial({
    color: 0xffaa00,
    size: 0.15,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});
const particleSystem = new THREE.Points(particlesGeo, particleMat);
animalsContainer.add(particleSystem);

const renderScene = new RenderPass(scene, camera);

const bloomResX = isMobile ? window.innerWidth / 2 : window.innerWidth;
const bloomResY = isMobile ? window.innerHeight / 2 : window.innerHeight;

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(bloomResX, bloomResY),
    0.8, 0.4, 0.85
);
(bloomPass as any).tintColor = new THREE.Color(0xffaa00);

const outputPass = new OutputPass();

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);
composer.addPass(outputPass);

let targetMouseX = 0;
let targetMouseY = 0;
let currentMouseX = -999;
let currentMouseY = -999;
let targetClick = 0.0;
let currentClick = 0.0;

const updateMouseTarget = (clientX: number, clientY: number) => {
    targetMouseX = (clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(clientY / window.innerHeight) * 2 + 1;
};

window.addEventListener('mousemove', (e) => updateMouseTarget(e.clientX, e.clientY));
window.addEventListener('mousedown', () => targetClick = 1.0);
window.addEventListener('mouseup', () => targetClick = 0.0);

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) updateMouseTarget(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });
window.addEventListener('touchstart', (e) => {
    targetClick = 1.0;
    if (e.touches.length > 0) updateMouseTarget(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });
window.addEventListener('touchend', () => targetClick = 0.0, { passive: true });

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    currentMouseX += (targetMouseX - currentMouseX) * 0.1;
    currentMouseY += (targetMouseY - currentMouseY) * 0.1;
    currentClick += (targetClick - currentClick) * 0.15;

    cursorFollowGroup.rotation.y = currentMouseX * 0.15;
    cursorFollowGroup.rotation.x = -currentMouseY * 0.15;
    cursorFollowGroup.position.x = currentMouseX * 0.3;
    cursorFollowGroup.position.y = currentMouseY * 0.3;

    lionCloud.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;
    zebraCloud.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;
    giraffeCloud.rotation.y = Math.sin(elapsedTime * 0.5) * 0.2;

    const activeClouds = [lionCloud, zebraCloud, giraffeCloud];
    activeClouds.forEach(cloud => {
        (cloud.material as THREE.ShaderMaterial).uniforms.uTime.value = elapsedTime;
        (cloud.material as THREE.ShaderMaterial).uniforms.uMouse.value.set(currentMouseX, currentMouseY);
        (cloud.material as THREE.ShaderMaterial).uniforms.uClick.value = currentClick;
    });

    animalsContainer.position.y = Math.sin(elapsedTime * 0.5) * 0.3;
    particleSystem.rotation.y = elapsedTime * 0.05;
    composer.render();
}
animate();

window.addEventListener('resize', () => {
    const isNowMobile = window.innerWidth <= 768;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isNowMobile ? 1.0 : Math.min(window.devicePixelRatio, 0.75));

    const newBloomResX = isNowMobile ? window.innerWidth / 2 : window.innerWidth;
    const newBloomResY = isNowMobile ? window.innerHeight / 2 : window.innerHeight;
    bloomPass.resolution.set(newBloomResX, newBloomResY);

    composer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

gsap.registerPlugin(ScrollTrigger);

const panels = document.querySelectorAll('.init-anim');
panels.forEach(panel => {
    gsap.fromTo(panel,
        { y: 50, opacity: 0, autoAlpha: 0 },
        {
            y: 0, opacity: 1, autoAlpha: 1,
            duration: 1.2, ease: "power3.out",
            scrollTrigger: {
                trigger: panel,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".content",
        start: "top top",
        end: "bottom bottom",
        scrub: 2
    }
});

tl.to(animalsContainer.rotation, { x: Math.PI * 2, y: Math.PI * 4, ease: "none" }, 0)
    .to(animalsContainer.position, { z: 5, ease: "power1.inOut" }, 0)
    .to(bloomPass, { strength: 1.5, ease: "power2.inOut" }, 0);

(lionCloud.material as THREE.ShaderMaterial).uniforms.uOpacity.value = 1.0;

gsap.to((lionCloud.material as THREE.ShaderMaterial).uniforms.uOpacity, {
    value: 0.0,
    scrollTrigger: { trigger: "#section-2", start: "top bottom", end: "center center", scrub: 1 }
});
gsap.to((zebraCloud.material as THREE.ShaderMaterial).uniforms.uOpacity, {
    value: 1.0,
    scrollTrigger: { trigger: "#section-2", start: "top bottom", end: "center center", scrub: 1 }
});
gsap.to((bloomPass as any).tintColor, {
    r: 0.0, g: 1.0, b: 0.66,
    scrollTrigger: { trigger: "#section-2", start: "top bottom", end: "center center", scrub: 1 }
});

gsap.to((zebraCloud.material as THREE.ShaderMaterial).uniforms.uOpacity, {
    value: 0.0,
    scrollTrigger: { trigger: "#section-pricing", start: "top bottom", end: "top center", scrub: 1 }
});
gsap.to((giraffeCloud.material as THREE.ShaderMaterial).uniforms.uOpacity, {
    value: 1.0,
    scrollTrigger: { trigger: "#section-pricing", start: "top bottom", end: "top center", scrub: 1 }
});
gsap.to((bloomPass as any).tintColor, {
    r: 0.8, g: 0.0, b: 1.0,
    scrollTrigger: { trigger: "#section-pricing", start: "top bottom", end: "top center", scrub: 1 }
});

const beerVideo = document.getElementById('beer-video') as HTMLVideoElement | null;
const beerSection = document.getElementById('section-beer') as HTMLElement | null;

// Reveal beer section only when it enters viewport (avoids white flash)
if (beerSection) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                beerSection.classList.add('visible');
                revealObserver.unobserve(beerSection);
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.01 });
    revealObserver.observe(beerSection);
}

if (beerVideo) {
    function setupVideoScrubbing() {
        const dur = isNaN(beerVideo!.duration) ? 10.0 : beerVideo!.duration;
        beerVideo!.currentTime = 0;
        gsap.to(beerVideo, {
            currentTime: Math.max(0.1, dur - 0.1),
            ease: "none",
            scrollTrigger: {
                trigger: "#section-beer",
                start: "top center",
                end: "bottom bottom",
                scrub: true
            }
        });
    }

    if (beerVideo.readyState >= 1) {
        setupVideoScrubbing();
    } else {
        beerVideo.addEventListener('loadedmetadata', setupVideoScrubbing);
    }

    beerVideo.load();
}
