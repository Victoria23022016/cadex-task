import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cone-view',
  templateUrl: './cone-view.component.html',
  styleUrls: ['./cone-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConeViewComponent {
  @ViewChild('conus') conusRef: ElementRef<HTMLCanvasElement>;
  private _coordinates: number[];
  @Input() set coordinates(value: number[]) {
    this._coordinates = value;
    this._onCreateCone();
  }

  constructor(private readonly _cdr: ChangeDetectorRef) {}

  private _onCreateCone(): void {
    const coneTemplate = this.conusRef.nativeElement;

    const positions = new Float32Array([...this._coordinates]);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      220,
      window.innerWidth / window.innerHeight,
      1,
      10
    );
    camera.position.set(5, 5, this._coordinates[2] + 2);

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
    renderer.setSize(600, 270);

    coneTemplate.innerHTML = '';
    coneTemplate.appendChild(renderer.domElement);

    function animation() {
      cone.rotation.z += 0.01;
      line.rotation.z += 0.01;
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animation);
    this._cdr.detectChanges();
  }
}
