import { Component, OnInit } from '@angular/core';
import { iEvent } from '../../../interfaces/i-event';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-after-party',
  templateUrl: './after-party.component.html',
  styleUrl: './after-party.component.scss',
})
export class AfterPartyComponent implements OnInit {
  constructor(private eventSvr: EventService) {}

  afterParty!: iEvent[];
  ngOnInit(): void {
    this.eventSvr.getAfterPartyEvents().subscribe((events: iEvent[]) => {
      this.afterParty = events;
    });
  }
}
