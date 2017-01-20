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
  slidesPerView: 'auto',
  keyboardControl: true
};

@NgModule({
  ...
  imports: [
    ...
    SwiperModule.forRoot(SWIPER_CONFIG)
  ]
})
```

##### Use it in your html template (with custom configuration):

```html
  <swiper [config]="config" (indexChange)="onIndexChange($event)">
    <div>
      Swiper content
    </div>
  </swiper>
```

```javascript
[config]            // Custom config to override the global defaults.

(indexChange)       // Event handler for the swiper index change event.

[runInsideAngular]  // Run Swiper initialization inside the angular zone.
```

##### Available configuration options (custom / global configuration):

```javascript
direction           // Direction of the swiper (Default: 'horizontal').
threshold           // Distance needed for the swipe action (Default: 0).
spaceBetween        // Space in pixels between the swiper items (Default: 0).
slidesPerView       // Number of the items per view or 'auto' (Default: 1).
centeredSlides      // Align active item on center not left (Default: false).
keyboardControl     // Enables navigation through arrow keys (Default: false).
```

For more detailed documentation with all the supported options see [swiper documentation](http://idangero.us/swiper/api/).
