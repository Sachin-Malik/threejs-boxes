import './App.css';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { objectOptions } from './helper';
function App() {

  const [boxSelected, setBoxSelected] = useState('Box');



  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 96;

    //renderer
    const canvas = document.getElementById("mycanvas");
    const renderer = new THREE.WebGL1Renderer({
      canvas,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight * .9);
    document.getElementById("root").appendChild(renderer.domElement);

    //Lighting
    const ambientLight = new THREE.AmbientLight(0Xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);

    //Objects in scene
    const shape = new THREE.BoxGeometry(16, 16, 16);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(shape, material);

    const shape1 = new THREE.CylinderGeometry(10, 10, 20);
    const cyclinder = new THREE.Mesh(shape1, material);

    const shape3 = new THREE.TorusGeometry(10, 3, 10);
    const torus = new THREE.Mesh(shape3, material);

    boxSelected === 'Box' ? scene.add(cube) : scene.remove(cube);
    boxSelected === 'Cyclinder' ? scene.add(cyclinder) : scene.remove(cyclinder);
    boxSelected === 'Torus' ? scene.add(torus) : scene.remove(torus);




    //animate
    const animate = () => {
      if (boxSelected === 'Box') {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      } else if (boxSelected === 'Cyclinder') {
        cyclinder.rotation.x += 0.01;
        cyclinder.rotation.z += 0.01
      } else if (boxSelected === 'Torus') {
        torus.rotation.z += 0.02;
        torus.rotation.x += 0.02;
      }

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }
    animate();

  }, [boxSelected])




  return (
    <div className="App">
      <canvas id="mycanvas" />
      <h1 style={{ fontWeight: '800' }}>Shape Selector</h1>
      <select className='select' value={boxSelected}>
        {
          objectOptions.map((item) => {
            return <option onClick={() => setBoxSelected(item)} >{item}</option>
          })
        }
      </select>
    </div>
  );
}

export default App;
