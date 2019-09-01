import { HeroService } from './../hero.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Hero } from '../hero';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hero-detail-for-router',
  templateUrl: './hero-detail-for-router.component.html',
  styleUrls: ['./hero-detail-for-router.component.scss']
})
export class HeroDetailForRouterComponent implements OnInit {

  hero:Hero;
  getHero():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id,true) // .gethero(id) // .getHero(id, true) // .getHeroNo404(id) //
      .subscribe(
        hero => this.afterGetHero(hero)// this.hero = hero
      );
  }

  afterGetHero(hero:Hero):void{
    this.hero = hero;
    if(environment.detailMessage)
    console.log(this.hero);

  }

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    public location: Location, //template에서 사용하기 위해서 public으로 수정함.
  ) { }

  ngOnInit() {
    this.getHero();
  }

}
