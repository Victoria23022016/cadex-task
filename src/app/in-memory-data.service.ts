import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Params } from './cone.service';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const params = [
      {
        id: 11,
        height: 0,
        radius: 0,
        segments: 0,
      },
    ];

    const calc = function (params: Params) {
      function calcx(i: number) {
        return params.radius * Math.cos(2 * Math.PI * (i / params.segments));
      }

      function calcy(i: number) {
        return params.radius * Math.sin(2 * Math.PI * (i / params.segments));
      }

      const coordinations = [];
      for (let i = 0; i < params.segments; i++) {
        coordinations.push(
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
      return coordinations;
    };

    const coordinates = calc(params[0]);
    return { params, coordinates };
  }
}
