import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishIcoComponent } from './publish-ico.component';

describe('PublishIcoComponent', () => {
  let component: PublishIcoComponent;
  let fixture: ComponentFixture<PublishIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
