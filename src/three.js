import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshStandardMaterial } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#BG"),
    alpha: true,
});

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 3;
renderer.outputColorSpace = THREE.SRGBColorSpace;


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);

camera.position.setZ(12.5);

renderer.render( scene, camera ); 

let slushie;

const loader = new GLTFLoader();

loader.load('/models/slushie.glb', (gltf) => {
    slushie = gltf.scene;
    slushie.position.set(10, 0, 0);
    slushie.scale.set(0.5, 0.5, 0.5);
    slushie.rotation.z = 75;

    slushie.traverse((child) => {
        if (child.isMesh) {
            child.material.roughness = 0.4;
            child.material.metalness = 0.1;
        }
    });

    scene.add(slushie);

    scale();

}, undefined, (error) => {
    console.error("error");
});

window.addEventListener('resize', () => {
    renderer.setPixelRatio( window.devicePixelRatio );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    scale();
});

const initialX = 10;
const modelConfig = { initialX: 10 };


function moveCam() {
    if (slushie) {
        const scrollY = window.scrollY;

        camera.position.z = 12.5 - scrollY * 0.005;

        slushie.position.x = initialX + scrollY * 0.01;
    }
}


document.body.onscroll = moveCam;

function scale() {
  if (!slushie) return;

  const width = window.innerWidth;

  if (width < 600) {
    slushie.scale.set(0.3, 0.3, 0.3);
    modelConfig.initialX = 5;
  } else if (width < 1024) {
    slushie.scale.set(0.4, 0.4, 0.4);
    modelConfig.initialX = 7;
  } else {
    slushie.scale.set(0.5, 0.5, 0.5);
    modelConfig.initialX = 10;
  }

  const scrollY = window.scrollY;
  slushie.position.x = modelConfig.initialX + scrollY * 0.01;
}


function animate() {
    requestAnimationFrame( animate );

    if (slushie) {
        slushie.rotation.y += 0.01;
    }

    renderer.render( scene, camera );
}

animate();