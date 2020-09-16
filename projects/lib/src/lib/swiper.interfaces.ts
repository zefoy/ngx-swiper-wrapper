import { InjectionToken } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperEvents } from 'swiper/types/swiper-events';

export const SWIPER_CONFIG = new InjectionToken<SwiperOptions>('SWIPER_CONFIG');

export type SwiperEvent = keyof SwiperEvents
// Custom Events
| 'scroll' | 'keyPress' | 'beforeResize'
// swiper prefixed events that were added in v4.5.0
| 'swiperTap'
| 'swiperClick'
| 'swiperDoubleTap'
| 'swiperTouchEnd'
| 'swiperTouchMove'
| 'swiperTouchStart'
| 'swiperTouchMoveOpposite'
| 'swiperTransitionEnd'
| 'swiperTransitionStart';


export const SwiperEventNames: SwiperEvent[] = [

  'init',
  'beforeDestroy',

  'scroll',
  'progress',
  'keyPress',

  'resize',
  'loopFix',
  'breakpoint',
  'zoomChange',
  'beforeResize',
  'beforeLoopFix',

  'sliderMove',
  'slideChange',

  'setTranslate',
  'setTransition',

  'fromEdge',
  'reachEnd',
  'reachBeginning',

  'autoplay',
  'autoplayStop',
  'autoplayStart',

  'imagesReady',
  'lazyImageLoad',
  'lazyImageReady',

  'scrollbarDragEnd',
  'scrollbarDragMove',
  'scrollbarDragStart',

  'navigationHide',
  'navigationShow',

  'paginationRender',
  'paginationUpdate',
  'paginationHide',
  'paginationShow',

  'swiperTap',
  'swiperClick',
  'swiperDoubleTap',
  'swiperTouchEnd',
  'swiperTouchMove',
  'swiperTouchStart',
  'swiperTouchMoveOpposite',
  'swiperTransitionEnd',
  'swiperTransitionStart',

  'slideNextTransitionEnd',
  'slideNextTransitionStart',
  'slidePrevTransitionEnd',
  'slidePrevTransitionStart',
  'slideChangeTransitionEnd',
  'slideChangeTransitionStart',

  'toEdge',
  'observerUpdate'
];

export interface SwiperA11YInterface {
  enabled?: boolean,
  prevSlideMessage?: string,
  nextSlideMessage?: string,
  firstSlideMessage?: string,
  lastSlideMessage?: string,
  paginationBulletMessage?: string,
  notificationClass?: string
}

export interface SwiperLazyInterface {
  loadPrevNext?: boolean,
  loadPrevNextAmount?: number,
  loadOnTransitionStart?: boolean,
  elementClass?: string,
  loadingClass?: string,
  loadedClass?: string,
  preloaderClass?: string
}

export interface SwiperZoomInterface {
  maxRatio?: number,
  minRatio?: number,
  toggle?: boolean,
  containerClass?: string,
  zoomedSlideClass?: string
}

export interface SwiperThumbsInterface {
  swiper?: any,
  slideThumbActiveClass?: string,
  thumbsContainerClass?: string,
  multipleActiveThumbs?: boolean
}

export interface SwiperHistoryInterface {
  replaceState?: boolean,
  key?: string
}

export interface SwiperVirtualInterface {
  slides?: any[],
  cache?: boolean,
  renderSlide?: SwiperRenderSlideFunction,
  renderExternal?: SwiperRenderExternalFunction,
  addSlidesBefore?: number,
  addSlidesAfter?: number
}

export interface SwiperKeyboardInterface {
  enabled?: boolean,
  onlyInViewport?: boolean
}

export interface SwiperAutoplayInterface {
  delay?: number,
  stopOnLastSlide?: boolean,
  disableOnInteraction?: boolean,
  reverseDirection?: boolean,
  waitForTransition?: boolean
}

export interface SwiperScrollbarInterface {
  el?: string | HTMLElement,
  hide?: boolean,
  draggable?: boolean,
  snapOnRelease?: boolean,
  dragSize?: number | 'auto',
  loclClass?: string,
  dragClass?: string
}

export interface SwiperControllerInterface {
  control?: any,
  inverse?: boolean,
  by?: 'slide' | 'container'
}

export interface SwiperNavigationInterface {
  nextEl?: string | HTMLElement,
  prevEl?: string | HTMLElement,
  hideOnClick?: boolean,
  disabledClass?: string,
  hiddenClass?: string
}

export interface SwiperPaginationInterface {
  el?: string | HTMLElement,
  type?: 'bullets' | 'fraction' | 'progressbar' | 'custom',
  bulletElement?: string,
  dynamicBullets?: boolean,
  dynamicMainBullets?: number,
  hideOnClick?: boolean,
  clickable?: boolean,
  progressbarOpposite?: boolean,
  formatFractionCurrent?: SwiperFormatFractionFunction,
  formatFractionTotal?: SwiperFormatFractionFunction,
  renderBullet?: SwiperRenderBulletFunction,
  renderFraction?: SwiperRenderFractionFunction,
  renderProgressbar?: SwiperRenderProgressbarFunction,
  renderCustom?: SwiperRenderCustomFunction,
  bulletClass?: string,
  bulletActiveClass?: string,
  modifierClass?: string,
  currentClass?: string,
  totalClass?: string,
  hiddenClass?: string,
  progressbarFillClass?: string,
  clickableClass?: string,
  lockClass?: string
}

export interface SwiperMousewheelInterface {
  forceToAxis?: boolean,
  releaseOnEdges?: boolean,
  invert?: boolean,
  sensitivity?: number,
  eventsTarget?: string | HTMLElement
}

export interface SwiperHashNavigationInterface {
  watchState?: boolean,
  replaceState?: boolean
}

export interface SwiperFadeEffectInterface {
  crossFade?: boolean
}

export interface SwiperFlipEffectInterface {
  slideShadows?: boolean,
  limitRotation?: boolean
}

export interface SwiperCubeEffectInterface {
  slideShadows?: boolean,
  shadow?: boolean,
  shadowOffset?: number,
  shadowScale?: number
}

export interface SwiperCoverflowEffectInterface {
  slideShadows?: boolean,
  rotate?: number,
  stretch?: number,
  depth?: number,
  modifier?: number
}

export interface SwiperBreakpointsInterface {
  [size: number]: SwiperOptions
}

export class SwiperConfig implements SwiperOptions {
  public on?: any;

  // Swiper parameters
  public init?: boolean;
  public updateOnWindowResize?: boolean;
  public initialSlide?: number;
  public direction?: 'horizontal' | 'vertical';
  public speed?: number;
  public setWrapperSize?: boolean;
  public virtualTranslate?: boolean;
  public width?: number;
  public height?: number;
  public autoHeight?: boolean;
  public roundLengths?: boolean;
  public nested?: boolean;
  public uniqueNavElements?: boolean;
  public effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';
  public runCallbacksOnInit?: boolean;
  public watchOverflow?: boolean;

  // CSS scroll snapOnRelease
  public cssMode?: boolean;

  // Slides grid
  public spaceBetween?: number;
  public slidesPerView?: number | 'auto';
  public slidesPerColumn?: number;
  public slidesPerColumnFill?: 'row' | 'column';
  public slidesPerGroup?: number;
  public centeredSlides?: boolean;
  public centeredSlidesBounds?: boolean;
  public slidesOffsetBefore?: number;
  public slidesOffsetAfter?: number;
  public normalizeSlideIndex?: boolean;
  public centerInsufficientSlides?: boolean;

  // Grab cursor
  public grabCursor?: boolean;

  // Touches
  public touchEventsTarget?: 'container' | 'wrapper';
  public touchRatio?: number;
  public touchAngle?: number;
  public simulateTouch?: boolean;
  public shortSwipes?: boolean;
  public longSwipes?: boolean;
  public longSwipesRatio?: number;
  public longSwipesMs?: number;
  public followFinger?: boolean;
  public allowTouchMove?: boolean;
  public threshold?: number;
  public touchStartPreventDefault?: boolean;
  public touchStartForcePreventDefault?: boolean;
  public touchMoveStopPropagation?: boolean;
  public iOSEdgeSwipeDetection?: boolean;
  public iOSEdgeSwipeThreshold?: number;
  public touchReleaseOnEdges?: boolean;
  public passiveListeners?: boolean;

  // Touch resistance
  public resistance?: boolean;
  public resistanceRatio?: number;

  // Swiping / no swiping
  public preventInteractionOnTransition?: boolean;
  public allowSlidePrev?: boolean;
  public allowSlideNext?: boolean;
  public noSwiping?: boolean;
  public noSwipingClass?: string;
  public noSwipingSelector?: string;
  public swipeHandler?: string | HTMLElement;

  // Clicks
  public preventClicks?: boolean;
  public preventClicksPropagation?: boolean;
  public slideToClickedSlide?: boolean;

  // Freemode
  public freeMode?: boolean;
  public freeModeMomentum?: boolean;
  public freeModeMomentumRatio?: number;
  public freeModeMomentumVelocityRatio?: number;
  public freeModeMomentumBounce?: boolean;
  public freeModeMomentumBounceRatio?: number;
  public freeModeMinimumVelocity?: number;
  public freeModeSticky?: boolean;

  // Progress
  public watchSlidesProgress?: boolean;
  public watchSlidesVisibility?: boolean;

  // Images
  public preloadImages?: boolean;
  public updateOnImagesReady?: boolean;

  // Loop
  public loop?: boolean;
  public loopAdditionalSlides?: number;
  public loopedSlides?: number;
  public loopFillGroupWithBlank?: boolean;

  // Breakpoints
  public breakpoints?: any;

  // Observer
  public observer?: boolean;
  public observeParents?: boolean;
  public observeSlideChildren?: boolean;

  // Namespace
  public containerModifierClass?: string;
  public slideClass?: string;
  public slideActiveClass?: string;
  public slideDuplicatedActiveClass?: string;
  public slideVisibleClass?: string;
  public slideDuplicateClass?: string;
  public slideNextClass?: string;
  public slideDuplicatedNextClass?: string;
  public slidePrevClass?: string;
  public slideDuplicatedPrevClass?: string;
  public wrapperClass?: string;

  // Effects
  public fadeEffect?: any;
  public flipEffect?: any;
  public cubeEffect?: any;
  public coverflowEffect?: any;

  // Components
  public parallax?: boolean;

  public a11y?: boolean | any;
  public lazy?: boolean | any;
  public zoom?: boolean | any;
  public history?: boolean | any;
  public virtual?: boolean | any;
  public autoplay?: boolean | any;
  public keyboard?: boolean | any;
  public scrollbar?: boolean | any;
  public mousewheel?: boolean | any;
  public controller?: boolean | any;
  public navigation?: boolean | any;
  public pagination?: boolean | any;
  public hashNavigation?: boolean | any;

  constructor(config: SwiperOptions = {}) {
    this.assign(config);
  }

  assign(config: SwiperOptions | any = {}, target?: any) {
    target = target || this;

    for (const key in config) {
      if (config[key] != null && !Array.isArray(config[key]) && typeof config[key] === 'object' &&
         (typeof HTMLElement === 'undefined' || !(config[key] instanceof HTMLElement)))
      {
        target[key] = {};

        this.assign(config[key], target[key]);
      } else {
        target[key] = config[key];
      }
    }
  }
}

export type SwiperFormatFractionFunction = (fraction: number) => number;

export type SwiperRenderSlideFunction = (slide: any, index: number) => HTMLElement;
export type SwiperRenderExternalFunction = (data: any) => void;

export type SwiperRenderCustomFunction = (swiper: any, current: number, total: number) => string;

export type SwiperRenderBulletFunction = (index: number, className: string) => string;
export type SwiperRenderFractionFunction = (currentClass: string, totalClass: string) => string;
export type SwiperRenderProgressbarFunction = (progressbarClass: string) => string;
