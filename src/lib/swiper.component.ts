import { Component, Optional, OnInit, Input, HostBinding, Output, EventEmitter, ViewChild, ViewChildren, QueryList, ElementRef, ViewEncapsulation } from '@angular/core';

import { SwiperDirective } from './swiper.directive';

import { SwiperConfig, SwiperConfigInterface } from './swiper.interfaces';

@Component({
  selector: 'swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements OnInit {
  public isAtLast: boolean;
  public isAtFirst: boolean;

  @HostBinding('hidden')
  @Input() hidden: boolean = false;
  @Input() disabled: boolean = false;

  @Input() config: SwiperConfigInterface;

  @Input() useSwiperClass: boolean = true;
  @Input() runInsideAngular: boolean = false;

  @HostBinding('class.s-wrapper')
  @Input() useSwiperWrapperClass: boolean = true;

  @Output() indexChange = new EventEmitter<number>();

  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  @ViewChildren('swiperSlides') swiperSlides: QueryList<ElementRef>;

  @Output('init'              ) S_INIT                = new EventEmitter<any>();
  @Output('slideChangeStart'  ) S_SLIDECHANGESTART    = new EventEmitter<any>();
  @Output('slideChangeEnd'    ) S_SLIDECHANGEEND      = new EventEmitter<any>();
  @Output('slideNextStart'    ) S_SLIDENEXTSTART      = new EventEmitter<any>();
  @Output('slideNextEnd'      ) S_SLIDENEXTEND        = new EventEmitter<any>();
  @Output('slidePrevStart'    ) S_SLIDEPREVSTART      = new EventEmitter<any>();
  @Output('slidePrevEnd'      ) S_SLIDEPREVEND        = new EventEmitter<any>();
  @Output('transitionStart'   ) S_TRANSITIONSTART     = new EventEmitter<any>();
  @Output('transitionEnd'     ) S_TRANSITIONEND       = new EventEmitter<any>();
  @Output('touchStart'        ) S_TOUCHSTART          = new EventEmitter<any>();
  @Output('touchMove'         ) S_TOUCHMOVE           = new EventEmitter<any>();
  @Output('touchMoveOpposite' ) S_TOUCHMOVEOPPOSITE   = new EventEmitter<any>();
  @Output('sliderMove'        ) S_SLIDERMOVE          = new EventEmitter<any>();
  @Output('touchEnd'          ) S_TOUCHEND            = new EventEmitter<any>();
  @Output('click'             ) S_CLICK               = new EventEmitter<any>();
  @Output('tap'               ) S_TAP                 = new EventEmitter<any>();
  @Output('doubleTap'         ) S_DOUBLETAP           = new EventEmitter<any>();
  @Output('imagesReady'       ) S_IMAGESREADY         = new EventEmitter<any>();
  @Output('progress'          ) S_PROGRESS            = new EventEmitter<any>();
  @Output('reachBeginning'    ) S_REACHBEGINNING      = new EventEmitter<any>();
  @Output('reachEnd'          ) S_REACHEND            = new EventEmitter<any>();
  @Output('destroy'           ) S_DESTROY             = new EventEmitter<any>();
  @Output('setTranslate'      ) S_SETTRANSLATE        = new EventEmitter<any>();
  @Output('setTransition'     ) S_SETTRANSITION       = new EventEmitter<any>();
  @Output('autoplay'          ) S_AUTOPLAY            = new EventEmitter<any>();
  @Output('autoplayStart'     ) S_AUTOPLAYSTART       = new EventEmitter<any>();
  @Output('autoplayStop'      ) S_AUTOPLAYSTOP        = new EventEmitter<any>();
  @Output('lazyImageLoad'     ) S_LAZYIMAGELOAD       = new EventEmitter<any>();
  @Output('lazyImageReady'    ) S_LAZYIMAGEREADY      = new EventEmitter<any>();
  @Output('paginationRendered') S_PAGINATIONRENDERED  = new EventEmitter<any>();
  @Output('scroll'            ) S_SCROLL              = new EventEmitter<any>();

  constructor(private elementRef: ElementRef, @Optional() private defaults: SwiperConfig) {}

  ngOnInit() {
    this.config = this.config || {};

    let element = this.elementRef.nativeElement;

    let options = new SwiperConfig(this.defaults);

    options.assign(this.config); // Custom config

    this.swiperSlides.changes.subscribe((changes: any) => {
      console.log(changes);

      /*if (this.swiperWrapper) {
        for (let i = 0; i < this.swiperWrapper.nativeElement.children.length; i++) {
          this.swiperWrapper.nativeElement.children[i].classList.add('swiper-slide');
        }
      }*/
    });

    if (options.scrollbar === true || options.scrollbar === '.swiper-scrollbar') {
      this.config.scrollbar = element.querySelector('.swiper-scrollbar');
    }

    if (options.pagination === true || options.pagination === '.swiper-pagination') {
      this.config.pagination = element.querySelector('.swiper-pagination');
    }

    if (options.prevButton === true || options.prevButton === '.swiper-button-prev') {
      this.config.prevButton = element.querySelector('.swiper-button-prev');
    }

    if (options.nextButton === true || options.nextButton === '.swiper-button-next') {
      this.config.nextButton = element.querySelector('.swiper-button-next');
    }

    if (options.pagination === true && options.paginationBulletRender === undefined) {
      this.config.paginationBulletRender = (swiper, index, className) => {
        if (this.directiveRef.swiper) {
          if (index === 0) {
            return '<span class="swiper-pagination-handle" index=' + index + '>' +
              '<span class="' + className + ' ' + className + '-first"></span></span>';
          } else if (index === (swiper.slides.length - 1)) {
            return '<span class="swiper-pagination-handle" index=' + index + '>' +
              '<span class="' + className + ' ' + className + '-last"></span></span>';
          } else {
            return '<span class="swiper-pagination-handle" index=' + index + '>' +
              '<span class="' + className + ' ' + className + '-middle"></span></span>';
          }
        }
      };
    }
  }

  update(updateTranslate?: boolean) {
    console.warn('Deprecated function, update needs to be called through directiveRef!');

    this.directiveRef.update(updateTranslate);
  }

  getIndex() {
    console.warn('Deprecated function, getIndex needs to be called through directiveRef!');

    this.directiveRef.getIndex();
  }

  setIndex(index: number, speed?: number, callbacks?: boolean) {
    console.warn('Deprecated function, setIndex needs to be called through directiveRef!');

    this.directiveRef.setIndex(index, speed, callbacks);
  }

  prevSlide(callbacks?: boolean, speed?: number) {
    console.warn('Deprecated function, prevSlide needs to be called through directiveRef!');

    this.directiveRef.prevSlide(speed, callbacks);
  }

  nextSlide(callbacks?: boolean, speed?: number) {
    console.warn('Deprecated function, nextSlide needs to be called through directiveRef!');

    this.directiveRef.nextSlide(speed, callbacks);
  }

  stopAutoplay() {
    console.warn('Deprecated function, stopAutoplay needs to be called through directiveRef!');

    this.directiveRef.stopAutoplay();
  }

  startAutoplay() {
    console.warn('Deprecated function, startAutoplay needs to be called through directiveRef!');

    this.directiveRef.startAutoplay();
  }

  onIndexSelect(event: Event) {
    this.setIndex(event.target['attributes']['index']['value']);
  }

  onIndexUpdate(swiper: any, event: string) {
    this.isAtLast = swiper.isEnd;
    this.isAtFirst = swiper.isBeginning;

    this[event].emit(swiper);
  }
}
