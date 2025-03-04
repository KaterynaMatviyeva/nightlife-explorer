import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { iEvent } from '../../../interfaces/i-event';

@Component({
  selector: 'app-pre-party',
  templateUrl: './pre-party.component.html',
  styleUrl: './pre-party.component.scss',
})
export class PrePartyComponent implements OnInit {
  constructor(private eventSrv: EventService) {}

  preParty!: iEvent[];

  ngOnInit(): void {
    this.eventSrv.getPrePartyEvents().subscribe((events: iEvent[]) => {
      this.preParty = events;
    });
  }
}
