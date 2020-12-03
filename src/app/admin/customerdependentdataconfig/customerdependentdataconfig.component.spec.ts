import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdependentdataconfigComponent } from './customerdependentdataconfig.component';

describe('CustomerdependentdataconfigComponent', () => {
  let component: CustomerdependentdataconfigComponent;
  let fixture: ComponentFixture<CustomerdependentdataconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerdependentdataconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdependentdataconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
