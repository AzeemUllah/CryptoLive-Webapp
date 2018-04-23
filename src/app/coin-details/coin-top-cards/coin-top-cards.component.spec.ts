import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTopCardsComponent } from './coin-top-cards.component';

describe('CoinTopCardsComponent', () => {
  let component: CoinTopCardsComponent;
  let fixture: ComponentFixture<CoinTopCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinTopCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinTopCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
