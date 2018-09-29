import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  APP_INITIALIZER, Injectable  } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from '../../service/config.service';
import { ApiService } from '../../service/api.service';
import { RaindropDataService } from '../../service/raindrop.data.service';
import { AppComponent } from './app.component';
import { ApiErrorHandler } from '../../service/api.error.handle';
import { RouterModule } from '@angular/router' ;
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
