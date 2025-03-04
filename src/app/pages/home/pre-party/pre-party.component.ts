import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { iEvent } from '../../../interfaces/i-event';
import { iUser } from '../../../interfaces/i-user';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-pre-party',
  templateUrl: './pre-party.component.html',
  styleUrl: './pre-party.component.scss',
})
export class PrePartyComponent implements OnInit {
  constructor(private eventSrv: EventService, private authSrv: AuthService) {}

  preParty: iEvent[] = [];
  currentUser!: iUser | null;
  savedEvents: iEvent[] = [];

  ngOnInit(): void {
    this.eventSrv.getPrePartyEvents().subscribe((events: iEvent[]) => {
      this.preParty = events;
    });
    this.currentUser = this.authSrv.getCurrentUser();
    if (this.currentUser) {
      const key = `saved_${this.currentUser.id}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        this.savedEvents = JSON.parse(saved);
      }
    }
  }
  onSaveFavorite(event: iEvent) {
    const alreadyFav = this.savedEvents.some((ev) => ev.id === event.id);
    if (!alreadyFav) {
      this.savedEvents.push(event);
      this.saveFavoritesToLocal();
      alert('Evento aggiunto ai preferiti!');
    } else {
      alert('Questo evento è già nei preferiti!');
    }
  }
  saveFavoritesToLocal() {
    if (!this.currentUser) return;
    const key = `favorites_${this.currentUser.id}`;
    localStorage.setItem(key, JSON.stringify(this.savedEvents));
  }

  removeFavorite(eventId: number) {
    this.savedEvents = this.savedEvents.filter((ev) => ev.id !== eventId);
    this.saveFavoritesToLocal();
  }

  toggleFavorite(event: iEvent) {
    if (this.isFavorite(event)) {
      this.removeFavorite(event.id);
    } else {
      this.onSaveFavorite(event);
    }
  }
  isFavorite(event: iEvent): boolean {
    return this.savedEvents.some((ev) => ev.id === event.id);
  }
}
