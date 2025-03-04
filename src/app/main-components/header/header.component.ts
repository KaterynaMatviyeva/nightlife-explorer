import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../interfaces/i-user';
import { iEvent } from '../../interfaces/i-event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(public authSvr: AuthService, public eventSvr: EventService) {}

  user!: iUser | null;

  ngOnInit(): void {
    this.user = this.authSvr.getCurrentUser();
  }

  logout() {
    this.authSvr.logout();
  }
}
