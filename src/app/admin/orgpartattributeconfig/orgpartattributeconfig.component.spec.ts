import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgpartattributeconfigComponent } from './orgpartattributeconfig.component';

describe('OrgpartattributeconfigComponent', () => {
  let component: OrgpartattributeconfigComponent;
  let fixture: ComponentFixture<OrgpartattributeconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgpartattributeconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgpartattributeconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
