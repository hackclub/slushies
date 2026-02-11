import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshStandardMaterial } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#BG"),
    alpha: true,
});

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;
renderer.outputColorSpace = THREE.SRGBColorSpace;


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);

camera.position.setZ(12.5);

new RGBELoader()
  .load('path/to/hdri.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });


renderer.render( scene, camera ); 

let slushie;

const loader = new GLTFLoader();

loader.load('../models/slushie.glb', (gltf) => {
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
}, undefined, (error) => {
    console.error("error");
});

window.addEventListener('resize', () => {
    renderer.setPixelRatio( window.devicePixelRatio );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function moveCam() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = 12.5 + t * -0.01;;
    slushie.position.x = t * -0.035;
}

// document.body.onscroll = moveCam;

function animate() {
    requestAnimationFrame( animate );

    if (slushie) {
        slushie.rotation.y += 0.01;
    }

    renderer.render( scene, camera );
}

animate();