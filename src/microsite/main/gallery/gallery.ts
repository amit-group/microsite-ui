import { MicrositeGalleryConfig } from "@microsite/interfaces/gallery";
import { MicrositeCarousel } from "../carousel";
import { MicrositeModalGallery } from "../modal";
import { MicrositeToggle } from "../toggle";
import { MicrositeElement } from "@microsite/core/element";
import { MicrositeCarouselConfig } from "@microsite/interfaces/carousel";
import { MicrositeModalGalleryConfig } from "@microsite/interfaces/modal";
import { MicrositeToggleConfig } from "@microsite/interfaces/toggle";

export class MicrositeGallery extends MicrositeElement {
  id: string;
  element: HTMLElement;

  config: MicrositeGalleryConfig;

  carousel: MicrositeCarousel;
  carouselConfig: MicrositeCarouselConfig;

  modal: MicrositeModalGallery;
  modalConfig: MicrositeModalGalleryConfig;

  toggle: MicrositeToggle;
  toggleConfig: MicrositeToggleConfig;

  constructor(config: MicrositeGalleryConfig) {
    super();
    this.config = config;
    this.carouselConfig = {
      ...(config.carouselConfig || {}),
      ...{
        tracking: {
          ...(config.tracking || {}),
          ...(config.carouselConfig.tracking || {}),
        },
      },
      onClickItem: this.onClickToggle.bind(this),
    };
    this.modalConfig = {
      ...(config.modalConfig || {}),
      ...{
        tracking: {
          ...(config.tracking || {}),
          ...(config.modalConfig.tracking || {}),
        },
      },
      
    } as MicrositeModalGalleryConfig;
    this.toggleConfig = {
      ...(config.toggleConfig || {}),
      ...{
        tracking: {
          ...(config.tracking || {}),
          ...(config.toggleConfig.tracking || {}),
        },
      },
      ...{ onClick: this.onClickToggle.bind(this) },
    };

    this.init();
  }

  init() {
    this.initModal();
    this.initCarousel();
    this.initToggle();
    this.initEvents();
  }

  initModal() {
    const modalEl = typeof this.config.modalEl === "string" ? (document.querySelector(this.config.modalEl) as HTMLDivElement) : this.config.modalEl;
    this.modal = new MicrositeModalGallery(modalEl, this.modalConfig);
  }

  initCarousel() {
    if (this.config.carouselEl) {
      const carouselEl =
        typeof this.config.carouselEl === "string" ? (document.querySelector(this.config.carouselEl) as HTMLDivElement) : this.config.carouselEl;

      this.carousel = new MicrositeCarousel(carouselEl, this.carouselConfig);
    }
  }

  initToggle() {
    if (this.config.toggleEl) {
      this.toggle = new MicrositeToggle(this.config.toggleEl, this.toggleConfig);
    }
  }

  initEvents(): void {}

  onClickToggle(e) {
    const galleryId = e.currentTarget.getAttribute("data-gallery_id");
    this.modal.show(galleryId);
  }
}
