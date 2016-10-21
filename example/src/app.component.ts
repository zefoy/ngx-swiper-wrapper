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

  private items = ["First slide", "Second slide", "Third slide", "Fourth slide", "Fifth slide", "Sixth slide"];

  private config: SwiperConfigInterface = {
    scrollbar: false,
    direction: 'horizontal',
    pagination: true,
    prevButton: true,
    nextButton: true,
    slidesPerView: 1,
    scrollbarHide: false,
    keyboardControl: true,
    mousewheelControl: true,
    scrollbarDraggable: true,
    scrollbarSnapOnRelease: true,
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

  toggleAutoHeight(): boolean {
    this.config.autoHeight = !this.config.autoHeight;

    return false;
  }

  toggleOverlayControls(): boolean {
    if (this.config.pagination) {
      this.config.scrollbar = true;
      this.config.pagination = false;
      this.config.nextButton = false;
      this.config.prevButton = false;
    } else if (this.config.scrollbar) {
      this.config.scrollbar = false;
    } else {
      this.config.pagination = true;
      this.config.nextButton = true;
      this.config.prevButton = true;
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
}
