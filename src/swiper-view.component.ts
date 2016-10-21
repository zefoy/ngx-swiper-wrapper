declare var require: any;

const Swiper = require('swiper');

import { Component, OnInit, DoCheck, OnDestroy, OnChanges, SimpleChanges, ElementRef, Optional, Injectable, Input, Output, EventEmitter, KeyValueDiffers, ViewEncapsulation } from '@angular/core';

import { SwiperConfig, SwiperConfigInterface } from './swiper.interfaces';

@Injectable()
@Component({
  selector: 'swiper-view',
  template: require('swiper-view.component.html'),
  styles: [require('swiper-view.component.scss'), require('swiper/dist/css/swiper.min.css')],
  encapsulation: ViewEncapsulation.None
})
export class SwiperViewComponent implements OnInit, DoCheck, OnDestroy, OnChanges {
  public swiper: any;

  public isAtLast: boolean;
  public isAtFirst: boolean;

  private configDiff: any;

  private showButtons: boolean;
  private showScrollbar: boolean;
  private showPagination: boolean;

  @Input() disabled: boolean = false;

  @Input() config : SwiperConfigInterface;

  @Output() indexChange = new EventEmitter<number>();

  constructor(private elementRef: ElementRef, private differs : KeyValueDiffers, @Optional() private defaults: SwiperConfig) {}

  ngOnInit() {
    this.showButtons = false;
    this.showScrollbar = false;
    this.showPagination = false;

    let element = this.elementRef.nativeElement;

    let options = new SwiperConfig(this.defaults);

    options.assign(this.config); // Custom config

    if (options.scrollbar === true) {
      this.showScrollbar = true;

      options.scrollbar = element.querySelector('.swiper-scrollbar');
    }

    if (options.pagination === true) {
      this.showPagination = true;

      options.pagination = element.querySelector('.swiper-pagination');
    }

    if (options.prevButton === true) {
      this.showButtons = true;

      options.prevButton = element.querySelector('.swiper-button-prev');
    }

    if (options.nextButton === true) {
      this.showButtons = true;

      options.nextButton = element.querySelector('.swiper-button-next');
    }

    if (!options['onSlideChangeStart']) {
      options['onSlideChangeStart'] = (swiper) => {
        this.isAtLast = swiper.isEnd;
        this.isAtFirst = swiper.isBeginning;

        this.indexChange.emit(swiper.snapIndex);
      };
    }

    if (!options['onScrollbarDragEnd']) {
      options['onScrollbarDragEnd'] = (swiper) => {
        this.isAtLast = swiper.isEnd;
        this.isAtFirst = swiper.isBeginning;

        this.indexChange.emit(swiper.snapIndex);
      };
    }

    if (!options['paginationBulletRender']) {
      options['paginationBulletRender'] = (index, className) => {
        if (this.swiper) {
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
    }

    this.swiper = new Swiper(element.children[0].children[0], options);

    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create(null);
    }
  }

  ngDoCheck() {
    let changes = this.configDiff.diff(this.config);

    if (changes) {
      this.ngOnDestroy();

      setTimeout(() => {
        this.ngOnInit();

        this.update();
      }, 0);
    }
  }

  ngOnDestroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);

      this.swiper = null;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.swiper && changes['disabled']) {
      if (changes['disabled'].currentValue != changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === true) {
          this.swiper.lockSwipes();
        } else if (changes['disabled'].currentValue === false) {
          this.swiper.unlockSwipes();
        }
      }
    }
  }

  update() {
    setTimeout(() => {
      if (this.swiper) {
        this.swiper.update();

        this.isAtLast = this.swiper.isEnd;
        this.isAtFirst = this.swiper.isBeginning;
      }
    }, 0);
  }

  getIndex() {
    if (!this.swiper) {
      return -1;
    } else {
      return this.swiper.activeIndex;
    }
  }

  setIndex(index: number, speed?: number, callbacks?: boolean) {
    if (this.swiper) {
      this.swiper.slideTo(index, speed, callbacks);
    }
  }

  prevItem(callbacks?: boolean, speed?: number) {
    if (this.swiper) {
      this.swiper.slidePrev(callbacks, speed);
    }
  }

  nextItem(callbacks?: boolean, speed?: number) {
    if (this.swiper) {
      this.swiper.slideNext(callbacks, speed);
    }
  }

  stopPlay() {
    if (this.swiper) {
      this.swiper.stopAutoplay();
    }
  }

  startPlay() {
    if (this.swiper) {
      this.swiper.startAutoplay();
    }
  }

  onIndexSelect(event: any) {
    this.setIndex(event.target.attributes.index.value);
  }
}
