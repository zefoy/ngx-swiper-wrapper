export { SwiperComponent } from './lib/swiper.component';
export { SwiperDirective } from './lib/swiper.directive';

// Avoid breaking change
export { SwiperOptions as SwiperConfigInterface } from 'swiper';

export {
  SWIPER_CONFIG,

  SwiperConfig,
  SwiperBreakpointsInterface,

  SwiperA11YInterface,
  SwiperLazyInterface,
  SwiperZoomInterface,
  SwiperHistoryInterface,
  SwiperVirtualInterface,
  SwiperAutoplayInterface,
  SwiperKeyboardInterface,
  SwiperScrollbarInterface,
  SwiperMousewheelInterface,
  SwiperControllerInterface,
  SwiperNavigationInterface,
  SwiperPaginationInterface,
  SwiperHashNavigationInterface,

  SwiperFadeEffectInterface,
  SwiperFlipEffectInterface,
  SwiperCubeEffectInterface,
  SwiperCoverflowEffectInterface,

  SwiperRenderSlideFunction,
  SwiperRenderCustomFunction,
  SwiperRenderBulletFunction,
  SwiperRenderExternalFunction,
  SwiperRenderFractionFunction,
  SwiperRenderProgressbarFunction
} from './lib/swiper.interfaces';

export { SwiperModule } from './lib/swiper.module';
