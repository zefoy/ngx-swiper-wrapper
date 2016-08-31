export interface SwiperConfigInterface {
  direction?: string,
  autoHeight?: boolean,
  pagination?: boolean,
  slidesPerView?: number,
  arrowKeysEnabled?: boolean,
  mousewheelControl?: boolean
}

export class SwiperConfig implements SwiperConfigInterface {
  direction: string;
  autoHeight: boolean;
  pagination: boolean;
  slidesPerView: number;
  arrowKeysEnabled: boolean;
  mousewheelControl: boolean;

  constructor(config: SwiperConfigInterface = {}) {
     this.assign(config);
   }

   public assign(config: SwiperConfigInterface = {}) {
     for (var key in config) {
       this[key] = config[key];
     }
   }
}
