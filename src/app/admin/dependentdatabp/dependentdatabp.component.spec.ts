import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentdatabpComponent } from './dependentdatabp.component';

describe('DependentdatabpComponent', () => {
  let component: DependentdatabpComponent;
  let fixture: ComponentFixture<DependentdatabpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentdatabpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentdatabpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
