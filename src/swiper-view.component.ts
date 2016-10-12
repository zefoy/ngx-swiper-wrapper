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
    let config = new SwiperConfig(this.defaults);

    config.assign(this.config);

    if (config.pagination === true) {
      config.pagination = '.spiwer-pagination';
    }

    if (!config['onSlideChangeStart']) {
      config['onSlideChangeStart'] = (slider) => {
        this.isAtLast = slider.isEnd;
        this.isAtFirst = slider.isBeginning;

        this.indexChange.emit(slider.snapIndex);
      };
    }

    if (!config['paginationBulletRender']) {
      config['paginationBulletRender'] = (index, className) => {
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

    const nativeElement = this.elementRef.nativeElement;

    this.swiper = new Swiper(nativeElement.children[0].children[0], config);
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

  setIndex(index: number) {
    this.swiper.slideTo(index);
  }

  prevItem() {
    this.swiper.slidePrev();
  }

  nextItem() {
    this.swiper.slideNext();
  }

  stopPlay() {
    this.swiper.stopAutoplay();
  }

  startPlay() {
    this.swiper.startAutoplay();
  }

  lockSwiper() {
    this.swiper.lockSwipes();
  }

  unlockSwiper() {
    this.swiper.unlockSwipes();
  }

  onIndexSelect(event: any) {
    this.setIndex(event.target.attributes.index.value);
  }
}
