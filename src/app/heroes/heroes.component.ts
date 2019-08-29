import { environment } from './../../environments/environment';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HEROES } from "../mock-heroes";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes = HEROES;
  hero: Hero = {
    id:1,
    name:'Windstorm',
  }

  selectedHero:Hero;
  onSelect(hero: Hero): void{
    /* environment 사용 확인 : import { environment } from './../../environments/environment';
    console.log('environment.detailMessage : ' + environment.detailMessage);
    console.log('environment.production : ' + environment.production);
    console.log('environment.server_url : ' + environment.server_url);
    //*/
    if(environment.detailMessage) console.log(hero);
    this.selectedHero = hero;
  }

  constructor() { }

  ngOnInit() {
  }

}
