declare var require: any;

import { Component, Injectable, Host, Inject, ElementRef } from '@angular/core';

import { SwiperViewComponent } from './swiper-view.component';

@Injectable()
@Component({
  selector: 'swiper-item',
  template: require('swiper-item.component.html'),
  styles: [require('swiper-item.component.scss')]
})
export class SwiperItemComponent {
  constructor( @Inject(ElementRef) elementRef: ElementRef, @Host() @Inject(SwiperViewComponent) swiper: SwiperViewComponent
  ) {
    elementRef.nativeElement.classList.add('swiper-slide');

    swiper.update();
  }
}
