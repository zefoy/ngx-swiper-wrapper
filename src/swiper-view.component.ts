const Swiper = require('swiper');

import { Attribute, Component, OnInit, DoCheck, Optional, ElementRef, EventEmitter, HostListener, Inject, Injectable, Input, Output, KeyValueDiffers, ViewEncapsulation } from '@angular/core';

import { SwiperConfig, SwiperConfigInterface } from './swiper.interfaces';

@Injectable()
@Component({
  selector: 'swiper-view',
  template: require('swiper-view.component.html'),
  styles: [require('swiper-view.component.scss'), require('swiper/dist/css/swiper.min.css')],
  encapsulation: ViewEncapsulation.None
})
export class SwiperViewComponent implements OnInit {
  swiper: any;
  options: any = {};

  isAtLast: boolean = false;
  isAtFirst: boolean = true;

  configDiffer: any = false;
  overlayMode: boolean = false;

  @Input() pager: any;

  @Input() config : SwiperConfigInterface;

  @Output() onSwiperIndex = new EventEmitter<number>();

  constructor( @Attribute('overlay-controls') overlayMode: boolean, @Inject(ElementRef) private elementRef: ElementRef, private differs : KeyValueDiffers, @Optional() private defaults: SwiperConfig) {
    this.configDiffer = differs.find({}).create(null);

    this.overlayMode = (overlayMode !== null && overlayMode !== false) ? true : false;
  }

  ngOnInit() {
    this.buildSwiper();
  }

  ngDoCheck() {
    let configChanges = this.configDiffer.diff(this.config);

    if (configChanges) {
      this.rebuildSwiper();
    }
  }

  update() {
    setTimeout(() => {
      if (this.swiper) {
        this.swiper.update();
      }
    });
  }

  buildSwiper() {
    let config = new SwiperConfig(this.defaults);

    config.assign(this.config);

    this.options = {
      direction: config.direction || "horizontal",
      loop: false,
      speed: 600,
      threshold: 50,
      spaceBetween: 5,
      slidesPerView: config.slidesPerView || 1,
      centeredSlides: true,
      slideToClickedSlide: true,
      autoHeight: config.autoHeight || false,
      mousewheelControl: config.mousewheelControl || false,
      pagination: config.pagination==false? false : '.swiper-pagination',

      onSlideChangeStart: (slider) => {
        this.isAtLast = slider.isEnd;
        this.isAtFirst = slider.isBeginning;

        this.onSwiperIndex.emit(slider.snapIndex);
      },

      paginationBulletRender: (index, className) => {
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
      }
    };

    const nativeElement = this.elementRef.nativeElement;

    this.swiper = new Swiper(nativeElement.children[0].children[0], this.options);
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

  onChangeIndex(event: any) {
    this.setIndex(event.target.attributes.index.value);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.config && this.config.arrowKeysEnabled != false) {
      let left = 37, up = 38, right = 39, down = 40;

      if (this.config.direction == 'vertical') {
        if (event.keyCode == down) {
          this.nextItem();
        } else if (event.keyCode == up) {
          this.prevItem();
        }
      } else {
        if (event.keyCode == right) {
          this.nextItem();
        } else if (event.keyCode == left) {
          this.prevItem();
        }
      }
    }
  }
}
