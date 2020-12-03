import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercustomconfigComponent } from './customercustomconfig.component';

describe('CustomercustomconfigComponent', () => {
  let component: CustomercustomconfigComponent;
  let fixture: ComponentFixture<CustomercustomconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomercustomconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercustomconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
