import { NgModule, ModuleWithProviders, OpaqueToken, Optional, SkipSelf, Inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SwiperComponent } from './swiper.component';
import { SwiperDirective } from './swiper.directive';

import { SwiperConfig, SwiperConfigInterface} from './swiper.interfaces';

export const SWIPER_GUARD = new OpaqueToken('SWIPER_GUARD');
export const SWIPER_CONFIG = new OpaqueToken('SWIPER_CONFIG');

@NgModule({
    imports: [CommonModule],
    declarations: [SwiperComponent, SwiperDirective],
    exports: [CommonModule, SwiperComponent, SwiperDirective]
})
export class SwiperModule {
  constructor (@Optional() @Inject(SWIPER_GUARD) guard: any) {}

  static forRoot(config: SwiperConfigInterface): ModuleWithProviders {
    return {
      ngModule: SwiperModule,
      providers: [
        {
          provide: SWIPER_GUARD,
          useFactory: provideForRootGuard,
          deps: [
            [
              SwiperConfig,
              new Optional(),
              new SkipSelf()
            ]
          ]
        },
        {
          provide: SWIPER_CONFIG,
          useValue: config ? config : {}
        },
        {
          provide: SwiperConfig,
          useFactory: provideDefaultConfig,
          deps: [
            SWIPER_CONFIG
          ]
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SwiperModule
    };
  }
}

export function provideForRootGuard(config: SwiperConfig): any {
  if (config) {
    throw new Error(`
      Application called SwiperModule.forRoot() twice.
      For submodules use SwiperModule.forChild() instead.
    `);
  }

  return 'guarded';
}

export function provideDefaultConfig(config: SwiperConfigInterface): SwiperConfig {
  return new SwiperConfig(config);
}
