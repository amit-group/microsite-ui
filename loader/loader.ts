export interface MicrositeLoaderConfig {
  timeout: number; // milliseconds
  animationDuration: number; // milliseconds
}

export class MicrositeLoader {
  element: HTMLElement;
  config: MicrositeLoaderConfig;
  hiddenEvent: CustomEvent;

  constructor(element, config) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.config = config || {};
    this.init();
  }

  init() {
    this.initStyles();
    this.initEvents();
    this.hideLoader();
  }

  initStyles() {
    this.element.style.transitionDuration = `${this.config.animationDuration || 1000}ms`;
  }

  initEvents() {
    this.hiddenEvent = new CustomEvent("loader.hidden");
  }

  hideLoader() {
    setTimeout(() => {
      this.element.style.opacity = '0';
      this.element.addEventListener('transitionend', (e) => {
        this.element.remove();
        window.dispatchEvent(this.hiddenEvent);
      });
    }, this.config.timeout || 1000);
  }
}

export default window.MicrositeLoader = MicrositeLoader;