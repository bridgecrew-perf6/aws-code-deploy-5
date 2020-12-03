import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerattributeconfigComponent } from './customerattributeconfig.component';

describe('CustomerattributeconfigComponent', () => {
  let component: CustomerattributeconfigComponent;
  let fixture: ComponentFixture<CustomerattributeconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerattributeconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerattributeconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
