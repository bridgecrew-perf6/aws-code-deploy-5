import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskcustomconfigComponent } from './taskcustomconfig.component';

describe('TaskcustomconfigComponent', () => {
  let component: TaskcustomconfigComponent;
  let fixture: ComponentFixture<TaskcustomconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskcustomconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskcustomconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
