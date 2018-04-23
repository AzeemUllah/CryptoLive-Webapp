import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesSectionComponent } from './images-section.component';

describe('ImagesSectionComponent', () => {
  let component: ImagesSectionComponent;
  let fixture: ComponentFixture<ImagesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
