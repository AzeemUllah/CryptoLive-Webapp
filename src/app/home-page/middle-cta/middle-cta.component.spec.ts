import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleCtaComponent } from './middle-cta.component';

describe('MiddleCtaComponent', () => {
  let component: MiddleCtaComponent;
  let fixture: ComponentFixture<MiddleCtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiddleCtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
