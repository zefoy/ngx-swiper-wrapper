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
    pagination: true
  };

  refresh(): boolean {
    this.swiperView.rebuildSwiper();

    return false;
  }

  increasePerView(): boolean {
    if (this.config.slidesPerView < 6)
      this.config.slidesPerView++;

    return false;
  }

  decreasePerView(): boolean {
    if (this.config.slidesPerView > 1)
      this.config.slidesPerView--;

    return false;
  }

  toggleDirection(): boolean {
    this.config.direction = (this.config.direction == "horizontal") ? "vertical" : "horizontal";

    return false;
  }

  togglePagination(): boolean {
    this.config.pagination = !this.config.pagination;

    return false;
  }

  toggleAutoHeight(): boolean {
    this.config.autoHeight = !this.config.autoHeight;

    return false;
  }

  toggleArrowKeysEnabled(): boolean {
    this.config.arrowKeysEnabled = !this.config.arrowKeysEnabled;

    return false;
  }

  toggleMousewheelControl(): boolean {
    this.config.mousewheelControl = !this.config.mousewheelControl;

    return false;
  }

  onSwiperIndex(index: number) {
    console.log("Swiper index: " + index);
  }
}
