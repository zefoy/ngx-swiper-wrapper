import { NgModule, ModuleWithProviders, OpaqueToken, Optional, SkipSelf } from "@angular/core";

import { CommonModule } from '@angular/common';

import { SwiperItemComponent } from './swiper-item.component';
import { SwiperViewComponent } from './swiper-view.component';

import { SwiperConfig, SwiperConfigInterface} from './swiper.interfaces';

export const SWIPER_CONFIG = new OpaqueToken('SWIPER_CONFIG');

@NgModule({
    imports: [CommonModule],
    declarations: [SwiperItemComponent, SwiperViewComponent],
    exports: [CommonModule, SwiperItemComponent, SwiperViewComponent]
})
export class SwiperModule {
	constructor (@Optional() @SkipSelf() parentModule: SwiperModule) {
    if (parentModule) {
      throw new Error(`SwiperModule is already loaded.
        Import it in the AppModule only!`);
    }
  }

  static forRoot(config: SwiperConfigInterface): ModuleWithProviders {
    return {
      ngModule: SwiperModule,
      providers: [
          {
            provide: SWIPER_CONFIG,
            useValue: config ? config : {}
          },
          {
            provide: SwiperConfig,
            useFactory: provideSwiperConfig,
            deps: [
              SWIPER_CONFIG
            ]
          }
        ]
    };
  }
}

export function provideSwiperConfig(configInterface: SwiperConfigInterface = {}) {
  const config = new SwiperConfig(configInterface);

  return config;
}
