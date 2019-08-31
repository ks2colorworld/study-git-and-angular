import { MessageService } from './../message.service';
import { environment } from './../../environments/environment';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

 /* 이렇게 하는게 맞을 듯.
 newName: string;
 addNewHero(): void{
   this.newName = this.newName.trim();
   if (!this.newName) {
     return;
   }
   this.heroService.addHero({name: this.newName} as Hero)
     .subscribe(
       hero => {
         this.heroes.push(hero);
         this.newName = '';
       }
     )
 }
 //*/

  add(name:string): void{
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name: name} as Hero) //{name} as Hero : 프로퍼티와 value 파라메터가 같으면 구분하지 않아도 된다.
      .subscribe(
        hero => {
          this.heroes.push(hero);
          this.ms.add(`added hero ${hero.id} - ${hero.name}`);
        }
      )
  }

  delete(hero: Hero): void{
    this.heroService.deleteHero(hero)
      .subscribe(
        _ => {
          //this.heroes = this.heroes.filter(h => h != hero); // 새 데이터 확인 못함.
          this.getHeroes(); // 새 데이터 확인해야 함.
          this.ms.add(`deleted hero ${hero.id} - ${hero.name}`)
        }
      );
  }

  heroes: Hero[];
  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(
        heroes => this.heroes = heroes
      );
  }

  constructor(
    private heroService: HeroService,
    private ms: MessageService,
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

}
