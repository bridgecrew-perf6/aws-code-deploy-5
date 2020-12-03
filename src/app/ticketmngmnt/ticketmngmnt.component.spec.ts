import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketmngmntComponent } from './ticketmngmnt.component';

describe('TicketmngmntComponent', () => {
  let component: TicketmngmntComponent;
  let fixture: ComponentFixture<TicketmngmntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketmngmntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketmngmntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
