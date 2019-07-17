import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgZone, Inject, Optional, ElementRef, Component,
  AfterViewInit, OnDestroy, Input, Output, EventEmitter,
  ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

import { SwiperDirective } from './swiper.directive';

import { SWIPER_CONFIG, SwiperConfig, SwiperConfigInterface,
  SwiperEvent, SwiperEvents } from './swiper.interfaces';

@Component({
  selector: 'swiper',
  exportAs: 'ngxSwiper',
  templateUrl: '../../dist/lib/swiper.component.html',
  styleUrls: [
    '../../dist/lib/swiper.component.css',
    '../../node_modules/swiper/dist/css/swiper.min.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements AfterViewInit, OnDestroy {
  private mo: MutationObserver | null = null;

  public swiperConfig: any = null;
  public paginationBackup: any = null;
  public paginationConfig: any = null;

  @Input() index: number | null = null;

  @Input() disabled: boolean = false;

  @Input() performance: boolean = false;

  @Input() config?: SwiperConfigInterface;

  @Input() useSwiperClass: boolean = true;

  @Output() indexChange = new EventEmitter<number>();

  @ViewChild('swiperSlides', { static: false }) swiperSlides?: ElementRef;

  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  get isAtLast(): boolean {
    return (!this.directiveRef || !this.directiveRef.swiper()) ?
      false : this.directiveRef.swiper()['isEnd'];
  }

  get isAtFirst(): boolean {
    return (!this.directiveRef || !this.directiveRef.swiper()) ?
      false : this.directiveRef.swiper()['isBeginning'];
  }

  @Output('init'                       ) S_INIT                           = new EventEmitter<any>();
  @Output('beforeDestroy'              ) S_BEFOREDESTROY                  = new EventEmitter<any>();

  @Output('scroll'                     ) S_SCROLL                         = new EventEmitter<any>();
  @Output('progress'                   ) S_PROGRESS                       = new EventEmitter<any>();
  @Output('keyPress'                   ) S_KEYPRESS                       = new EventEmitter<any>();

  @Output('resize'                     ) S_RESIZE                         = new EventEmitter<any>();
  @Output('breakpoint'                 ) S_BREAKPOINT                     = new EventEmitter<any>();
  @Output('zoomChange'                 ) S_ZOOMCHANGE                     = new EventEmitter<any>();
  @Output('afterResize'                ) S_AFTERRESIZE                    = new EventEmitter<any>();
  @Output('beforeResize'               ) S_BEFORERESIZE                   = new EventEmitter<any>();

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

  @Output('navigationHide'             ) S_NAVIGATIONHIDE                 = new EventEmitter<any>();
  @Output('navigationShow'             ) S_NAVIGATIONSHOW                 = new EventEmitter<any>();

  @Output('paginationRender'           ) S_PAGINATIONRENDER               = new EventEmitter<any>();
  @Output('paginationUpdate'           ) S_PAGINATIONUPDATE               = new EventEmitter<any>();
  @Output('paginationHide'             ) S_PAGINATIONHIDE                 = new EventEmitter<any>();
  @Output('paginationShow'             ) S_PAGINATIONSHOW                 = new EventEmitter<any>();

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

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(SWIPER_CONFIG) private defaults: SwiperConfigInterface) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.updateClasses();

      if (this.swiperSlides && typeof MutationObserver !== 'undefined') {
        this.mo = new MutationObserver(() => {
          this.updateClasses();
        });

        this.mo.observe(this.swiperSlides.nativeElement, { childList: true });
      }
    });

    window.setTimeout(() => {
      if (this.directiveRef) {
        this.S_INIT.emit();

        this.directiveRef.indexChange = this.indexChange;

        SwiperEvents.forEach((eventName: SwiperEvent) => {
          if (this.directiveRef) {
            const output = `S_${eventName.replace('swiper', '').toUpperCase()}`;

            const directiveOutput = output as keyof SwiperDirective;
            const componentOutput = output as keyof SwiperComponent;

            this.directiveRef[directiveOutput] = this[componentOutput] as EventEmitter<any>;
          }
        });
      }
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.mo) {
      this.mo.disconnect();
    }

    if (this.config && this.paginationBackup) {
      this.config.pagination = this.paginationBackup;
    }
  }

  public getConfig(): SwiperConfigInterface {
    this.swiperConfig = new SwiperConfig(this.defaults);

    this.swiperConfig.assign(this.config); // Custom configuration

    if (this.swiperSlides && (this.swiperConfig.pagination === true ||
       (this.swiperConfig.pagination && typeof this.swiperConfig.pagination === 'object' &&
       (!this.swiperConfig.pagination.type || this.swiperConfig.pagination.type === 'bullets') &&
       !this.swiperConfig.pagination.renderBullet && this.swiperConfig.pagination.el === '.swiper-pagination')))
    {
      this.config = this.config || {};

      if (!this.paginationConfig) {
        this.paginationBackup = this.config.pagination;

        this.paginationConfig = {
          el: '.swiper-pagination',

          renderBullet: (index: number, className: string) => {
            let children = this.swiperSlides ? Array.from(this.swiperSlides.nativeElement.children) : [];

            children = children.filter((child: any) => child.classList.contains('swiper-slide'));

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

    return this.config as SwiperConfigInterface;
  }

  private updateClasses(): void {
    if (this.swiperSlides) {
      let updateNeeded = false;

      const children = this.swiperSlides.nativeElement.children;

      for (let i = 0; i < children.length; i++) {
        if (/swiper-.*/.test(children[i].className) === false) {
          updateNeeded = true;

          children[i].classList.add('swiper-slide');
        }
      }

      if (updateNeeded && this.directiveRef) {
        this.directiveRef.update();
      }
    }

    this.cdRef.detectChanges();
  }

  public onPaginationClick(index: number): void {
    if (this.config && this.directiveRef && (this.config.pagination === true ||
       (this.config.pagination && typeof this.config.pagination === 'object' &&
       (!this.config.pagination.type || this.config.pagination.type === 'bullets') &&
       (this.config.pagination.clickable && this.config.pagination.el === '.swiper-pagination'))))
    {
      this.directiveRef.setIndex(index);
    }
  }
}
