import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpdependentdataconfigComponent } from './bpdependentdataconfig.component';

describe('BpdependentdataconfigComponent', () => {
  let component: BpdependentdataconfigComponent;
  let fixture: ComponentFixture<BpdependentdataconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpdependentdataconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpdependentdataconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
