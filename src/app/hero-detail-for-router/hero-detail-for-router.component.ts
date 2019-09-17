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
  getHero(isObservale?: boolean):void{
    const id = +this.route.snapshot.paramMap.get('id');

    if(isObservale){
    this.heroService.getHero(id,true) // .gethero(id) // .getHero(id, true) // .getHeroNo404(id) //
      .subscribe(
        hero => {//this.afterGetHero(hero)// this.hero = hero
          this.hero = hero;
          if(environment.detailMessage)
          console.log(this.hero);
        }
      );
      return;
    }

    //* service 에서 데이터 조작할 경우(기본)
    this.heroService.getHeroForPromise(id)
      .then(hero => this.hero = hero);
    //*/

    /* component 에서 데이터 조작할 경우
    this.heroService.getHeroForPromise(id)
      .then(hero => {
        this.hero = this.heroService.getHeroForPromiseThen(hero);
      });
    //*/
  }

  /* 사용안함. << 기존에는 데이터 조작 함수를 component 단에서 구현함 > service로 옮김.
  // 추가 조작이 필요한 경우 재활용이 필요한 경우에만 별도 함수 작성함. (코드 읽기 복잡해짐.)
  afterGetHero(hero:Hero):void{
    this.hero = hero;
    if(environment.detailMessage)
    console.log(this.hero);
  }
  //*/

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    public location: Location, //template에서 사용하기 위해서 public으로 수정함.
  ) { }

  ngOnInit() {
    this.getHero();
  }

}
