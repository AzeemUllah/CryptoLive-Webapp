import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoDetailsVideoSectionComponent } from './ico-details-video-section.component';

describe('IcoDetailsVideoSectionComponent', () => {
  let component: IcoDetailsVideoSectionComponent;
  let fixture: ComponentFixture<IcoDetailsVideoSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoDetailsVideoSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoDetailsVideoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
