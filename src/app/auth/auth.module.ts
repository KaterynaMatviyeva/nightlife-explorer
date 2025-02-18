import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  providers: [
    {
      useClass: TokenInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
})
export class AuthModule {}
