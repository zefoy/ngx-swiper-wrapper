import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';

import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { AppComponent } from './app.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
   slidesPerView: 4,
   spaceBetween: 40,
   breakpoints: {
     1024: {
   slidesPerView: 4,
   spaceBetween: 40,
 },
 767: {
   slidesPerView: 3,
   spaceBetween: 20,
 },
 479: {
   slidesPerView: 2,
   spaceBetween: 10

 }
},
   centeredSlides: true,
   keyboard: true,
   mousewheel: false,
   freeMode: false,
   speed: 1000,
   autoplay: {
delay: 2000,
stopOnLast: false
},
   effect: 'slide',
   grabCursor: true,
   loop: true,
};

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    SwiperModule,
    BrowserModule,
    FlexLayoutModule
  ],
  exports: [
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class AppModule {}
