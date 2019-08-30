import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { MessageService } from "./message.service";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHeroes(): Observable<Hero[]>{
    if(environment.detailMessage)
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES).pipe(
      delay(800) // 0.8초 - 데이터 로딩이 늦는 경우를 강제 구현해 봄.
    );
  }
  getHero(id: number): Observable<Hero> {
    if(environment.detailMessage)
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(
      hero => hero.id === id)
      ).pipe(
        delay(800) // 0.8초 - 데이터 로딩 중인 척
      );
  }

  constructor(
    private messageService: MessageService,
  ) { }
}
