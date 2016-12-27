import * as Swiper from 'swiper';

import { NgZone, SimpleChanges, KeyValueDiffers } from '@angular/core';
import { Component, Optional, OnInit, DoCheck, OnDestroy, OnChanges } from '@angular/core';
import { Input, Output, ViewChild, HostBinding, EventEmitter, ElementRef, ViewEncapsulation } from '@angular/core';

import { SwiperConfig, SwiperConfigInterface, SwiperEvents } from './swiper.interfaces';

@Component({
  selector: 'swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css', '../../node_modules/swiper/dist/css/swiper.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements OnInit, DoCheck, OnDestroy, OnChanges {
  public swiper: any;

  public isAtLast: boolean;
  public isAtFirst: boolean;

  private configDiff: any;
  private childsDiff: number;

  private initialIdx: number;

  private showButtons: boolean;
  private showScrollbar: boolean;
  private showPagination: boolean;

  @Input() disabled: boolean = false;

  @Input() config: SwiperConfigInterface;

  @Input() runInsideAngular: boolean = false;

  @Output() indexChange = new EventEmitter<number>();

  @Output('init'              ) s_init                = new EventEmitter<any>();
  @Output('slideChangeStart'  ) s_slideChangeStart    = new EventEmitter<any>();
  @Output('slideChangeEnd'    ) s_slideChangeEnd      = new EventEmitter<any>();
  @Output('slideNextStart'    ) s_slideNextStart      = new EventEmitter<any>();
  @Output('slideNextEnd'      ) s_slideNextEnd        = new EventEmitter<any>();
  @Output('slidePrevStart'    ) s_slidePrevStart      = new EventEmitter<any>();
  @Output('slidePrevEnd'      ) s_slidePrevEnd        = new EventEmitter<any>();
  @Output('transitionStart'   ) s_transitionStart     = new EventEmitter<any>();
  @Output('transitionEnd'     ) s_transitionEnd       = new EventEmitter<any>();
  @Output('touchStart'        ) s_touchStart          = new EventEmitter<any>();
  @Output('touchMove'         ) s_touchMove           = new EventEmitter<any>();
  @Output('touchMoveOpposite' ) s_touchMoveOpposite   = new EventEmitter<any>();
  @Output('sliderMove'        ) s_sliderMove          = new EventEmitter<any>();
  @Output('touchEnd'          ) s_touchEnd            = new EventEmitter<any>();
  @Output('click'             ) s_click               = new EventEmitter<any>();
  @Output('tap'               ) s_tap                 = new EventEmitter<any>();
  @Output('doubleTap'         ) s_doubleTap           = new EventEmitter<any>();
  @Output('imagesReady'       ) s_imagesReady         = new EventEmitter<any>();
  @Output('progress'          ) s_progress            = new EventEmitter<any>();
  @Output('reachBeginning'    ) s_reachBeginning      = new EventEmitter<any>();
  @Output('reachEnd'          ) s_reachEnd            = new EventEmitter<any>();
  @Output('destroy'           ) s_destroy             = new EventEmitter<any>();
  @Output('setTranslate'      ) s_setTranslate        = new EventEmitter<any>();
  @Output('setTransition'     ) s_setTransition       = new EventEmitter<any>();
  @Output('autoplay'          ) s_autoplay            = new EventEmitter<any>();
  @Output('autoplayStart'     ) s_autoplayStart       = new EventEmitter<any>();
  @Output('autoplayStop'      ) s_autoplayStop        = new EventEmitter<any>();
  @Output('lazyImageLoad'     ) s_lazyImageLoad       = new EventEmitter<any>();
  @Output('lazyImageReady'    ) s_lazyImageReady      = new EventEmitter<any>();
  @Output('paginationRendered') s_paginationRendered  = new EventEmitter<any>();
  @Output('scroll'            ) s_scroll              = new EventEmitter<any>();

  @ViewChild('swiperWrapper') swiperWrapper: ElementRef = null;

  @HostBinding('class.swiper') @Input() useSwiperClass: boolean = true;

  constructor(private zone: NgZone, private elementRef: ElementRef, private differs: KeyValueDiffers,
    @Optional() private defaults: SwiperConfig) {}

  ngOnInit() {
    this.showButtons = false;
    this.showScrollbar = false;
    this.showPagination = false;

    let element = this.elementRef.nativeElement;

    let options = new SwiperConfig(this.defaults);

    options.assign(this.config); // Custom config

    if (this.initialIdx != null) {
      options.initialSlide = this.initialIdx;
    }

    if (options.scrollbar === true || options.scrollbar === '.swiper-scrollbar') {
      this.showScrollbar = true;
      options.scrollbar = element.querySelector('.swiper-scrollbar');
    }

    if (options.pagination === true || options.pagination === '.swiper-pagination') {
      this.showPagination = true;

      options.pagination = element.querySelector('.swiper-pagination');
    }

    if (options.prevButton === true || options.prevButton === '.swiper-button-prev') {
      this.showButtons = true;

      options.prevButton = element.querySelector('.swiper-button-prev');
    }
    if (options.nextButton === true || options.nextButton === '.swiper-button-next') {
      this.showButtons = true;

      options.nextButton = element.querySelector('.swiper-button-next');
    }

    if (!options['onSlideChangeStart']) {
      options['onSlideChangeStart'] = (swiper) => {
        this.zone.run(() => {
          this.isAtLast = swiper.isEnd;
          this.isAtFirst = swiper.isBeginning;

          this.indexChange.emit(swiper.snapIndex);
        });
      };
    }

    if (!options['onScrollbarDragEnd']) {
      options['onScrollbarDragEnd'] = (swiper) => {
        this.zone.run(() => {
          this.isAtLast = swiper.isEnd;
          this.isAtFirst = swiper.isBeginning;

          this.indexChange.emit(swiper.snapIndex);
        });
      };
    }

    if (!options['paginationBulletRender']) {
      options['paginationBulletRender'] = (swiper, index, className) => {
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

    if (this.runInsideAngular) {
      this.swiper = new Swiper(element.children[0], options);
    } else {
      this.zone.runOutsideAngular(() => {
        this.swiper = new Swiper(element.children[0], options);
      });
    }

    // Add native swiper event handling
    SwiperEvents.forEach((eventName) => {
      let self = this;

      this.swiper.on(eventName, function(event) {
        self[`s_${eventName}`].emit(event);
      });
    });

    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create(null);
    }
  }

  ngDoCheck() {
    let changes = this.configDiff.diff(this.config || {});

    let children = this.swiperWrapper.nativeElement.children.length;

    if (changes) {
      this.initialIdx = this.getIndex();

      changes.forEachAddedItem((changed) => {
        if (changed.key === 'initialSlide') {
          this.initialIdx = this.config.initialSlide;
        }
      });

      this.ngOnDestroy();

      // Timeout is needed for the styles to update properly
      setTimeout(() => {
        this.ngOnInit();

        this.update();
      }, 0);
    } else if (children !== this.childsDiff) {
      this.childsDiff = children;

      this.update();
    }
  }

  ngOnDestroy() {
    if (this.swiper) {
      if (this.runInsideAngular) {
        this.swiper.destroy(true, true);
      } else {
        this.zone.runOutsideAngular(() => {
          this.swiper.destroy(true, true);
        });
      }

      this.swiper = null;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.swiper && changes['disabled']) {
      if (changes['disabled'].currentValue != changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === true) {
          if (this.runInsideAngular) {
            this.swiper.lockSwipes();
          } else {
            this.zone.runOutsideAngular(() => {
              this.swiper.lockSwipes();
            });
          }
        } else if (changes['disabled'].currentValue === false) {
          if (this.runInsideAngular) {
            this.swiper.unlockSwipes();
          } else {
            this.zone.runOutsideAngular(() => {
              this.swiper.unlockSwipes();
            });
          }
        }
      }
    }

    this.update();
  }

  update() {
    if (this.swiperWrapper) {
      for (let i = 0; i < this.swiperWrapper.nativeElement.children.length; i++) {
        this.swiperWrapper.nativeElement.children[i].classList.add('swiper-slide');
      }
    }

    setTimeout(() => {
      if (this.swiper) {
        if (this.runInsideAngular) {
          this.swiper.update();
        } else {
          this.zone.runOutsideAngular(() => {
            this.swiper.update();
          });
        }

        this.isAtFirst = this.swiper.isBeginning;
        this.isAtLast = this.swiper.isEnd;
      }
    }, 0);
  }

  getIndex() {
    if (!this.swiper) {
      return this.initialIdx;
    } else {
      return this.swiper.activeIndex;
    }
  }

  setIndex(index: number, speed?: number, callbacks?: boolean) {
    if (!this.swiper) {
      this.initialIdx = index;
    } else {
      if (this.runInsideAngular) {
        this.swiper.slideTo(index, speed, callbacks);
      } else {
        this.zone.runOutsideAngular(() => {
          this.swiper.slideTo(index, speed, callbacks);
        });
      }
    }
  }

  prevSlide(callbacks?: boolean, speed?: number) {
    if (this.swiper) {
      if (this.runInsideAngular) {
        this.swiper.slidePrev(callbacks, speed);
      } else {
        this.zone.runOutsideAngular(() => {
          this.swiper.slidePrev(callbacks, speed);
        });
      }
    }
  }

  nextSlide(callbacks?: boolean, speed?: number) {
    if (this.swiper) {
      if (this.runInsideAngular) {
        this.swiper.slideNext(callbacks, speed);
      } else {
        this.zone.runOutsideAngular(() => {
          this.swiper.slideNext(callbacks, speed);
        });
      }
    }
  }

  stopPlay() {
    if (this.swiper) {
      if (this.runInsideAngular) {
        this.swiper.stopAutoplay();
      } else {
        this.zone.runOutsideAngular(() => {
          this.swiper.stopAutoplay();
        });
      }
    }
  }

  startPlay() {
    if (this.swiper) {
      if (this.runInsideAngular) {
        this.swiper.startAutoplay();
      } else {
        this.zone.runOutsideAngular(() => {
          this.swiper.startAutoplay();
        });
      }
    }
  }

  onIndexSelect(event: any) {
    this.setIndex(event.target.attributes.index.value);
  }
}
