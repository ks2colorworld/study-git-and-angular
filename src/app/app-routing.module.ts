import { HeroDetailForRouterComponent } from './hero-detail-for-router/hero-detail-for-router.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'/dashboard', pathMatch:'full'}, //대응: (root url) >> 주소전환 (root url)/dashboard
  {path:'heroes', component:HeroesComponent}, // 인터넷주소창에 (root주소)/heroes 가 입력되면 해당 컴포넌트를 표시한다.
  {path:'dashboard', component: DashboardComponent}, // 대응 : (root url)/dashboard
  {path:'detail/:id', component:HeroDetailForRouterComponent}, // 대응예시 : (root url)/detail/11 >> 'id = 11'로 사용
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
