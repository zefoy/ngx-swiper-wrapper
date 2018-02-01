import { Component,
  AfterViewInit, OnDestroy, Input, Output, HostBinding, EventEmitter, ViewChild,
  NgZone, Renderer2, ElementRef, Optional, Inject, ViewEncapsulation } from '@angular/core';

import { SWIPER_CONFIG } from './swiper.interfaces';

import { SwiperDirective } from './swiper.directive';

import { SwiperConfig, SwiperConfigInterface, SwiperRenderBulletFunction } from './swiper.interfaces';

@Component({
  selector: 'swiper',
  exportAs: 'ngxSwiper',
  templateUrl: './lib/swiper.component.html',
  styleUrls: [ './lib/swiper.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements AfterViewInit, OnDestroy {
  private mo: any;

  public swiperConfig: any;
  public paginationBackup: any;
  public paginationConfig: any;

  @Input() index: number = null;

  @Input() disabled: boolean = false;

  @Input() config: SwiperConfigInterface;

  @Input() useSwiperClass: boolean = true;

  @Output() indexChange = new EventEmitter<number>();

  @ViewChild('swiperSlides') swiperSlides: ElementRef;

  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  get isAtLast(): boolean {
    return (!this.directiveRef || !this.directiveRef.swiper) ?
      false : this.directiveRef.swiper['isEnd'];
  }

  get isAtFirst(): boolean {
    return (!this.directiveRef || !this.directiveRef.swiper) ?
      false : this.directiveRef.swiper['isBeginning'];
  }

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

  constructor(private zone: NgZone, private renderer: Renderer2, private elementRef: ElementRef,
    @Optional() @Inject(SWIPER_CONFIG) private defaults: SwiperConfigInterface) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.updateClasses();

      if (typeof MutationObserver !== 'undefined') {
        this.mo = new MutationObserver((mutations) => {
          this.updateClasses();
        });

        this.mo.observe(this.swiperSlides.nativeElement, { childList: true });
      }
    });
  }

  ngOnDestroy() {
    if (this.mo) {
      this.mo.disconnect();
    }

    if (this.config && this.paginationBackup) {
      this.config.pagination = this.paginationBackup;
    }
  }

  public getConfig() {
    this.swiperConfig = new SwiperConfig(this.defaults);

    this.swiperConfig.assign(this.config); // Custom configuration

    if (this.swiperConfig.pagination === true ||
       (this.swiperConfig.pagination && typeof this.swiperConfig.pagination === 'object' &&
       (!this.swiperConfig.pagination.type || this.swiperConfig.pagination.type === 'bullets') &&
       !this.swiperConfig.pagination.renderBullet && this.swiperConfig.pagination.el === '.swiper-pagination'))
    {
      this.config = this.config || {};

      if (!this.paginationConfig) {
        this.paginationBackup = this.config.pagination;

        this.paginationConfig = {
          el: '.swiper-pagination',

          renderBullet: (index: number, className: string) => {
            const children = this.swiperSlides.nativeElement.children;

            let bullet = `<span class="${className} ${className}-middle" index="${index}"></span>`;

            if (index === 0) {
              bullet = `<span class="${className} ${className}-first" index="${index}"></span>`;
            } else if (index === (children.length - 1)) {
              bullet = `<span class="${className} ${className}-last" index="${index}"></span>`;
            }

            return `<span class="swiper-pagination-handle" index="${index}">${bullet}</span>`;
          }
        };
      }

      if (this.swiperConfig.pagination === true) {
        this.config.pagination = this.paginationConfig;
      } else {
        this.config.pagination = Object.assign({} , this.config.pagination, this.paginationConfig);
      }
    }

    return this.config;
  }

  private updateClasses() {
    let updateNeeded = false;

    const children = this.swiperSlides.nativeElement.children;

    for (let i = 0; i < children.length; i++) {
      if (!children[i].classList.contains('swiper-slide')) {
        updateNeeded = true;

        children[i].classList.add('swiper-slide');
      }
    }

    if (updateNeeded) {
      this.directiveRef.update();
    }
  }
}
