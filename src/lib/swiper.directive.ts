import Swiper from 'swiper';

import { NgZone, SimpleChanges, KeyValueDiffers,
  Directive, Optional, Inject, OnInit, DoCheck, OnDestroy, OnChanges,
  Input, HostBinding, Output, EventEmitter, ElementRef } from '@angular/core';

import { SWIPER_CONFIG } from './swiper.interfaces';

import { SwiperConfig, SwiperConfigInterface, SwiperEvents } from './swiper.interfaces';

@Directive({
  selector: '[swiper]',
  exportAs: 'ngxSwiper'
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

  @Input('swiper') config: SwiperConfigInterface;

  @Output() indexChange = new EventEmitter<number>();

  @Output('init'                       ) S_INIT                           = new EventEmitter<any>();
  @Output('beforeDestroy'              ) S_BEFOREDESTROY                  = new EventEmitter<any>();

  @Output('scroll'                     ) S_SCROLL                         = new EventEmitter<any>();
  @Output('resize'                     ) S_RESIZE                         = new EventEmitter<any>();
  @Output('progress'                   ) S_PROGRESS                       = new EventEmitter<any>();

  @Output('keyPress'                   ) S_KEYPRESS                       = new EventEmitter<any>();
  @Output('sliderMove'                 ) S_SLIDERMOVE                     = new EventEmitter<any>();
  @Output('slideChange'                ) S_SLIDECHANGE                    = new EventEmitter<any>();

  @Output('setTranslate'               ) S_SETTRANSLATE                   = new EventEmitter<any>();
  @Output('setTransition'              ) S_SETTRANSITION                  = new EventEmitter<any>();

  @Output('fromEdge'                   ) S_FROMEDGE                       = new EventEmitter<any>();
  @Output('reachEnd'                   ) S_REACHEND                       = new EventEmitter<any>();
  @Output('reachBeginning'             ) S_REACHBEGINNING                 = new EventEmitter<any>();

  @Output('autoplay'                   ) S_AUTOPLAY                       = new EventEmitter<any>();
  @Output('autoplayStart'              ) S_AUTOPLAYSTART                  = new EventEmitter<any>();
  @Output('autoplayStop'               ) S_AUTOPLAYSTOP                   = new EventEmitter<any>();

  @Output('imagesReady'                ) S_IMAGESREADY                    = new EventEmitter<any>();
  @Output('lazyImageLoad'              ) S_LAZYIMAGELOAD                  = new EventEmitter<any>();
  @Output('lazyImageReady'             ) S_LAZYIMAGEREADY                 = new EventEmitter<any>();

  @Output('scrollDragEnd'              ) S_SCROLLDRAGEND                  = new EventEmitter<any>();
  @Output('scrollDragMove'             ) S_SCROLLDRAGMOVE                 = new EventEmitter<any>();
  @Output('scrollDragStart'            ) S_SCROLLDRAGSTART                = new EventEmitter<any>();

  @Output('swiperTap'                  ) S_TAP                            = new EventEmitter<any>();
  @Output('swiperClick'                ) S_CLICK                          = new EventEmitter<any>();
  @Output('swiperDoubleTap'            ) S_DOUBLETAP                      = new EventEmitter<any>();
  @Output('swiperTouchEnd'             ) S_TOUCHEND                       = new EventEmitter<any>();
  @Output('swiperTouchMove'            ) S_TOUCHMOVE                      = new EventEmitter<any>();
  @Output('swiperTouchStart'           ) S_TOUCHSTART                     = new EventEmitter<any>();
  @Output('swiperTouchMoveOpposite'    ) S_TOUCHMOVEOPPOSITE              = new EventEmitter<any>();
  @Output('swiperTransitionEnd'        ) S_TRANSITIONEND                  = new EventEmitter<any>();
  @Output('swiperTransitionStart'      ) S_TRANSITIONSTART                = new EventEmitter<any>();

  @Output('slidePrevTransitionEnd'     ) S_SLIDEPREVTRANSITIONEND         = new EventEmitter<any>();
  @Output('slidePrevTransitionStart'   ) S_SLIDEPREVTRANSITIONSTART       = new EventEmitter<any>();
  @Output('slideNextTransitionEnd'     ) S_SLIDENEXTTRANSITIONEND         = new EventEmitter<any>();
  @Output('slideNextTransitionStart'   ) S_SLIDENEXTTRANSITIONSTART       = new EventEmitter<any>();
  @Output('slideChangeTransitionEnd'   ) S_SLIDECHANGETRANSITIONEND       = new EventEmitter<any>();
  @Output('slideChangeTransitionStart' ) S_SLIDECHANGETRANSITIONSTART     = new EventEmitter<any>();

  constructor(private zone: NgZone, private elementRef: ElementRef, private differs: KeyValueDiffers,
    @Optional() @Inject(SWIPER_CONFIG) private defaults: SwiperConfig) {}

  ngOnInit() {
    const options = new SwiperConfig(this.defaults);

    Object.assign(options, this.config); // Custom config

    if (options.scrollbar === true) {
      options.scrollbar = {
        el: '.swiper-scrollbar'
      };
    }

    if (options.pagination === true) {
      options.pagination = {
        el: '.swiper-pagination'
      };
    }

    if (options.navigation === true) {
      options.navigation = {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      };
    }

    if (this.initialIndex != null) {
      options.initialSlide = this.initialIndex;

      this.initialIndex = null;
    }

    options['on'] = {
      slideChange: (swiper) => {
        this.zone.run(() => {
          this.indexChange.emit(this.swiper.realIndex);
        });
      }
    };

    this.zone.runOutsideAngular(() => {
      this.swiper = new Swiper(this.elementRef.nativeElement, options);
    });

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
          this.zone.run(() => {
            this[`S_${eventName.toUpperCase()}`].emit(args);
          });
        }
      });
    });

    if (!this.configDiff) {
      this.configDiff = this.differs.find(this.config || {}).create();
    }
  }

  ngDoCheck() {
    if (this.configDiff) {
      const changes = this.configDiff.diff(this.config || {});

      if (changes) {
        this.initialIndex = this.getIndex(true);

        this.ngOnDestroy();

        // Timeout is needed for the styles to update properly
        setTimeout(() => {
          this.ngOnInit();
        }, 0);
      }
    }
  }

  ngOnDestroy() {
    if (this.swiper) {
      this.zone.runOutsideAngular(() => {
        this.swiper.destroy(true, true);
      });

      this.swiper = null;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.swiper && ((changes['hidden'] && !this.hidden) ||
      (changes['fxHide'] && !this.fxHide) || (changes['fxShow'] && this.fxShow)))
    {
      this.update();
    }

    if (this.swiper && changes['disabled']) {
      if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === true) {
          this.zone.runOutsideAngular(() => {
            this.swiper.lockSwipes();
          });
        } else if (changes['disabled'].currentValue === false) {
          this.zone.runOutsideAngular(() => {
            this.swiper.unlockSwipes();
          });
        }
      }
    }
  }

  public update() {
    setTimeout(() => {
      if (this.swiper) {
        this.zone.runOutsideAngular(() => {
          this.swiper.update();
        });
      }
    }, 0);
  }

  public getIndex(real?: boolean) {
    if (!this.swiper) {
      return this.initialIndex;
    } else {
      return real ? this.swiper.realIndex : this.swiper.activeIndex;
    }
  }

  public setIndex(index: number, speed?: number, silent?: boolean) {
    if (!this.swiper || this.hidden || this.fxHide || !this.fxShow) {
      this.initialIndex = index;
    } else {
      let realIndex = index * this.swiper.params.slidesPerGroup;

      if (this.swiper.params.loop) {
        realIndex += this.swiper.loopedSlides;
      }

      this.zone.runOutsideAngular(() => {
        this.swiper.slideTo(realIndex, speed, !silent);
      });
    }
  }

  public prevSlide(speed?: number, silent?: boolean) {
    if (this.swiper) {
      this.zone.runOutsideAngular(() => {
        this.swiper.slidePrev(!silent, speed);
      });
    }
  }

  public nextSlide(speed?: number, silent?: boolean) {
    if (this.swiper) {
      this.zone.runOutsideAngular(() => {
        this.swiper.slideNext(!silent, speed);
      });
    }
  }

  public stopAutoplay(reset?: boolean) {
    if (reset) {
      this.setIndex(0);
    }

    if (this.swiper && this.swiper.autoplay) {
      this.zone.runOutsideAngular(() => {
        this.swiper.autoplay.stop();
      });
    }
  }

  public startAutoplay(reset?: boolean) {
    if (reset) {
      this.setIndex(0);
    }

    if (this.swiper && this.swiper.autoplay) {
      this.zone.runOutsideAngular(() => {
        this.swiper.autoplay.start();
      });
    }
  }
}
