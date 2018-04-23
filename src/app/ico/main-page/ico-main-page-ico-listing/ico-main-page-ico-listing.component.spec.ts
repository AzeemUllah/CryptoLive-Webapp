import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcoMainPageIcoListingComponent } from './ico-main-page-ico-listing.component';

describe('IcoMainPageIcoListingComponent', () => {
  let component: IcoMainPageIcoListingComponent;
  let fixture: ComponentFixture<IcoMainPageIcoListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcoMainPageIcoListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcoMainPageIcoListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
