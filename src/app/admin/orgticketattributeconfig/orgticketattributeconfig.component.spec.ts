import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgticketattributeconfigComponent } from './orgticketattributeconfig.component';

describe('OrgticketattributeconfigComponent', () => {
  let component: OrgticketattributeconfigComponent;
  let fixture: ComponentFixture<OrgticketattributeconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgticketattributeconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgticketattributeconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
