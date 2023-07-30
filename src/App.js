import './App.css';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { objectOptions } from './helper';
function App() {




  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 96;

    //dat.gui

    //renderer
    const canvas = document.getElementById("mycanvas");
    const renderer = new THREE.WebGL1Renderer({
      canvas,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("root").appendChild(renderer.domElement);

    //Lighting
    const ambientLight = new THREE.AmbientLight(0Xffff00, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);

    //Objects in scene
    const shape = new THREE.BoxGeometry(16, 16, 16);
    const material = new THREE.MeshNormalMaterial({ wireframe: 'true' });
    const cube = new THREE.Mesh(shape, material);

    const gui = new GUI();


    const rotationFolder = gui.addFolder('Rotations');
    rotationFolder.add(cube.rotation, 'x', 0, Math.PI).name('Rotate cube on X axis');
    rotationFolder.add(cube.rotation, 'y', 0, Math.PI).name('Rotate cube on Y axis');
    rotationFolder.add(cube.rotation, 'z', 0, Math.PI).name('Rotate cube on Z axis');


    const sizeFolder = gui.addFolder('Scale');
    sizeFolder.add(cube.scale, 'x', 0, 2).name('Scale Cube Along X Axis');



    scene.add(cube)





    //animate
    const animate = () => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    }
    animate();

  }, [])




  return (
    <div className="App">
      <canvas id="mycanvas" />
    </div>
  );
}

export default App;
