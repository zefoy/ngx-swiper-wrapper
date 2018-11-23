# Angular Swiper Wrapper

<a href="https://badge.fury.io/js/ngx-swiper-wrapper"><img src="https://badge.fury.io/js/ngx-swiper-wrapper.svg" align="right" alt="npm version" height="18"></a>

This is an Angular wrapper library for the [Swiper](http://idangero.us/swiper/). To use this library you should get familiar with the Swiper documentation as well since this documentation only explains details specific to this wrapper.

This documentation is for the latest 6.x.x version which requires Angular 5 or newer. For Angular 4 you need to use the latest 4.x.x version. Documentation for the 4.x.x can be found from <a href="https://github.com/zefoy/ngx-swiper-wrapper/tree/4.x.x/">here</a>.

### Quick links

[Example application](https://zefoy.github.io/ngx-swiper-wrapper/)
 |
[StackBlitz example](https://stackblitz.com/github/zefoy/ngx-swiper-wrapper/tree/master/example)
 |
[Swiper documentation](http://idangero.us/swiper/api/)

### Building the library

```bash
npm install
npm start
```

### Running the example

```bash
cd example
npm install
npm start
```

### Library development

```bash
npm link
cd example
npm link ngx-swiper-wrapper
```

### Installing and usage

```bash
npm install ngx-swiper-wrapper --save
```

##### Load the module for your app (with global configuration):

Providing the global configuration is optional and when used you should only provide the configuration in your root module.

```javascript
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  ...
  imports: [
    ...
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
```

##### Use it in your HTML template (with custom configuration):

This library provides two ways to create a Swiper element, component for simple use cases and directive for more custom use cases.

**COMPONENT USAGE**

Simply replace the element that would ordinarily be passed to `Swiper` with the swiper component.

**NOTE:** Component provides default elements for the scrollbar, navigation and pagination which you can enable by setting the appropriate configuration to 'true' or by using the default selector. If you want to use custom elements then you might want to use the directive instead.

```html
<swiper [config]="config" [(index)]="index">
  <div>
    Swiper slide content
  </div>
</swiper>
```

```javascript
[config]                // Custom config to override the global defaults.

[index]                 // Can be used to set the active slide index.
[disabled]              // Disables changing of slides (locks the Swiper).

[useSwiperClass]        // Use 'swiper' class (use provided default styles).

(indexChange)           // Event handler for the Swiper index change event.

(<swiperEvent>)         // All Swiper events / callbacks work as bindings.
                        // Conflicting events are prefixed with 'swiper':
                        // click, tap, doubleTap, touch*, transition*
                        // Example: touchStart -> swiperTouchStart
```

**DIRECTIVE USAGE**

When using only the directive you need to provide your own theming or import the default theme:

```css
@import '~swiper/dist/css/swiper.min.css';
```

Swiper directive can be used in correctly structured div element with optional custom configuration:

```html
<div  class="swiper-container" [swiper]="config" [(index)]="index">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      Swiper slide content
    </div>
  </div>

  <div class="swiper-scrollbar"></div>
  <div class="swiper-pagination"></div>

  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```

```javascript
[swiper]                // Can be used to provide optional custom config.

[index]                 // Can be used to set the active slide index.
[disabled]              // Disables changing of slides (locks the Swiper).
[performance]           // Emit all Swiper events outside the Angular zone.

(indexChange)           // Event handler for the Swiper index change event.

(<swiperEvent>)         // All Swiper events / callbacks work as bindings.
                        // Conflicting events are prefixed with 'swiper':
                        // click, tap, doubleTap, touch*, transition*
                        // Example: touchStart -> swiperTouchStart
```

##### Available configuration options (custom / global configuration):

This library supports all Swiper configuration options and few extra options for easier usage.

```javascript
observer                // Set to to true to enable automatic update calls.
direction               // Direction of the Swiper (Default: 'horizontal').
threshold               // Distance needed for the swipe action (Default: 0).
spaceBetween            // Space in pixels between the Swiper items (Default: 0).
slidesPerView           // Number of the items per view or 'auto' (Default: 1).
centeredSlides          // Align active item on center not left (Default: false).
```

For more detailed documentation with all the supported events / options see the Swiper documentation.

##### Available control / helper functions (provided by the directive):

```javascript
swiper()                          // Returns reference to the Swiper instance.

init()                            // Starts Swiper (when init set to false).
update()                          // Updates Swiper elements / classes / etc.

getIndex(real?)                   // Returns the active or real slide index.
setIndex(index, speed?, silent?)  // Runs transition to slide with given index.

nextSlide(speed?, silent?)        // Runs transition to the next slide index.
prevSlide(speed?, silent?)        // Runs transition to the previous slide index.

stopAutoplay(reset?)              // Stops and optionally resets the autoplay.
startAutoplay(reset?)             // Starts and optionally resets the autoplay.
```

Above functions can be accessed through the directive reference (available as directiveRef in the component).
