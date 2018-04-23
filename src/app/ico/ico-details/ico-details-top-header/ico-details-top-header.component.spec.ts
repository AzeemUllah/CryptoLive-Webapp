import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoDetailsTopHeaderComponent } from './ico-details-top-header.component';

describe('IcoDetailsTopHeaderComponent', () => {
  let component: IcoDetailsTopHeaderComponent;
  let fixture: ComponentFixture<IcoDetailsTopHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoDetailsTopHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoDetailsTopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
