import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpdependentshowhideComponent } from './bpdependentshowhide.component';

describe('BpdependentshowhideComponent', () => {
  let component: BpdependentshowhideComponent;
  let fixture: ComponentFixture<BpdependentshowhideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpdependentshowhideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpdependentshowhideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
