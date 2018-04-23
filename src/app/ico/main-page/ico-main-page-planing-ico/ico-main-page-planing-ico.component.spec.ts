import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoMainPagePlaningIcoComponent } from './ico-main-page-planing-ico.component';

describe('IcoMainPagePlaningIcoComponent', () => {
  let component: IcoMainPagePlaningIcoComponent;
  let fixture: ComponentFixture<IcoMainPagePlaningIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoMainPagePlaningIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoMainPagePlaningIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
