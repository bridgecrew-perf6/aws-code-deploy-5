import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgpartcustomconfigComponent } from './orgpartcustomconfig.component';

describe('OrgpartcustomconfigComponent', () => {
  let component: OrgpartcustomconfigComponent;
  let fixture: ComponentFixture<OrgpartcustomconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgpartcustomconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgpartcustomconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
