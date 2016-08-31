import { Injectable, Inject, Component, ElementRef, Host, Input } from '@angular/core';

import { SwiperViewComponent } from './swiper-view.component';

@Injectable()
@Component({
  selector: 'swiper-item',
  template: require('swiper-item.component.html'),
  styles: [require('swiper-item.component.scss')]
})
export class SwiperItemComponent {
  @Input() index: number;

  constructor( @Inject(ElementRef) elementRef: ElementRef, @Host() @Inject(SwiperViewComponent) swiper: SwiperViewComponent
  ) {
    elementRef.nativeElement.classList.add('swiper-slide');

    swiper.update();
  }
}
