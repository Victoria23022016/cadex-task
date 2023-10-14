import { Injectable } from '@angular/core';

export interface Params {
  id: number;
  height: number;
  radius: number;
  segments: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConeService {
  params: Params;

  putParams(value: Params): void {
    this.params = value;
  }

  getCalc(): number[] {
    return this.makeCalc(this.params);
  }

  makeCalc(params: Params): number[] {
    function calcx(i: number) {
      return params.radius * Math.cos(2 * Math.PI * (i / params.segments));
    }

    function calcy(i: number) {
      return params.radius * Math.sin(2 * Math.PI * (i / params.segments));
    }

    const coordinates = [];
    for (let i = 0; i < params.segments; i++) {
      coordinates.push(
        0,
        0,
        params.height,
        calcx(i),
        calcy(i),
        0,
        calcx(i + 1),
        calcy(i + 1),
        0
      );
    }
    return coordinates;
  }
}
