import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshStandardMaterial } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#BG"),
    alpha: true,
});


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);

camera.position.setZ(9);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);



renderer.render( scene, camera ); 

let slushie;

const loader = new GLTFLoader();

loader.load('../models/slushie.glb', (gltf) => {
    slushie = gltf.scene;
    slushie.position.set(0, 0, 0);
    slushie.scale.set(0.5, 0.5, 0.5);
    slushie.rotation.z = 75;
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

    camera.position.z = 9 + t * -0.01;;
    slushie.position.x = t * -0.03;
}

document.body.onscroll = moveCam;

function animate() {
    requestAnimationFrame( animate );

    slushie.rotation.y += 0.01;

    renderer.render( scene, camera );
}

animate();