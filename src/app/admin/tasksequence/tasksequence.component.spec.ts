import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksequenceComponent } from './tasksequence.component';

describe('TasksequenceComponent', () => {
  let component: TasksequenceComponent;
  let fixture: ComponentFixture<TasksequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
