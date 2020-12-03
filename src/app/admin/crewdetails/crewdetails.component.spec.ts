import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewdetailsComponent } from './crewdetails.component';

describe('CrewdetailsComponent', () => {
  let component: CrewdetailsComponent;
  let fixture: ComponentFixture<CrewdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
