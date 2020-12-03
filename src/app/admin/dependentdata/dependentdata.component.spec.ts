import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentdataComponent } from './dependentdata.component';

describe('DependentdataComponent', () => {
  let component: DependentdataComponent;
  let fixture: ComponentFixture<DependentdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
