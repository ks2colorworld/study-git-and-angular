import { InMemoryDbService } from "angular-in-memory-web-api";
import { Hero } from "./hero";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    /* 데이터와의 작동 방식을 확인하기 위해 변경해 봄. */
    const heroes1 = [
      { id: 11, name: 'Dr Nice', age: 20, place: 'us'},
      { id: 12, name: 'Narco', age: 30, place: 'kr' },
      { id: 13, name: 'Bombasto', age: 40, place: 'uk' },
      { id: 14, name: 'Celeritas', age: 15, place: 'us' },
      { id: 15, name: 'Magneta', age: 60, place: 'jp' },
      { id: 16, name: 'RubberMan', age: 70, place: 'cn' },
      { id: 17, name: 'Dynama', age: 44, place: 'dh' },
      { id: 18, name: 'Dr IQ', age: 38, place: 'uk' },
      { id: 19, name: 'Magma', age: 25, place: 'sw' },
      { id: 20, name: 'Tornado', age: 58, place: 'hk' },
    ];
    const heroes2 = [
      { id: 111, name: 'new Dr Nice'},
      { id: 112, name: 'new Narco' },
      { id: 113, name: 'new Bombasto' },
      { id: 114, name: 'new Celeritas' },
      { id: 115, name: 'new Magneta' },
      { id: 116, name: 'new RubberMan' },
      { id: 117, name: 'new Dynama' },
      { id: 118, name: 'new Dr IQ' },
      { id: 119, name: 'new Magma' },
      { id: 120, name: 'new Tornado' },
    ];
    if(environment.detailMessage){
    console.log(heroes1);
    console.log(heroes2);
    }
    return {heroes1, heroes2};
  }

  genId(heroes: Hero[]): number{
    if(environment.detailMessage)
    console.log(heroes);
    return heroes.length > 0?
      Math.max(...heroes.map(hero => hero.id)) + 1 :
      11;
  }

  constructor() { }
}
