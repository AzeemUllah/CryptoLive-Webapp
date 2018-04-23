import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoDetailsSocialComponent } from './ico-details-social.component';

describe('IcoDetailsSocialComponent', () => {
  let component: IcoDetailsSocialComponent;
  let fixture: ComponentFixture<IcoDetailsSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoDetailsSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoDetailsSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
