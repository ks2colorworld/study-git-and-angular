import { InMemoryDbService } from "angular-in-memory-web-api";
import { Hero } from "./hero";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    const heroes = [
      {id:11, name: 'Dr Nice'},
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
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

    return {heroes, heroes2};
  }

  genId(heroes: Hero[]): number{
    return heroes.length > 0?
      Math.max(...heroes.map(hero => hero.id)) + 1 :
      11;
  }

  constructor() { }
}
