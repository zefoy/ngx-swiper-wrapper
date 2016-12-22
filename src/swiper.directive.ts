declare var require: any;

const Swiper = require('swiper');

import { Directive, OnInit, DoCheck, OnDestroy, OnChanges, SimpleChanges, ElementRef, Optional, Injectable, Input, Output, EventEmitter, ViewChild, KeyValueDiffers, ViewEncapsulation, NgZone } from '@angular/core';

import { SwiperConfig, SwiperConfigInterface, SwiperEvents } from './swiper.interfaces';

@Directive({
  selector: '[swiper]'
})
export class SwiperViewDirective implements OnInit, DoCheck, OnDestroy, OnChanges {
  public swiper: any;

  private configDiff: any;

  @Input() disabled: boolean = false;

  @Input('swiper') config: SwiperConfigInterface;

  @Input() runInsideAngular: boolean = true;

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

  constructor(private zone: NgZone, private elementRef: ElementRef, private differs : KeyValueDiffers, @Optional() private defaults: SwiperConfig) {}

  ngOnInit() {
    let element = this.elementRef.nativeElement;
    let options = new SwiperConfig(this.defaults);

    options.assign(this.config); // Custom config

    if (!options['onSlideChangeStart']) {
      options['onSlideChangeStart'] = (swiper) => {
        this.zone.run(() => {
          this.indexChange.emit(swiper.snapIndex);
        });
      };
    }

    if (!options['onScrollbarDragEnd']) {
      options['onScrollbarDragEnd'] = (swiper) => {
        this.zone.run(() => {
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
      this.swiper = new Swiper(element, options);
    } else {
      this.zone.runOutsideAngular(() => {
        this.swiper = new Swiper(element, options);
      });
    }

    // trigger native swiper events
    SwiperEvents.forEach((eventName)=>{
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

    if (changes) {
      this.ngOnDestroy();
      // This is needed for the styles to update properly

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
      }
    }, 0);
  }
}
