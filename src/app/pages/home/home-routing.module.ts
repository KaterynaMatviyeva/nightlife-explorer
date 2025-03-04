import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DiscoComponent } from './disco/disco.component';
import { PrePartyComponent } from './pre-party/pre-party.component';
import { AfterPartyComponent } from './after-party/after-party.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'disco', component: DiscoComponent },
  { path: 'pre-party', component: PrePartyComponent },
  { path: 'after-party', component: AfterPartyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
