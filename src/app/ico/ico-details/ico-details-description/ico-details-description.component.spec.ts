import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoDetailsDescriptionComponent } from './ico-details-description.component';

describe('IcoDetailsDescriptionComponent', () => {
  let component: IcoDetailsDescriptionComponent;
  let fixture: ComponentFixture<IcoDetailsDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoDetailsDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoDetailsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
