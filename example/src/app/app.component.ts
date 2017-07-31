import { Component, ViewChild } from '@angular/core';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  moduleId: module.id + '',
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  public show: boolean = true;

  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];

  public type: string = 'component';

  public config: SwiperConfigInterface = {
    scrollbar: null,
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbarHide: false,
    keyboardControl: true,
    mousewheelControl: true,
    scrollbarDraggable: true,
    scrollbarSnapOnRelease: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'
  };

  @ViewChild(SwiperComponent) componentRef: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  constructor() {}

  toggleType() {
    this.type = this.type == 'component' ? 'directive' : 'component';
  }

  toggleDirection() {
    this.show = false;

    setTimeout(() => {
      this.config.direction = (this.config.direction == 'horizontal') ? 'vertical' : 'horizontal';

      this.show = true;
    }, 0);
  }

  toggleSlidesPerView() {
    this.show = false;

    setTimeout(() => {
      if (this.config.slidesPerView != 1) {
        this.config.slidesPerView = 1;
      } else {
        this.config.slidesPerView = +this.config.slidesPerView + 1;
      }

      this.show = true;
    }, 0);
  }

  toggleOverlayControls() {
    this.show = false;

    setTimeout(() => {
      if (this.config.pagination) {
        this.config.scrollbar = '.swiper-scrollbar';
        this.config.pagination = null;
        this.config.nextButton = null;
        this.config.prevButton = null;
      } else if (this.config.scrollbar) {
        this.config.scrollbar = null;
      } else {
        this.config.pagination = '.swiper-pagination';
        this.config.nextButton = '.swiper-button-next';
        this.config.prevButton = '.swiper-button-prev';
      }

      this.show = true;
    }, 0);
  }

  toggleKeyboardControl() {
    this.show = false;

    setTimeout(() => {
      this.config.keyboardControl = !this.config.keyboardControl;

      this.show = true;
    }, 0);
  }

  toggleMouseWheelControl() {
    this.show = false;

    setTimeout(() => {
      this.config.mousewheelControl = !this.config.mousewheelControl;

      this.show = true;
    }, 0);
  }

  onIndexChange(index: number) {
    console.log('Swiper index: ' + index);
  }
}
