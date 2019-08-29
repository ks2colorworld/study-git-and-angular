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

  constructor() { }

  ngOnInit() {
  }

}
