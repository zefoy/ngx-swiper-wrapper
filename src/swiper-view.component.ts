declare var require: any;

const Swiper = require('swiper');

import { Attribute, Component, OnInit, DoCheck, ElementRef, Optional, Injectable, Input, Output, EventEmitter, KeyValueDiffers, ViewEncapsulation } from '@angular/core';

import { SwiperConfig, SwiperConfigInterface } from './swiper.interfaces';

@Injectable()
@Component({
  selector: 'swiper-view',
  template: require('swiper-view.component.html'),
  styles: [require('swiper-view.component.scss'), require('swiper/dist/css/swiper.min.css')],
  encapsulation: ViewEncapsulation.None
})
export class SwiperViewComponent implements OnInit, DoCheck {
  public swiper: any;

  public isAtLast: boolean;
  public isAtFirst: boolean;

  private configDiff: any;
  private overlayMode: boolean;

  private swiperConfig: SwiperConfig;

  @Input() config : SwiperConfigInterface;

  @Output() indexChange = new EventEmitter<number>();

  constructor(@Attribute('overlay-controls') overlayMode: boolean, private elementRef: ElementRef, private differs : KeyValueDiffers, @Optional() private defaults: SwiperConfig) {
    this.configDiff = differs.find({}).create(null);

    this.overlayMode = (overlayMode !== null && overlayMode !== false) ? true : false;
  }

  ngOnInit() {
    this.buildSwiper();
  }

  ngDoCheck() {
    let configChanges = this.configDiff.diff(this.config);

    if (configChanges) {
      this.rebuildSwiper();
    }
  }

  update() {
    setTimeout(() => {
      if (this.swiper) {
        this.swiper.update();
      }
    }, 0);
  }

  buildSwiper() {
    const nativeElement = this.elementRef.nativeElement;

    this.swiperConfig = new SwiperConfig(this.defaults);

    this.swiperConfig.assign(this.config);

    if (this.swiperConfig.pagination === true) {
      this.swiperConfig.pagination = '.spiwer-pagination';
    }

    if (!this.swiperConfig['onSlideChangeStart']) {
      this.swiperConfig['onSlideChangeStart'] = (slider) => {
        this.isAtLast = slider.isEnd;
        this.isAtFirst = slider.isBeginning;

        this.indexChange.emit(slider.snapIndex);
      };
    }

    if (!this.swiperConfig['paginationBulletRender']) {
      this.swiperConfig['paginationBulletRender'] = (index, className) => {
        if (index === 0) {
          return '<span class="swiper-pagination-handle" index=' + index + '>' +
            '<span class="' + className + ' ' + className + '-first"></span></span>';
        } else if (index === (this.swiper.slides.length - 1)) {
          return '<span class="swiper-pagination-handle" index=' + index + '>' +
            '<span class="' + className + ' ' + className + '-last"></span></span>';
        } else {
          return '<span class="swiper-pagination-handle" index=' + index + '>' +
            '<span class="' + className + ' ' + className + '-middle"></span></span>';
        }
      };
    }

    this.swiper = new Swiper(nativeElement.children[0].children[0], this.swiperConfig);
  }

  rebuildSwiper() {
    if (this.swiper) {
      this.swiper.destroy(true, true);

      this.buildSwiper();
    }
  }

  getIndex() {
    return this.swiper.activeIndex;
  }

  setIndex(index: number, speed?: number, callbacks?: boolean) {
    this.swiper.slideTo(index, speed, callbacks);
  }

  prevItem(callbacks?: boolean, speed?: number) {
    this.swiper.slidePrev(callbacks, speed);
  }

  nextItem(callbacks?: boolean, speed?: number) {
    this.swiper.slideNext(callbacks, speed);
  }

  stopPlay() {
    this.swiper.stopAutoplay();
  }

  startPlay() {
    this.swiper.startAutoplay();
  }

  lockSwipes() {
    this.swiper.lockSwipes();
  }

  unlockSwipes() {
    this.swiper.unlockSwipes();
  }

  onIndexSelect(event: any) {
    this.setIndex(event.target.attributes.index.value);
  }
}
