import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailForRouterComponent } from './hero-detail-for-router.component';

describe('HeroDetailForRouterComponent', () => {
  let component: HeroDetailForRouterComponent;
  let fixture: ComponentFixture<HeroDetailForRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailForRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailForRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
