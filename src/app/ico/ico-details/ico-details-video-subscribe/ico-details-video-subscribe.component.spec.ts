import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoDetailsVideoSubscribeComponent } from './ico-details-video-subscribe.component';

describe('IcoDetailsVideoSubscribeComponent', () => {
  let component: IcoDetailsVideoSubscribeComponent;
  let fixture: ComponentFixture<IcoDetailsVideoSubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoDetailsVideoSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoDetailsVideoSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
