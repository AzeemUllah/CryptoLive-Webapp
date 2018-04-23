import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoMainPageTopCardsComponent } from './ico-main-page-top-cards.component';

describe('IcoMainPageTopCardsComponent', () => {
  let component: IcoMainPageTopCardsComponent;
  let fixture: ComponentFixture<IcoMainPageTopCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoMainPageTopCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoMainPageTopCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
