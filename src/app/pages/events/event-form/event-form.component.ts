import { Component, OnInit } from '@angular/core';
import { iEvent } from '../../../interfaces/i-event';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { iUser } from '../../../interfaces/i-user';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
})
export class EventFormComponent implements OnInit {
  event: iEvent = {
    id: 0,
    title: '',
    description: '',
    eventDate: '',
    location: '',
    organizerId: 0,
    organizerUsername: '',
    ticketLink: '',
    category: 'Discoteca',
  };

  user!: iUser | null;

  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private authSvr: AuthService
  ) {}

  ngOnInit(): void {
    const eventId: string | null = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.isEditMode = true;

      this.eventService.getAllEvents().subscribe((events: iEvent[]) => {
        const foundEvent: iEvent | undefined = events.find(
          (ev) => ev.id === +eventId
        );
        if (foundEvent) {
          this.event = foundEvent;
        }
      });
    }

    this.user = this.authSvr.getCurrentUser();
  }

  submitEvent(): void {
    if (this.isEditMode) {
      this.eventService.updateEvent(this.event.id, this.event).subscribe({
        next: () => {
          alert('Evento aggiornato con successo!');
          this.router.navigate(['/events/manage']);
        },
        error: (err: Error) => console.error("Errore nell'aggiornamento:", err),
      });
    } else {
      this.eventService.createEvent(this.event).subscribe({
        next: () => {
          alert('Evento creato con successo!');
          this.router.navigate(['/events/manage']);
        },
        error: (err: Error) => console.error('Errore nella creazione:', err),
      });
    }
  }
}
