import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { iEvent } from '../../interfaces/i-event';
import { Observable } from 'rxjs';
import { iUser } from '../../interfaces/i-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-saved-events',
  templateUrl: './saved-events.component.html',
  styleUrl: './saved-events.component.scss',
})
export class SavedEventsComponent implements OnInit {
  savedEvents: iEvent[] = [];
  currentUser!: iUser | null;

  constructor(private eventSvr: EventService, private authSrv: AuthService) {}
  ngOnInit(): void {
    this.currentUser = this.authSrv.getCurrentUser();
    if (!this.currentUser) {
      return;
    }
    const key = `favorites_${this.currentUser.id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      this.savedEvents = JSON.parse(saved);
    }
  }

  removeFavorite(eventId: number) {
    this.savedEvents = this.savedEvents.filter((ev) => ev.id !== eventId);
    this.saveFavoritesToLocal();
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

  saveFavoritesToLocal() {
    if (!this.currentUser) return;
    const key = `favorites_${this.currentUser.id}`;
    localStorage.setItem(key, JSON.stringify(this.savedEvents));
  }
}
