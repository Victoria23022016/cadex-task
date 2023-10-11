import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConeService, Params, Triangle } from './cone.service';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('forCanvas') CanvasRef: ElementRef<HTMLCanvasElement>;
  params: Params;
  coordinates = [
    0, 0, 5, 5, 0, 0, 1.5450849718747373, 4.755282581475767, 0, 0, 0, 5,
    1.5450849718747373, 4.755282581475767, 0, -4.045084971874736,
    2.9389262614623664, 0, 0, 0, 5, -4.045084971874736, 2.9389262614623664, 0,
    -4.045084971874738, -2.938926261462365, 0, 0, 0, 5, -4.045084971874738,
    -2.938926261462365, 0, 1.5450849718747361, -4.755282581475768, 0, 0, 0, 5,
    1.5450849718747361, -4.755282581475768, 0, 5, -1.2246467991473533e-15, 0,
  ]; //приходят с бэка

  constructor(private _coneService: ConeService) {}

  onUpdate(params: Params) {
    this.params = params;
    // this.coordinates = this._coneService.onCalc(this.params); //прописать как зарендерила canvas после наступления события
  }

  onCreateCone() {
    const positions = new Float32Array([...this.coordinates]);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      220,
      window.innerWidth / window.innerHeight,
      1,
      10
    ); //прописать как самая дальняя точка + 2;
    camera.position.set(5, 5, this.coordinates[2] + 2); //xyz прописать z через переменную

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.5, 0.5, 0.5),
      opacity: 0.5,
      transparent: true,
    });

    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(0, 0, 0);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xffffff })
    );
    scene.add(line);
    scene.add(cone);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 600);
    document.body.appendChild(renderer.domElement);
    function animation() {
      cone.rotation.z += 0.01;
      line.rotation.z += 0.01;
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animation);
  }

  ngOnInit() {
    this.onCreateCone();
  }
}
