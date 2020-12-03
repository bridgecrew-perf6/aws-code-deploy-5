import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SublocationdetailComponent } from './sublocationdetail.component';

describe('SublocationdetailComponent', () => {
  let component: SublocationdetailComponent;
  let fixture: ComponentFixture<SublocationdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SublocationdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SublocationdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
