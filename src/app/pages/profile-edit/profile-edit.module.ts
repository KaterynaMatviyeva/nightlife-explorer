import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileEditRoutingModule } from './profile-edit-routing.module';
import { ProfileEditComponent } from './profile-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileEditComponent],
  imports: [
    CommonModule,
    ProfileEditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProfileEditModule {}
