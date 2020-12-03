import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentshowhideComponent } from './dependentshowhide.component';

describe('DependentshowhideComponent', () => {
  let component: DependentshowhideComponent;
  let fixture: ComponentFixture<DependentshowhideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentshowhideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentshowhideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
