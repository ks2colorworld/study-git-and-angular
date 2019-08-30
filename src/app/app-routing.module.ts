import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'', redirectTo:'/dashboard', pathMatch:'full'}, //대응: (root url) >> 주소전환 (root url)/dashboard
  {path:'heroes', component:HeroesComponent}, // 인터넷주소창에 (root주소)/heroes 가 입력되면 해당 컴포넌트를 표시한다.
  {path:'dashboard', component: DashboardComponent}, // 대응 : (root url)/dashboard
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
