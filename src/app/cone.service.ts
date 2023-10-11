import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Params {
  id: number;
  height: number;
  radius: number;
  segments: number;
}

export interface Triangle {
  a: {};
  p: {};
  p1: {};
}

@Injectable({
  providedIn: 'root',
})
export class ConeService {
  URL = 'api/params';
  URLcoordinations = 'api/coordinations';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private _http: HttpClient) {}

  getParams(): Observable<Params> {
    return this._http.get<Params>(this.URL);
  }

  getCalc(): Observable<number> {
    return this._http.get<number>(this.URLcoordinations);
  }

  putParams(params: Params) {
    return this._http.put<Params>(this.URL, params);
  }

  onCalc(params: Params) {
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
  }
}
