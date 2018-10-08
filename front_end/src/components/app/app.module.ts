import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  APP_INITIALIZER, Injectable  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggle, MatSlideToggleModule, MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConfigService } from '../../service/config.service';
import { ApiService } from '../../service/api.service';
import { RaindropDataService } from '../../service/raindrop.data.service';
import { AppComponent } from './app.component';
import { ApiErrorHandler } from '../../service/api.error.handle';

import { AppRoutingModule } from './app.routing.module';

export function loadConfiguration(configService: ConfigService, httpClient: HttpClient) {
  return () => configService.load(httpClient).then(() => {
      //FB.init(config.facebook.sdkConfig);
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  providers: [
    ApiErrorHandler,
    HttpClient,
    ConfigService,
    ApiService,
    RaindropDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
