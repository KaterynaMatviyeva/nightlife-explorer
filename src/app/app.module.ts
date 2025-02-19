import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './main-components/header/header.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, NgbDropdownModule],
  providers: [
    provideHttpClient(),

    {
      useClass: TokenInterceptor,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
