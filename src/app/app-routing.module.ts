import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guardas/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    title: 'Login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    title: 'Home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'events',
    title: 'My-events',
    loadChildren: () =>
      import('./pages/events/events.module').then((m) => m.EventsModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'profile',
    title: 'Profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'profile-edit',
    title: 'Profile-edit',
    loadChildren: () =>
      import('./pages/profile-edit/profile-edit.module').then(
        (m) => m.ProfileEditModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'saved-event',
    title: 'Saved-events',
    loadChildren: () =>
      import('./pages/saved-events/saved-events.module').then(
        (m) => m.SavedEventsModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
