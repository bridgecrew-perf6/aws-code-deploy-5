import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermngmntComponent } from './usermngmnt.component';

describe('UsermngmntComponent', () => {
  let component: UsermngmntComponent;
  let fixture: ComponentFixture<UsermngmntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermngmntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermngmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
