declare var require: any;

const Swiper = require('swiper');

import { Directive, OnInit, DoCheck, OnDestroy, OnChanges, SimpleChanges, ElementRef, Optional, Injectable, Input, Output, EventEmitter, ViewChild, KeyValueDiffers, ViewEncapsulation, NgZone } from '@angular/core';

import { SwiperConfig, SwiperConfigInterface } from './swiper.interfaces';

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
