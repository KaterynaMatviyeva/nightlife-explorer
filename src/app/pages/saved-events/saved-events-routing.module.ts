import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedEventsComponent } from './saved-events.component';

const routes: Routes = [{ path: '', component: SavedEventsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedEventsRoutingModule {}
