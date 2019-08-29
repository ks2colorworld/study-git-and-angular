import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHeroes(): Observable<Hero[]>{
    return of(HEROES).pipe(
      delay(1500) // 1.5초 - 데이터 로딩이 늦는 경우를 강제 구현해 봄.
    );
  }
  constructor() { }
}
