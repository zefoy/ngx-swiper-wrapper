import * as Swiper from 'swiper/dist/js/swiper.js';

import { Directive,
  AfterViewInit, DoCheck, OnDestroy, OnChanges,
  Input, Output, HostBinding, EventEmitter,
  NgZone, Renderer2, ElementRef, Optional, Inject,
  SimpleChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

import { SWIPER_CONFIG } from './swiper.interfaces';

import { SwiperEvents, SwiperConfig, SwiperConfigInterface } from './swiper.interfaces';

@Directive({
  selector: '[swiper]',
  exportAs: 'ngxSwiper'
})
export class SwiperDirective implements AfterViewInit, DoCheck, OnDestroy, OnChanges {
  private instance: any;

  private configDiff: KeyValueDiffer<string, any>;

  private initialIndex: number;

  @Input()
  set index(index: number) {
    if (index != null) {
      this.setIndex(index);
    }
  }

  @Input() disabled: boolean = false;

  @Input('swiper') config: SwiperConfigInterface;

  @Output() indexChange = new EventEmitter<number>();

  @Output('init'                       ) S_INIT                           = new EventEmitter<any>();
  @Output('beforeDestroy'              ) S_BEFOREDESTROY                  = new EventEmitter<any>();

  @Output('scroll'                     ) S_SCROLL                         = new EventEmitter<any>();
  @Output('progress'                   ) S_PROGRESS                       = new EventEmitter<any>();

  @Output('resize'                     ) S_RESIZE                         = new EventEmitter<any>();
  @Output('breakpoint'                 ) S_BREAKPOINT                     = new EventEmitter<any>();
  @Output('beforeResize'               ) S_BEFORERESIZE                   = new EventEmitter<any>();

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
    @Optional() @Inject(SWIPER_CONFIG) private defaults: SwiperConfigInterface) {}

  ngAfterViewInit() {
    const params = new SwiperConfig(this.defaults);

    params.assign(this.config); // Custom configuration

    if (params.scrollbar === true) {
      params.scrollbar = {
        el: '.swiper-scrollbar'
      };
    }

    if (params.pagination === true) {
      params.pagination = {
        el: '.swiper-pagination'
      };
    }

    if (params.navigation === true) {
      params.navigation = {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      };
    }

    if (this.disabled) {
      params.allowSlidePrev = false;
      params.allowSlideNext = false;
    }

    if (this.initialIndex != null) {
      params.initialSlide = this.initialIndex;

      this.initialIndex = null;
    }

    params['on'] = {
      slideChange: () => {
        this.zone.run(() => {
          if (this.instance) {
            this.indexChange.emit(this.instance.realIndex);
          }
        });
      }
    };

    this.zone.runOutsideAngular(() => {
      this.instance = new Swiper(this.elementRef.nativeElement, params);
    });

    if (params.init !== false) {
      this.S_INIT.emit(this.instance);
    }

    // Add native Swiper event handling
    SwiperEvents.forEach((eventName) => {
      eventName = eventName.replace('swiper', '');
      eventName = eventName.charAt(0).toLowerCase() + eventName.slice(1);

      this.instance.on(eventName, (...args) => {
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

      this.configDiff.diff(this.config || {});
    }
  }

  ngDoCheck() {
    if (this.configDiff) {
      const changes = this.configDiff.diff(this.config || {});

      if (changes) {
        this.initialIndex = this.getIndex(true);

        this.ngOnDestroy();

        this.ngAfterViewInit();

        this.update();
      }
    }
  }

  ngOnDestroy() {
    if (this.instance) {
      this.zone.runOutsideAngular(() => {
        this.instance.destroy(true, this.instance.initialized || false);
      });

      this.instance = null;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.instance && changes['disabled']) {
      if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
        if (changes['disabled'].currentValue === true) {
          this.zone.runOutsideAngular(() => {
            this.ngOnDestroy();

            this.ngAfterViewInit();
          });
        } else if (changes['disabled'].currentValue === false) {
          this.zone.runOutsideAngular(() => {
            this.ngOnDestroy();

            this.ngAfterViewInit();
          });
        }
      }
    }
  }

  public swiper(): any {
    return this.instance;
  }

  public init() {
    if (this.instance) {
      this.zone.runOutsideAngular(() => {
        this.instance.init();
      });
    }
  }

  public update() {
    setTimeout(() => {
      if (this.instance) {
        this.zone.runOutsideAngular(() => {
          this.instance.update();
        });
      }
    }, 0);
  }

  public getIndex(real?: boolean) {
    if (!this.instance) {
      return this.initialIndex;
    } else {
      return real ? this.instance.realIndex : this.instance.activeIndex;
    }
  }

  public setIndex(index: number, speed?: number, silent?: boolean) {
    if (!this.instance) {
      this.initialIndex = index;
    } else {
      let realIndex = index * this.instance.params.slidesPerGroup;

      if (this.instance.params.loop) {
        realIndex += this.instance.loopedSlides;
      }

      this.zone.runOutsideAngular(() => {
        this.instance.slideTo(realIndex, speed, !silent);
      });
    }
  }

  public prevSlide(speed?: number, silent?: boolean) {
    if (this.instance) {
      this.zone.runOutsideAngular(() => {
        this.instance.slidePrev(speed, !silent);
      });
    }
  }

  public nextSlide(speed?: number, silent?: boolean) {
    if (this.instance) {
      this.zone.runOutsideAngular(() => {
        this.instance.slideNext(speed, !silent);
      });
    }
  }

  public stopAutoplay(reset?: boolean) {
    if (reset) {
      this.setIndex(0);
    }

    if (this.instance && this.instance.autoplay) {
      this.zone.runOutsideAngular(() => {
        this.instance.autoplay.stop();
      });
    }
  }

  public startAutoplay(reset?: boolean) {
    if (reset) {
      this.setIndex(0);
    }

    if (this.instance && this.instance.autoplay) {
      this.zone.runOutsideAngular(() => {
        this.instance.autoplay.start();
      });
    }
  }
}
