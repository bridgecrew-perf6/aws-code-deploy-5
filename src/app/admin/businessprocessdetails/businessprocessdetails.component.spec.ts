import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessprocessdetailsComponent } from './businessprocessdetails.component';

describe('BusinessprocessdetailsComponent', () => {
  let component: BusinessprocessdetailsComponent;
  let fixture: ComponentFixture<BusinessprocessdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessprocessdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessprocessdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
