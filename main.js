import "./style.css"
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);
renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial( { color: 'lightblue'});
const torus= new THREE.Mesh(geometry,material);

scene.add(torus);

const pointlight = new THREE.PointLight('pink');
pointlight.position.set(5,5,5)

const ambientlight = new THREE.AmbientLight('pink');
scene.add(pointlight,ambientlight)

const lighthelper = new THREE.PointLightHelper(pointlight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lighthelper,gridHelper)


 const controls = new OrbitControls(camera, renderer.domElement);

function addstar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
   
   star.position.set(x,y,z);
   scene.add(star);  
}

Array(200).fill().forEach(addstar)

//background

const spaceTexture = new THREE.TextureLoader().load('https://media.istockphoto.com/photos/star-field-at-night-picture-id501655522?b=1&k=20&m=501655522&s=170667a&w=0&h=yxV0H4RLzwn_roNsSxejPhL0JAQl7YGguAeL1PtniZw=')
scene.background= spaceTexture;





//onscroll functionality

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;

  camera.position.z= t*-0.01;
  camera.position.x= t*-0.0002;
  camera.position.y= t*-0.0002;
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x+=0.01;
  torus.rotation.y+=0.005;
  torus.rotation.z+=0.01;

 controls.update();
  renderer.render( scene, camera );
}
animate();