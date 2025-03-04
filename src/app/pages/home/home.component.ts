import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { iEvent } from '../../interfaces/i-event';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  events$!: Observable<iEvent[]>;
  currentUser!: iUser | null;
  savedEvents: iEvent[] = [];

  constructor(
    private eventSvr: EventService,
    private authSvr: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.events$ = this.eventSvr.getAllEvents();
    this.currentUser = this.authSvr.getCurrentUser();
    if (this.currentUser) {
      const key = `saved_${this.currentUser.id}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        this.savedEvents = JSON.parse(saved);
      }
    }
  }

  onSaveFavorite(event: iEvent) {
    if (!this.currentUser) {
      this.router.navigate(['/auth/register']);
      return;
    }
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
