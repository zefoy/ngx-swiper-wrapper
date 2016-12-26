import { Component, ViewChild } from '@angular/core';

import { SwiperViewComponent, SwiperConfigInterface } from 'angular2-swiper-wrapper';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private title = 'Simple example app for the angular2-swiper-wrapper';

  @ViewChild(SwiperViewComponent) swiperView: SwiperViewComponent;

  exampleType: string = 'component';

  private items = ["First slide", "Second slide", "Third slide", "Fourth slide", "Fifth slide", "Sixth slide"];

  private config: SwiperConfigInterface = {
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

  increasePerView(): boolean {
    if (this.config.slidesPerView < this.items.length) {
      this.config.slidesPerView = +this.config.slidesPerView + 1;
    }

    return false;
  }

  decreasePerView(): boolean {
    if (this.config.slidesPerView > 1) {
      this.config.slidesPerView = +this.config.slidesPerView - 1;
    }

    return false;
  }

  toggleDirection(): boolean {
    this.config.direction = (this.config.direction == "horizontal") ? "vertical" : "horizontal";

    return false;
  }

  toggleExampleType() {
    this.exampleType = this.exampleType == 'component' ? 'directive' : 'component';
  }

  toggleAutoHeight(): boolean {
    this.config.autoHeight = !this.config.autoHeight;

    return false;
  }

  toggleOverlayControls(): boolean {
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
    return false;
  }

  toggleKeyboardControl(): boolean {
    this.config.keyboardControl = !this.config.keyboardControl;

    return false;
  }

  toggleMousewheelControl(): boolean {
    this.config.mousewheelControl = !this.config.mousewheelControl;

    return false;
  }

  onIndexChange(index: number) {
    console.log("Swiper index: " + index);
  }

  onReachEnd() {
    console.log("Swiper reached the end!");
  }
}
