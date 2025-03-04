import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { iEvent } from '../../../interfaces/i-event';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {
  //   events$: Observable<iEvent[]>;
  //   constructor(private eventService: EventService) {
  //     this.events$ = this.eventService.getAllEvents();
  //   }
  //   ngOnInit(): void {
  //     // La lista degli eventi è già gestita dal BehaviorSubject
  //     console.log('srgsthhsterthrts');
  //   }
  //   onSaveEvent(eventId: number): void {
  //     this.eventService.saveEvent(eventId).subscribe({
  //       next: () => console.log('evento salvato', eventId),
  //       // alert('Evento salvato nei preferiti!'),
  //       error: (err: Error) =>
  //         console.error("Errore nel salvataggio dell'evento:", err),
  //     });
  //   }
}
