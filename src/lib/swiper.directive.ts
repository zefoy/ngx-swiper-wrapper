import * as Swiper from 'swiper';

import { NgZone, SimpleChanges, KeyValueDiffers } from '@angular/core';
import { Directive, Optional, OnInit, DoCheck, OnDestroy, OnChanges } from '@angular/core';
import { Input, HostBinding, Output, EventEmitter, ElementRef } from '@angular/core';

import { SwiperConfig, SwiperConfigInterface, SwiperEvents } from './swiper.interfaces';

@Directive({
  selector: '[swiper]'
})
export class SwiperDirective implements OnInit, DoCheck, OnDestroy, OnChanges {
  public swiper: any;

  private configDiff: any;

  private initialIndex: number;

  @Input()
  set index(index: number) {
    if (index != null) {
      this.setIndex(index);
    }
  }

  @Input() fxShow: boolean = true;
  @Input() fxHide: boolean = false;

  @Input() hidden: boolean = false;

  @Input() disabled: boolean = false;

  @HostBinding('class.swiper')
  @Input() useSwiperClass: boolean = true;

  @Input() runInsideAngular: boolean = false;

  @Input('swiper') config: SwiperConfigInterface;

  @Output() indexChange = new EventEmitter<number>();

  @Output('init'                   ) S_INIT                = new EventEmitter<any>();
  @Output('destroy'                ) S_DESTROY             = new EventEmitter<any>();

  @Output('scroll'                 ) S_SCROLL              = new EventEmitter<any>();
  @Output('progress'               ) S_PROGRESS            = new EventEmitter<any>();

  @Output('setTranslate'           ) S_SETTRANSLATE        = new EventEmitter<any>();
  @Output('setTransition'          ) S_SETTRANSITION       = new EventEmitter<any>();

  @Output('autoplay'               ) S_AUTOPLAY            = new EventEmitter<any>();
  @Output('autoplayStart'          ) S_AUTOPLAYSTART       = new EventEmitter<any>();
  @Output('autoplayStop'           ) S_AUTOPLAYSTOP        = new EventEmitter<any>();

  @Output('reachBeginning'         ) S_REACHBEGINNING      = new EventEmitter<any>();
  @Output('reachEnd'               ) S_REACHEND            = new EventEmitter<any>();

  @Output('slideChangeStart'       ) S_SLIDECHANGESTART    = new EventEmitter<any>();
  @Output('slideChangeEnd'         ) S_SLIDECHANGEEND      = new EventEmitter<any>();
  @Output('slideNextStart'         ) S_SLIDENEXTSTART      = new EventEmitter<any>();
  @Output('slideNextEnd'           ) S_SLIDENEXTEND        = new EventEmitter<any>();
  @Output('slidePrevStart'         ) S_SLIDEPREVSTART      = new EventEmitter<any>();
  @Output('slidePrevEnd'           ) S_SLIDEPREVEND        = new EventEmitter<any>();

  @Output('sliderMove'             ) S_SLIDERMOVE          = new EventEmitter<any>();

  @Output('swiperClick'            ) S_CLICK               = new EventEmitter<any>();
  @Output('swiperTap'              ) S_TAP                 = new EventEmitter<any>();
  @Output('swiperDoubleTap'        ) S_DOUBLETAP           = new EventEmitter<any>();
  @Output('swiperTouchStart'       ) S_TOUCHSTART          = new EventEmitter<any>();
  @Output('swiperTouchMove'        ) S_TOUCHMOVE           = new EventEmitter<any>();
  @Output('swiperTouchMoveOpposite') S_TOUCHMOVEOPPOSITE   = new EventEmitter<any>();
  @Output('swiperTouchEnd'         ) S_TOUCHEND            = new EventEmitter<any>();
  @Output('swiperTransitionStart'  ) S_TRANSITIONSTART     = new EventEmitter<any>();
  @Output('swiperTransitionEnd'    ) S_TRANSITIONEND       = new EventEmitter<any>();

  @Output('imagesReady'            ) S_IMAGESREADY         = new EventEmitter<any>();

  @Output('lazyImageLoad'          ) S_LAZYIMAGELOAD       = new EventEmitter<any>();
  @Output('lazyImageReady'         ) S_LAZYIMAGEREADY      = new EventEmitter<any>();

  @Output('paginationRendered'     ) S_PAGINATIONRENDERED  = new EventEmitter<any>();

  constructor(private zone: NgZone, private elementRef: ElementRef, private differs: KeyValueDiffers,
    @Optional() private defaults: SwiperConfig) {}

  ngOnInit() {
    const element = this.elementRef.nativeElement;

    const options = new SwiperConfig(this.defaults);

    options.assign(this.config); // Custom config

    if (this.initialIndex != null) {
      options.initialSlide = this.initialIndex;
    }

    const onSlideChangeStart = options.onSlideChangeStart;
    const onScrollbarDragEnd = options.onScrollbarDragEnd;

    options.onSlideChangeStart = (swiper) => {
      if (onSlideChangeStart) {
        onSlideChangeStart(swiper);
      }

      this.zone.run(() => {
        this.indexChange.emit(swiper.snapIndex);
      });
    };

    options.onScrollbarDragEnd = (swiper) => {
      if (onScrollbarDragEnd) {
        onScrollbarDragEnd(swiper);
      }

      this.zone.run(() => {
        this.indexChange.emit(swiper.snapIndex);
      });
    };


    if (typeof options.scrollbar === 'string') {
      options.scrollbar = element.querySelector(options.scrollbar);
    }

    if (typeof options.pagination === 'string') {
      options.pagination = element.querySelector(options.pagination);
    }

    if (typeof options.prevButton === 'string') {
      options.prevButton = element.querySelector(options.prevButton);
    }

    if (typeof options.nextButton === 'string') {
      options.nextButton = element.querySelector(options.nextButton);
    }

    if (this.runInsideAngular) {
      this.swiper = new Swiper(element, options);
    } else {
      this.zone.runOutsideAngular(() => {
        this.swiper = new Swiper(element, options);
      });
    }

    this.S_INIT.emit(this.swiper);

    // Add native swiper event handling
    SwiperEvents.forEach((eventName) => {
      eventName = eventName.replace('swiper', '');

      eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);

      this.swiper.on(eventName, (...args) => {
        if (args.length === 1) {
          args = args[0];
        }

        if (this[`S_${eventName.toUpperCase()}`]) {
          this[`S_${eventName.toUpperCase()}`].emit(args);
        }
      });
    });

    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create(null);
    }
  }

  ngDoCheck() {
    const changes = this.configDiff.diff(this.config || {});

    if (changes) {
      this.initialIndex = this.getIndex();

      changes.forEachAddedItem((changed) => {
        if (changed.key === 'initialSlide') {
          this.initialIndex = this.config.initialSlide;
        }
      });

      this.ngOnDestroy();

      // Timeout is needed for the styles to update properly
      setTimeout(() => {
        this.ngOnInit();
      }, 0);
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
    if (this.swiper && ((changes['hidden'] && this.hidden) ||
      (changes['fxHide'] && this.fxHide) || (changes['fxShow'] && !this.fxShow)))
    {
      // For some reason resize causes Swiper to change index when hidden
      this.initialIndex = this.swiper.activeIndex || 0;
    }

    if (this.swiper && ((changes['hidden'] && !this.hidden) ||
      (changes['fxHide'] && !this.fxHide) || (changes['fxShow'] && this.fxShow)))
    {
      // For some reason resize causes Swiper to change index when hidden
      this.swiper.activeIndex = this.initialIndex || 0;

      this.update(true);
    }

    if (this.swiper && changes['disabled']) {
      if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
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
  }

  update(updateTranslate?: boolean) {
    setTimeout(() => {
      if (this.swiper) {
        if (this.runInsideAngular) {
          this.swiper.update();

          if (updateTranslate) {
            setTimeout(() => {
              if (this.swiper) {
                this.swiper.update(true);
              }
            }, 0);
          }
        } else {
          this.zone.runOutsideAngular(() => {
            this.swiper.update();

            if (updateTranslate) {
              setTimeout(() => {
                if (this.swiper) {
                  this.swiper.update(true);
                }
              }, 0);
            }
          });
        }
      }
    }, 0);
  }

  getIndex() {
    if (!this.swiper) {
      return this.initialIndex;
    } else {
      let index = this.swiper.activeIndex;

      if (this.swiper.params.loop) {
        const slidesCount = this.swiper.slides.length - 2 * this.swiper.loopedSlides;

        index -= this.swiper.loopedSlides;

        if (index < 0) {
          index += slidesCount;
        } else if (index >= slidesCount) {
          index -= slidesCount;
        }
      }

      return index;
    }
  }

  setIndex(index: number, speed?: number, silent?: boolean) {
    if (!this.swiper || this.hidden || this.fxHide || !this.fxShow) {
      this.initialIndex = index;
    } else {
      let realIndex = index * this.swiper.params.slidesPerGroup;

      if (this.swiper.params.loop) {
        realIndex += this.swiper.loopedSlides;
      }

      if (this.runInsideAngular) {
        this.swiper.slideTo(index, speed, !silent);
      } else {
        this.zone.runOutsideAngular(() => {
          this.swiper.slideTo(index, speed, !silent);
        });
      }
    }
  }

  prevSlide(speed?: number, silent?: boolean) {
    if (this.swiper) {
      if (this.runInsideAngular) {
        this.swiper.slidePrev(!silent, speed);
      } else {
        this.zone.runOutsideAngular(() => {
          this.swiper.slidePrev(!silent, speed);
        });
      }
    }
  }

  nextSlide(speed?: number, silent?: boolean) {
    if (this.swiper) {
      if (this.runInsideAngular) {
        this.swiper.slideNext(!silent, speed);
      } else {
        this.zone.runOutsideAngular(() => {
          this.swiper.slideNext(!silent, speed);
        });
      }
    }
  }

  stopAutoplay(reset?: boolean) {
    if (reset) {
      this.setIndex(0);
    }

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

  startAutoplay(reset?: boolean) {
    if (reset) {
      this.setIndex(0);
    }

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
}
