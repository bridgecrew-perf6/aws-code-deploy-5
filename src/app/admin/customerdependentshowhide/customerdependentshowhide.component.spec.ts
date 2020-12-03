import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdependentshowhideComponent } from './customerdependentshowhide.component';

describe('CustomerdependentshowhideComponent', () => {
  let component: CustomerdependentshowhideComponent;
  let fixture: ComponentFixture<CustomerdependentshowhideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerdependentshowhideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerdependentshowhideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
