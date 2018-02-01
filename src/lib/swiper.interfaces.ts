import { InjectionToken } from '@angular/core';

export const SWIPER_CONFIG = new InjectionToken<SwiperConfigInterface>('SWIPER_CONFIG');

export const SwiperEvents = [
  'init',
  'beforeDestroy',

  'scroll',
  'progress',
  'keyPress',

  'beforeResize',
  'afterResize',

  'resize',
  'breakpoint',
  'beforeResize',

  'keyPress',
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

  'scrollDragEnd',
  'scrollDragMove',
  'scrollDragStart',

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
  'slideChangeTransitionStart'
];

export interface SwiperConfigInterface {
  // Not supported by the wrapper:
  // init
  // on

  // Swiper parameters
  initialSlide?: number,
  direction?: string,
  speed?: number,
  setWrapperSize?: boolean,
  virtualTranslate?: boolean,
  width?: number,
  height?: number,
  autoHeight?: boolean,
  roundLengths?: boolean,
  nested?: boolean,
  uniqueNavElements?: boolean,
  effect?: string,
  runCallbacksOnInit?: boolean,

  // Slides grid
  spaceBetween?: number,
  slidesPerView?: number | 'auto',
  slidesPerColumn?: number,
  slidesPerColumnFill?: string,
  slidesPerGroup?: number,
  centeredSlides?: boolean,
  slidesOffsetBefore?: number,
  slidesOffsetAfter?: number,
  normalizeSlideIndex?: boolean,

  // Grab cursor
  grabCursor?: boolean,

  // Touches
  touchEventsTarget?: string,
  touchRatio?: number,
  touchAngle?: number,
  simulateTouch?: boolean,
  shortSwipes?: boolean,
  longSwipes?: boolean,
  longSwipesRatio?: number,
  longSwipesMs?: number,
  followFinger?: boolean,
  allowTouchMove?: boolean,
  threshold?: number,
  touchMoveStopPropagation?: boolean,
  iOSEdgeSwipeDetection?: boolean,
  iOSEdgeSwipeThreshold?: number,
  touchReleaseOnEdges?: boolean,
  passiveListeners?: boolean,

  // Touch resistance
  resistance?: boolean,
  resistanceRatio?: number,

  // Swiping / no swiping
  allowSlidePrev?: boolean,
  allowSlideNext?: boolean,
  noSwiping?: boolean,
  noSwipingClass?: string,
  swipeHandler?: string | HTMLElement,

  // Clicks
  preventClicks?: boolean,
  preventClicksPropagation?: boolean,
  slideToClickedSlide?: boolean,

  // Freemode
  freeMode?: boolean,
  freeModeMomentum?: boolean,
  freeModeMomentumRatio?: number,
  freeModeMomentumVelocityRatio?: number,
  freeModeMomentumBounce?: boolean,
  freeModeMomentumBounceRatio?: number,
  freeModeMinimumVelocity?: number,
  freeModeSticky?: boolean,

  // Progress
  watchSlidesProgress?: boolean,
  watchSlidesVisibility?: boolean,

  // Images
  preloadImages?: boolean,
  updateOnImagesReady?: boolean,

  // Loop
  loop?: boolean,
  loopAdditionalSlides?: number,
  loopedSlides?: number,
  loopFillGroupWithBlank?: boolean,

  // Breakpoints
  breakpoints?: SwiperBreakpointsInterface,

  // Observer
  observer?: boolean,
  observeParents?: boolean,

  // Namespace
  containerModifierClass?: string,
  slideClass?: string,
  slideActiveClass?: string,
  slideDuplicatedActiveClass?: string,
  slideVisibleClass?: string,
  slideDuplicateClass?: string,
  slideNextClass?: string,
  slideDuplicatedNextClass?: string,
  slidePrevClass?: string,
  slideDuplicatedPrevClass?: string,
  wrapperClass?: string,

  // Effects
  fadeEffect?: SwiperFadeEffectInterface,
  flipEffect?: SwiperFlipEffectInterface,
  cubeEffect?: SwiperCubeEffectInterface,
  coverflowEffect?: SwiperCoverflowEffectInterface

  // Components
  parallax?: boolean,
  keyboard?: boolean,

  a11y?: boolean | SwiperA11YInterface,
  lazy?: boolean | SwiperLazyInterface,
  zoom?: boolean | SwiperZoomInterface,
  history?: boolean | SwiperHistoryInterface,
  virtual?: boolean | SwiperVirtualInterface,
  autoplay?: boolean | SwiperAutoplayInterface,
  scrollbar?: boolean | SwiperScrollbarInterface,
  mousewheel?: boolean | SwiperMousewheelInterface,
  controller?: boolean | SwiperControllerInterface,
  navigation?: boolean | SwiperNavigationInterface,
  pagination?: boolean | SwiperPaginationInterface,
  hashNavigation?: boolean | SwiperHashNavigationInterface
}

export interface SwiperA11YInterface {
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

export interface SwiperHistoryInterface {
  replaceState?: boolean,
  key?: string
}

export interface SwiperVirtualInterface {
  slides?: any[],
  cache?: boolean,
  renderSlide?: SwiperRenderSlideFunction,
  renderExternal?: SwiperRenderExternalFunction
}

export interface SwiperAutoplayInterface {
  delay?: number,
  stopOnLast?: boolean,
  disableOnInteraction?: boolean
}

export interface SwiperScrollbarInterface {
  el?: string | HTMLElement,
  hide?: boolean,
  draggable?: boolean,
  snapOnRelease?: boolean,
  dragSize?: number | 'auto'
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
  hideOnClick?: boolean,
  clickable?: boolean,
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
  clickableClass?: string
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
  limitRotation?: boolean,
  slideShadows?: boolean
}

export interface SwiperCubeEffectInterface {
  shadow?: boolean,
  shadowScale?: number,
  shadowOffset?: number,
  slideShadows?: boolean
}

export interface SwiperCoverflowEffectInterface {
  depth?: number,
  rotate?: number,
  stretch?: number,
  modifier?: number,
  slideShadows?: boolean
}

export interface SwiperBreakpointsInterface {
  [size: number]: SwiperConfigInterface
}

export class SwiperConfig implements SwiperConfigInterface {
  // Not supported by the wrapper:
  // public init
  // public on

  // Swiper parameters
  public initialSlide: number;
  public direction: string;
  public speed: number;
  public setWrapperSize: boolean;
  public virtualTranslate: boolean;
  public width: number;
  public height: number;
  public autoHeight: boolean;
  public roundLengths: boolean;
  public nested: boolean;
  public uniqueNavElements: boolean;
  public effect: string;
  public runCallbacksOnInit: boolean;

  // Slides grid
  public spaceBetween: number;
  public slidesPerView: number | 'auto';
  public slidesPerColumn: number;
  public slidesPerColumnFill: string;
  public slidesPerGroup: number;
  public centeredSlides: boolean;
  public slidesOffsetBefore: number;
  public slidesOffsetAfter: number;
  public normalizeSlideIndex: boolean;

  // Grab cursor
  public grabCursor: boolean;

  // Touches
  public touchEventsTarget: string;
  public touchRatio: number;
  public touchAngle: number;
  public simulateTouch: boolean;
  public shortSwipes: boolean;
  public longSwipes: boolean;
  public longSwipesRatio: number;
  public longSwipesMs: number;
  public followFinger: boolean;
  public allowTouchMove: boolean;
  public threshold: number;
  public touchMoveStopPropagation: boolean;
  public iOSEdgeSwipeDetection: boolean;
  public iOSEdgeSwipeThreshold: number;
  public touchReleaseOnEdges: boolean;
  public passiveListeners: boolean;

  // Touch resistance
  public resistance: boolean;
  public resistanceRatio: number;

  // Swiping / no swiping
  public allowSlidePrev: boolean;
  public allowSlideNext: boolean;
  public noSwiping: boolean;
  public noSwipingClass: string;
  public swipeHandler: string | HTMLElement;

  // Clicks
  public preventClicks: boolean;
  public preventClicksPropagation: boolean;
  public slideToClickedSlide: boolean;

  // Freemode
  public freeMode: boolean;
  public freeModeMomentum: boolean;
  public freeModeMomentumRatio: number;
  public freeModeMomentumVelocityRatio: number;
  public freeModeMomentumBounce: boolean;
  public freeModeMomentumBounceRatio: number;
  public freeModeMinimumVelocity: number;
  public freeModeSticky: boolean;

  // Progress
  public watchSlidesProgress: boolean;
  public watchSlidesVisibility: boolean;

  // Images
  public preloadImages: boolean;
  public updateOnImagesReady: boolean;

  // Loop
  public loop: boolean;
  public loopAdditionalSlides: number;
  public loopedSlides: number;
  public loopFillGroupWithBlank: boolean;

  // Breakpoints
  public breakpoints: any;

  // Observer
  public observer: boolean;
  public observeParents: boolean;

  // Namespace
  public containerModifierClass: string;
  public slideClass: string;
  public slideActiveClass: string;
  public slideDuplicatedActiveClass: string;
  public slideVisibleClass: string;
  public slideDuplicateClass: string;
  public slideNextClass: string;
  public slideDuplicatedNextClass: string;
  public slidePrevClass: string;
  public slideDuplicatedPrevClass: string;
  public wrapperClass: string;

  // Effects
  public fadeEffect: any;
  public flipEffect: any;
  public cubeEffect: any;
  public coverflowEffect: any;

  // Components
  public parallax: boolean;
  public keyboard: boolean;

  public a11y: boolean | any;
  public lazy: boolean | any;
  public zoom: boolean | any;
  public history: boolean | any;
  public virtual: boolean | any;
  public autoplay: boolean | any;
  public scrollbar: boolean | any;
  public mousewheel: boolean | any;
  public controller: boolean | any;
  public navigation: boolean | any;
  public pagination: boolean | any;
  public hashNavigation: boolean | any;

  constructor(config: SwiperConfigInterface = {}) {
    this.assign(config);
  }

  assign(config: SwiperConfigInterface | any = {}, target?: any) {
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

export type SwiperRenderSlideFunction = (index: number) => HTMLElement;
export type SwiperRenderExternalFunction = (data: any) => void;

export type SwiperRenderCustomFunction = (current: number, total: number) => string;

export type SwiperRenderBulletFunction = (index: number, className: string) => string;
export type SwiperRenderFractionFunction = (currentClass: string, totalClass: string) => string;
export type SwiperRenderProgressbarFunction = (progressbarClass: string) => string;
