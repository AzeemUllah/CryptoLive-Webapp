import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinChartsComponent } from './coin-charts.component';

describe('CoinChartsComponent', () => {
  let component: CoinChartsComponent;
  let fixture: ComponentFixture<CoinChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
