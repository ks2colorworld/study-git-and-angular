import { environment } from './../../environments/environment';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(
        heroes => this.heroes = heroes
      );
  }

  selectedHero:Hero;
  onSelect(hero: Hero): void{
    if(environment.detailMessage) console.log(hero);
    this.selectedHero = hero;
  }

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

}
