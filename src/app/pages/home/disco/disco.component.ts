import { iEvent } from './../../../interfaces/i-event';
import { Component } from '@angular/core';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-disco',
  templateUrl: './disco.component.html',
  styleUrl: './disco.component.scss',
})
export class DiscoComponent {
  constructor(private eventSrv: EventService) {}

  discoEvents!: iEvent[];

  ngOnInit(): void {
    this.eventSrv.getDiscoEvents().subscribe((events: iEvent[]) => {
      this.discoEvents = events;
    });
  }
}
