import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinHeadingComponent } from './coin-heading.component';

describe('CoinHeadingComponent', () => {
  let component: CoinHeadingComponent;
  let fixture: ComponentFixture<CoinHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
