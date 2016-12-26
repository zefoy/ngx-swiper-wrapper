declare var require: any;

import { Component, Injectable, Host, Inject, ElementRef } from '@angular/core';

import { SwiperViewComponent } from './swiper-view.component';

@Injectable()
@Component({
  selector: 'swiper-item',
  templateUrl: './swiper-item.component.html',
  styleUrls: ['./swiper-item.component.css'],
  host: {
    style: 'display: block;'
  }
})
export class SwiperItemComponent {
  constructor( @Inject(ElementRef) elementRef: ElementRef, @Host() @Inject(SwiperViewComponent) swiper: SwiperViewComponent
  ) {
    elementRef.nativeElement.classList.add('swiper-slide');

    swiper.update();
  }
}
