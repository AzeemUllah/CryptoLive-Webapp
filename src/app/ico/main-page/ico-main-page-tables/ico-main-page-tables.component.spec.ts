import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoMainPageTablesComponent } from './ico-main-page-tables.component';

describe('IcoMainPageTablesComponent', () => {
  let component: IcoMainPageTablesComponent;
  let fixture: ComponentFixture<IcoMainPageTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoMainPageTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoMainPageTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
