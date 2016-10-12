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
  freeModeMomentum?: boolean,
  freeModeMomentumRatio?: number,
  freeModeMomentumBounce?: boolean,
  freeModeMomentumBounceRatio?: number,
  freeModeMinimumVelocity?: number,

  effect?: string,
  fade?: fadeObject,
  flip?: flipObject,
  cube?: cubeObject,
  coverflow?: coverflowObject,

  parallax?: boolean,

  spaceBetween?: number,
  centeredSlides?: boolean,
  slidesPerView?: number,
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
  touchEventsTarget?: string,
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

  pagination?: boolean,
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

  hashnav?: boolean,

  preloadImages?: boolean,
  updateOnImagesReady?: boolean,
  lazyLoading?: boolean,
  lazyLoadingInPrevNext?: boolean,
  lazyLoadingInPrevNextAmount?: number,
  lazyLoadingOnTransitionStart?: boolean,

  loop?: boolean,
  loopedSlides?: number,
  loopAdditionalSlides?: number,

  control?: any,
  controlInverse?: boolean,
  controlBy?: string,

  observer?: boolean,
  observeParents?: boolean,

  breakpoints?: any
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
  freeModeMomentum: boolean;
  freeModeMomentumRatio: number;
  freeModeMomentumBounce: boolean;
  freeModeMomentumBounceRatio: number;
  freeModeMinimumVelocity: number;

  effect: string;
  fade: fadeObject;
  flip: flipObject;
  cube: cubeObject;
  coverflow: coverflowObject;

  parallax: boolean;

  spaceBetween: number;
  centeredSlides: boolean;
  slidesPerView: number;
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
  touchEventsTarget: string;
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

  pagination: boolean;
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

  hashnav: boolean;

  preloadImages: boolean;
  updateOnImagesReady: boolean;
  lazyLoading: boolean;
  lazyLoadingInPrevNext: boolean;
  lazyLoadingInPrevNextAmount: number;
  lazyLoadingOnTransitionStart: boolean;

  loop: boolean;
  loopedSlides: number;
  loopAdditionalSlides: number;

  control: any;
  controlInverse: boolean;
  controlBy: string;

  observer: boolean;
  observeParents: boolean;

  breakpoints: any;

  constructor(config: SwiperConfigInterface = {}) {
     this.assign(config);
   }

   public assign(config: SwiperConfigInterface = {}) {
     for (var key in config) {
       this[key] = config[key];
     }
   }
}
