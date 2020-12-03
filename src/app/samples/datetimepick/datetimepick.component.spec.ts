import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimepickComponent } from './datetimepick.component';

describe('DatetimepickComponent', () => {
  let component: DatetimepickComponent;
  let fixture: ComponentFixture<DatetimepickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimepickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimepickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
