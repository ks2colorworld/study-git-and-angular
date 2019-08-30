import { MessageService } from './../message.service';
import { HeroService } from './../hero.service';
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from "../hero";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero:Hero; //활용예시 : <app-hero-detail [hero]="selectedHero"></app-hero-detail>

  updateHero(hero: Hero):void{
    hero.name = hero.name.trim();
    if(!hero.name){return;}
    this.heroService.updateHero(hero)
      .subscribe(
        _ => this.messageService.add(`updated hero ${hero.id} - ${hero.name}`)
      );
  }
  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

}
