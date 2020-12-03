import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentshowhidebpComponent } from './dependentshowhidebp.component';

describe('DependentshowhidebpComponent', () => {
  let component: DependentshowhidebpComponent;
  let fixture: ComponentFixture<DependentshowhidebpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentshowhidebpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentshowhidebpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
