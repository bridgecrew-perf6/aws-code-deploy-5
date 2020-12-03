import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgticketcustomconfigComponent } from './orgticketcustomconfig.component';

describe('OrgticketcustomconfigComponent', () => {
  let component: OrgticketcustomconfigComponent;
  let fixture: ComponentFixture<OrgticketcustomconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgticketcustomconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgticketcustomconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
