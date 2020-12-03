import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskattributeconfigComponent } from './taskattributeconfig.component';

describe('TaskattributeconfigComponent', () => {
  let component: TaskattributeconfigComponent;
  let fixture: ComponentFixture<TaskattributeconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskattributeconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskattributeconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
