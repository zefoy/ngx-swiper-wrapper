# Angular Swiper Wrapper

<a href="https://badge.fury.io/js/ngx-swiper-wrapper"><img src="https://badge.fury.io/js/ngx-swiper-wrapper.svg" align="right" alt="npm version" height="18"></a>

This is an Angular wrapper library for the [Swiper](http://idangero.us/swiper/).

See a live example application <a href="https://zefoy.github.io/ngx-swiper-wrapper/">here</a>.

### Building the library

```bash
npm install
npm run build
```

### Running the example

```bash
cd example
npm install
npm start
```

### Installing and usage

```bash
npm install ngx-swiper-wrapper@4.7.0 --save
```

##### Load the module for your app (with global configuration):

```javascript
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

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

This library provides two ways to create a Swiper element, simple component and custom directive.

**COMPONENT USAGE**

Simply replace the element that would oridinarily be passed to `Swiper` with the swiper component.

**NOTE:** Component provides default elements for scroller, pagination, prevButton and nextButton which you can enable by setting
the apropriate configuration to 'true' (or to default swiper class). If you want to use custom components then you need use custom classes or preferably use the directive.

```html
<swiper [config]="config" [(index)]="index">
  <div>
    Swiper content
  </div>
</swiper>
```

```javascript
[index]             // Can be used to set the active slide index.
[config]            // Custom config to override the global defaults.
[disabled]          // Disables changing of slides (locks the swiper).

[useSwiperClass]    // Use swiper class (needed by the default styles).

[runInsideAngular]  // Run swiper function calls inside the angular zone.

(indexChange)       // Event handler for the swiper index change event.

(<swiper-event>)    // All swiper events / callbacks work as bindings.
                    // Conflicting events are prefixed with 'swiper':
                    // click, tap, doubleTap, touch*, transition*
```

**DIRECTIVE USAGE**

When using only the directive you need to provide your own theming or import the default theme:

```css
@import 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.4.0/css/swiper.min.css';
```

Swiper directive can be used in correctly structured div element with optional custom configuration:

```html
<div  class="swiper-container" [swiper]="config" [(index)]="index">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      Swiper content
    </div>
  </div>

  <div class="swiper-scrollbar"></div>

  <div class="swiper-pagination"></div>

  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```

```javascript
[index]             // Can be used to set the active slide index.
[swiper]            // Can be used to provide optional custom config.
[disabled]          // Disables changing of slides (locks the swiper).

[useSwiperClass]    // Use swiper class (needed by the default styles).

[runInsideAngular]  // Run swiper function calls inside the angular zone.

(indexChange)       // Event handler for the swiper index change event.

(<swiper-event>)    // All swiper events / callbacks work as bindings.
                    // Conflicting events are prefixed with 'swiper':
                    // click, tap, doubleTap, touch*, transition*
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

For more detailed documentation with all the supported events / options see [swiper documentation](https://github.com/nolimits4web/Swiper/blob/Swiper3/API.md).

##### Available control / helper functions (provided by the directive):

```javascript
update(updateTranslate)           // Updates Swiper elements / classes /etc.

getIndex()                        // Returns the current Swiper slide index.
setIndex(index, speed?, silent?)  // Runs transition to slide with given index.

nextSlide(speed?, silent?)        // Runs transition to the next slide index.
prevSlide(speed?, silent?)        // Runs transition to the previous slide index.

stopAutoplay(reset?)              // Stops and optionally resets the autoplay.
startAutoplay(reset?)             // Starts and optionally resets the autoplay.
```

Above functions can be accessed through the directive reference (available as directiveRef in the component).
