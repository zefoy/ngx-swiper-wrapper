// http://idangero.us/swiper/api/#emitter

export const SwiperEvents = [
  'init',
  'destroy',

  'scroll',
  'progress',

  'setTranslate',
  'setTransition',

  'autoplay',
  'autoplayStart',
  'autoplayStop',

  'reachBeginning',
  'reachEnd',

  'slideChangeEnd',
  'slideChangeStart',
  'slideNextStart',
  'slideNextEnd',
  'slidePrevStart',
  'slidePrevEnd',

  'sliderMove',

  'swiperClick',
  'swiperTap',
  'swiperDoubleTap',
  'swiperTouchStart',
  'swiperTouchMove',
  'swiperTouchMoveOpposite',
  'swiperTouchEnd',
  'swiperTransitionStart',
  'swiperTransitionEnd',

  'imagesReady',

  'lazyImageLoad',
  'lazyImageReady',

  'paginationRendered'
];

export interface SwiperConfigInterface {
  nested?: boolean,
  direction?: string,
  speed?: number,
  width?: number,
  height?: number,
  autoHeight?: boolean,
  initialSlide?: number,
  roundLengths?: boolean,
  setWrapperSize?: boolean,
  virtualTranslate?: boolean,

  autoplay?: number,
  autoplayStopOnLast?: boolean,
  autoplayDisableOnInteraction?: boolean,

  watchSlidesProgress?: boolean,
  watchSlidesVisibility?: boolean,

  freeMode?: boolean,
  freeModeSticky?: boolean,
  freeModeMinimumVelocity?: number,
  freeModeMomentum?: boolean,
  freeModeMomentumRatio?: number,
  freeModeMomentumBounce?: boolean,
  freeModeMomentumBounceRatio?: number,
  freeModeMomentumVelocityRatio?: number,

  effect?: string,
  fade?: fadeObject,
  flip?: flipObject,
  cube?: cubeObject,
  coverflow?: coverflowObject,

  parallax?: boolean,

  spaceBetween?: number,
  centeredSlides?: boolean,
  slidesPerView?: number | string,
  slidesPerGroup?: number,
  slidesPerColumn?: number,
  slidesPerColumnFill?: string,
  slidesOffsetBefore?: number,
  slidesOffsetAfter?: number,

  grabCursor?: boolean,

  threshold?: number,
  touchAngle?: number,
  touchRatio?: number,
  shortSwipes?: boolean,
  longSwipes?: boolean,
  longSwipesMs?: number,
  longSwipesRatio?: number,
  followFinger?: boolean,
  onlyExternal?: boolean,
  simulateTouch?: boolean,
  passiveListeners?: boolean,
  touchEventsTarget?: string,
  touchReleaseOnEdges?: boolean,
  touchMoveStopPropagation?: boolean,
  iOSEdgeSwipeDetection?: boolean,
  iOSEdgeSwipeThreshold?: number,

  resistance?: boolean,
  resistanceRatio?: number,

  preventClicks?: boolean,
  slideToClickedSlide?: boolean,
  preventClicksPropagation?: boolean,

  noSwiping?: boolean,
  noSwipingClass?: string,
  swipeHandler?: any | string,
  allowSwipeToPrev?: boolean,
  allowSwipeToNext?: boolean,

  uniqueNavElements?: boolean,

  pagination?: any | string,
  paginationType?: string,
  paginationHide?: boolean,
  paginationElement?: string,
  paginationClickable?: boolean,
  paginationCustomRender?: any,
  paginationBulletRender?: any,
  paginationFractionRender?: any,
  paginationProgressRender?: any,

  nextButton?: any | string,
  prevButton?: any | string,

  scrollbar?: any | string,
  scrollbarHide?: boolean,
  scrollbarDraggable?: boolean,
  scrollbarSnapOnRelease?: boolean,

  a11y?: boolean,
  prevSlideMessage?: string,
  nextSlideMessage?: string,
  firstSlideMessage?: string,
  lastSlideMessage?: string,
  paginationBulletMessage?: string,

  keyboardControl?: boolean,
  mousewheelControl?: boolean,
  mousewheelInvert?: boolean,
  mousewheelSensitivity?: number,
  mousewheelForceToAxis?: boolean,
  mousewheelReleaseOnEdges?: boolean,
  mousewheelEventsTarged?: any | string,

  history?: string,
  hashnav?: boolean,
  replaceState?: boolean,
  hashnavWatchState?: boolean,

  preloadImages?: boolean,
  updateOnImagesReady?: boolean,
  lazyLoading?: boolean,
  lazyLoadingInPrevNext?: boolean,
  lazyLoadingInPrevNextAmount?: number,
  lazyLoadingOnTransitionStart?: boolean,

  loop?: boolean,
  loopedSlides?: number,
  loopAdditionalSlides?: number,

  zoom?: boolean,
  zoomMin?: number,
  zoomMax?: number,
  zoomToggle?: boolean,

  control?: any,
  controlInverse?: boolean,
  controlBy?: string,
  normalizeSlideIndex?: boolean,

  observer?: boolean,
  observeParents?: boolean,

  breakpoints?: any,

  slideClass?: string,
  slideActiveClass?: string,
  slideVisibleClass?: string,
  slideDuplicateClass?: string,
  slideNextClass?: string,
  slidePrevClass?: string,
  wrapperClass?: string,
  bulletClass?: string,
  bulletActiveClass?: string,
  notificationClass?: string,
  paginationHiddenClass?: string,
  paginationCurrentClass?: string,
  paginationTotalClass?: string,
  paginationModifierClass?: string,
  paginationClickableClass?: string,
  paginationProgressbarClass?: string,
  buttonDisabledClass?: string,
  containerModifierClass?: string,
  slideDuplicatedActiveClass?: string,
  slideDuplicatedNextClass?: string,
  slideDuplicatedPrevClass?: string,
  lazyLoadingClass?: string,
  lazyStatusLoadingClass?: string,
  lazyStatusLoadedClass?: string,
  lazyPreloaderClass?: string,
  preloaderClass?: string,
  zoomContainerClass?: string,

  runCallbacksOnInit?: boolean,
  onInit?: any,
  onSlideChangeStart?: any,
  onSlideChangeEnd?: any,
  onSlideNextStart?: any,
  onSlideNextEnd?: any,
  onSlidePrevStart?: any,
  onSlidePrevEnd?: any,
  onTransitionStart?: any,
  onTransitionEnd?: any,
  onTouchStart?: any,
  onTouchMove?: any,
  onTouchMoveOpposite?: any,
  onSliderMove?: any,
  onTouchEnd?: any,
  onClick?: any,
  onTap?: any,
  onDoubleTap?: any,
  onImagesReady?: any,
  onProgress?: any,
  onReachBeginning?: any,
  onReachEnd?: any,
  onDestroy?: any,
  onSetTranslate?: any,
  onSetTransition?: any,
  onAutoplay?: any,
  onAutoplayStart?: any,
  onAutoplayStop?: any,
  onLazyImageLoad?: any,
  onLazyImageReady?: any,
  onPaginationRendered?: any,
  onScroll?: any,
  onScrollbarDragEnd?: any
}

export interface fadeObjectInterface {
  crossFade?: boolean
}

export interface flipObjectInterface {
  limitRotation?: boolean,
  slideShadows?: boolean
}

export interface cubeObjectInterface {
  shadow?: boolean,
  shadowScale?: number,
  shadowOffset?: number,
  slideShadows?: boolean
}

export interface coverflowObjectInterface {
  depth?: number,
  rotate?: number,
  stretch?: number,
  modifier?: number,
  slideShadows?: boolean
}

export class fadeObject implements fadeObjectInterface {
  crossFade: boolean;
}

export class flipObject implements flipObjectInterface {
  limitRotation: boolean;
  slideShadows: boolean;
}

export class cubeObject implements cubeObjectInterface {
  shadow: boolean;
  shadowScale: number;
  shadowOffset: number;
  slideShadows: boolean;
}

export class coverflowObject implements coverflowObjectInterface {
  depth: number;
  rotate: number;
  stretch: number;
  modifier: number;
  slideShadows: boolean;
}

export class SwiperConfig implements SwiperConfigInterface {
  nested: boolean;
  direction: string;
  speed: number;
  width: number;
  height: number;
  autoHeight: boolean;
  initialSlide: number;
  roundLengths: boolean;
  setWrapperSize: boolean;
  virtualTranslate: boolean;

  autoplay: number;
  autoplayStopOnLast: boolean;
  autoplayDisableOnInteraction: boolean;

  watchSlidesProgress: boolean;
  watchSlidesVisibility: boolean;

  freeMode: boolean;
  freeModeSticky: boolean;
  freeModeMinimumVelocity: number;
  freeModeMomentum: boolean;
  freeModeMomentumRatio: number;
  freeModeMomentumBounce: boolean;
  freeModeMomentumBounceRatio: number;
  freeModeMomentumVelocityRatio: number;

  effect: string;
  fade: fadeObject;
  flip: flipObject;
  cube: cubeObject;
  coverflow: coverflowObject;

  parallax: boolean;

  spaceBetween: number;
  centeredSlides: boolean;
  slidesPerView: number | string;
  slidesPerGroup: number;
  slidesPerColumn: number;
  slidesPerColumnFill: string;
  slidesOffsetBefore: number;
  slidesOffsetAfter: number;

  grabCursor: boolean;

  threshold: number;
  touchAngle: number;
  touchRatio: number;
  shortSwipes: boolean;
  longSwipes: boolean;
  longSwipesMs: number;
  longSwipesRatio: number;
  followFinger: boolean;
  onlyExternal: boolean;
  simulateTouch: boolean;
  passiveListeners: boolean;
  touchEventsTarget: string;
  touchReleaseOnEdges: boolean;
  touchMoveStopPropagation: boolean;
  iOSEdgeSwipeDetection: boolean;
  iOSEdgeSwipeThreshold: number;

  resistance: boolean;
  resistanceRatio: number;

  preventClicks: boolean;
  slideToClickedSlide: boolean;
  preventClicksPropagation: boolean;

  noSwiping: boolean;
  noSwipingClass: string;
  swipeHandler: any | string;
  allowSwipeToPrev: boolean;
  allowSwipeToNext: boolean;

  uniqueNavElements: boolean;

  pagination: any | string;
  paginationType: string;
  paginationHide: boolean;
  paginationElement: string;
  paginationClickable: boolean;
  paginationCustomRender: any;
  paginationBulletRender: any;
  paginationFractionRender: any;
  paginationProgressRender: any;

  nextButton: any | string;
  prevButton: any | string;

  scrollbar: any | string;
  scrollbarHide: boolean;
  scrollbarDraggable: boolean;
  scrollbarSnapOnRelease: boolean;

  a11y: boolean;
  prevSlideMessage: string;
  nextSlideMessage: string;
  firstSlideMessage: string;
  lastSlideMessage: string;
  paginationBulletMessage: string;

  keyboardControl: boolean;
  mousewheelControl: boolean;
  mousewheelInvert: boolean;
  mousewheelSensitivity: number;
  mousewheelForceToAxis: boolean;
  mousewheelReleaseOnEdges: boolean;
  mousewheelEventsTarged: any | string;

  history: string;
  hashnav: boolean;
  replaceState: boolean;
  hashnavWatchState: boolean;

  preloadImages: boolean;
  updateOnImagesReady: boolean;
  lazyLoading: boolean;
  lazyLoadingInPrevNext: boolean;
  lazyLoadingInPrevNextAmount: number;
  lazyLoadingOnTransitionStart: boolean;

  loop: boolean;
  loopedSlides: number;
  loopAdditionalSlides: number;

  zoom: boolean;
  zoomMin: number;
  zoomMax: number;
  zoomToggle: boolean;

  control: any;
  controlInverse: boolean;
  controlBy: string;
  normalizeSlideIndex: boolean;

  observer: boolean;
  observeParents: boolean;

  breakpoints: any;

  slideClass: string;
  slideActiveClass: string;
  slideVisibleClass: string;
  slideDuplicateClass: string;
  slideNextClass: string;
  slidePrevClass: string;
  wrapperClass: string;
  bulletClass: string;
  bulletActiveClass: string;
  notificationClass: string;
  paginationHiddenClass: string;
  paginationCurrentClass: string;
  paginationTotalClass: string;
  paginationModifierClass: string;
  paginationClickableClass: string;
  paginationProgressbarClass: string;
  buttonDisabledClass: string;
  containerModifierClass: string;
  slideDuplicatedActiveClass: string;
  slideDuplicatedNextClass: string;
  slideDuplicatedPrevClass: string;
  lazyLoadingClass: string;
  lazyStatusLoadingClass: string;
  lazyStatusLoadedClass: string;
  lazyPreloaderClass: string;
  preloaderClass: string;
  zoomContainerClass: string;

  runCallbacksOnInit: boolean;
  onInit: any;
  onSlideChangeStart: any;
  onSlideChangeEnd: any;
  onSlideNextStart: any;
  onSlideNextEnd: any;
  onSlidePrevStart: any;
  onSlidePrevEnd: any;
  onTransitionStart: any;
  onTransitionEnd: any;
  onTouchStart: any;
  onTouchMove: any;
  onTouchMoveOpposite: any;
  onSliderMove: any;
  onTouchEnd: any;
  onClick: any;
  onTap: any;
  onDoubleTap: any;
  onImagesReady: any;
  onProgress: any;
  onReachBeginning: any;
  onReachEnd: any;
  onDestroy: any;
  onSetTranslate: any;
  onSetTransition: any;
  onAutoplay: any;
  onAutoplayStart: any;
  onAutoplayStop: any;
  onLazyImageLoad: any;
  onLazyImageReady: any;
  onPaginationRendered: any;
  onScroll: any;
  onScrollbarDragEnd: any;

  constructor(config: SwiperConfigInterface = {}) {
     this.assign(config);
   }

   public assign(config: SwiperConfigInterface = {}) {
     for (let key in config) {
       this[key] = config[key];
     }
   }
}
