import { MicrositeCarouselConfig } from "@microsite/interfaces/carousel";
import { MicrositeElement } from "@microsite/core/element";
import angleLeft from "../../assets/images/angle_left.png";
import angleRight from "../../assets/images/angle_right.png";

export const MicrositeCarouselDefaultConfig: MicrositeCarouselConfig = {
  delay: false,
  tracking: {
    label: "Playlist",
    category: "Engagement",
  },
  options: {
    loop: true,
    margin: 15,
    autoplay: false,
    autoplayTimeout: 5000,
    nav: true,
    navText: [`<img src="${angleLeft}" alt="" />`, `<img src="${angleRight}" alt="" />`],
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
      993: {
        items: 3,
      },
    },
  },
};

export class MicrositeCarousel extends MicrositeElement {
  id: string;
  config: MicrositeCarouselConfig;
  element: HTMLElement;
  $carousel: any;

  constructor(element, config: MicrositeCarouselConfig = {}) {
    super();
    this.element = element;
    this.id = this.element.getAttribute("id") || this.generateID();
    if (this.element.getAttribute("id") === null) {
      this.element.id = this.id;
    }
    this.config = {
      ...MicrositeCarouselDefaultConfig,
      ...config,
      options: { ...MicrositeCarouselDefaultConfig.options, ...(config.options ? config.options : {}) },
    };
    this.init();
  }

  init(): void {
    this.initCarousel();
  }

  initCarousel(): void {
    const options = {
      onInitialized: this.onInitialized.bind(this),
      onChanged: this.onChanged.bind(this),
      ...this.config.options,
    };
    this.$carousel = $(this.element).owlCarousel(options);
  }

  onInitialized(e) {
    this.removeNavDisabledClass();
    this.initEvents();
  }

  onChanged(e) {
    this.removeNavDisabledClass();
  }

  removeNavDisabledClass() {
    if (this.config.options.nav && $(this.element).find(".owl-nav.disabled").length > 0) {
      $(this.element).find(".owl-nav").removeClass("disabled");
    }
  }

  initEvents(): void {
    const $items = $(this.element).find(".item");

    $items.on("click", (e) => {
      if (this.config.onClickItem) {
        this.config.onClickItem(e, e.currentTarget, this);
      }

      if (!this.element.classList.contains("am-gallery-modal-carousel")) {
        this.sendGA(
          this.trackingConfig?.events?.carouselClickItem
            ? {
                ...this.trackingConfig?.events?.carouselClickItem,
                action: this.trackingConfig?.events?.carouselClickItem.action.replace("{name}", e.currentTarget.getAttribute("data-name")),
              }
            : `${e.currentTarget.getAttribute("data-name")} Item Clicked`
        );
      }
    });

    if (this.config.options.nav) {
      const $next = $(this.element).find(".owl-nav .owl-next");
      const $prev = $(this.element).find(".owl-nav .owl-prev");

      $next.on("click", (e) => {
        this.sendGA(this.trackingConfig?.events?.carouselClickNext || `Right Arrow Clicked`);
      });

      $prev.on("click", (e) => {
        this.sendGA(this.trackingConfig?.events?.carouselClickPrev || `Left Arrow Clicked`);
      });
    }
  }

  getItemByIndex(index: number) {
    return $(this.element).find(".owl-item")[index];
  }

  moveToIndex(index: number) {
    $(this.element).trigger("to.owl.carousel", index);
  }
}
