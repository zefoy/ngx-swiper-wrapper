import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { SwiperModule, SwiperConfigInterface } from 'angular2-swiper-wrapper';

import { AppComponent } from './app.component';

const SWIPER_CONFIG: SwiperConfigInterface = {
};

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SwiperModule.forRoot(SWIPER_CONFIG)
  ]
})
export class AppModule {}
