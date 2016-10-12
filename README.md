# Angular 2 Swiper Wrapper

<a href="https://badge.fury.io/js/angular2-swiper-wrapper"><img src="https://badge.fury.io/js/angular2-swiper-wrapper.svg" align="right" alt="npm version" height="18"></a>

This is an Angular 2 wrapper library for [swiper](http://idangero.us/swiper/).

See a live example application <a href="https://zefoy.github.io/angular2-swiper-wrapper/">here</a>.

### Building the library

    npm install
    npm run build

### Running the example

    cd example
    npm install
    npm start

### Installing and usage

    npm install angular2-swiper-wrapper --save-dev

##### Load the module for your app (with global configuration):

```javascript
import { SwiperModule } from 'angular2-swiper-wrapper';
import { SwiperConfigInterface } from 'angular2-swiper-wrapper';

const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  keyboardControl: true
};

@NgModule({
  ...
  imports: [
    ...
    SwiperModule.forRoot(SWIPER_CONFIG,)
  ]
})
```

##### Use it in your html template (with custom configuration):

```html
  <swiper-view [config]="config" (onSwiperIndex)="onSwiperIndex($event)">
    <swiper-item>
      Swiper content
    </swiper-item>
  </swiper-view>
```

```javascript
[config]          // Custom config to override the global defaults.

(onSwiperIndex)   // Event handler for the swiper index change.
```

##### Available configuration options (custom / global configuration):

```javascript
keyboardControl   // Enables navigation through arrow keys (Default: false).

```

For more detailed documentation with all the supported options see [swiper documentation](http://idangero.us/swiper/api/).
