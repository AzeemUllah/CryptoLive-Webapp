import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBanerComponent } from './top-baner.component';

describe('TopBanerComponent', () => {
  let component: TopBanerComponent;
  let fixture: ComponentFixture<TopBanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
