import { MicrositeGalleryConfig } from "@microsite/interfaces/gallery";
import { MicrositeCarousel } from "../carousel";
import { MicrositeModalGallery } from "../modal";
import { MicrositeToggle } from "../toggle";

export class MicrositeGallery {
  config: MicrositeGalleryConfig;

  carousel: MicrositeCarousel;

  modal: MicrositeModalGallery;

  toggle: MicrositeToggle;

  constructor(config: MicrositeGalleryConfig) {
    this.config = config;
    this.init();
  }

  init() {
    this.initModal();
    this.initCarousel();
    this.initToggle();
  }

  initModal() {
    const modalEl = typeof this.config.modalEl === "string" ? (document.querySelector(this.config.modalEl) as HTMLDivElement) : this.config.modalEl;
    this.modal = new MicrositeModalGallery(modalEl, { tracking: this.config.tracking, ...this.config.modalConfig });
  }

  initCarousel() {
    if (this.config.carouselEl) {
      const carouselEl =
        typeof this.config.carouselEl === "string" ? (document.querySelector(this.config.carouselEl) as HTMLDivElement) : this.config.carouselEl;

      this.carousel = new MicrositeCarousel(carouselEl, {
        ...this.config.carouselConfig,
        onClickItem: this.onClickToggle.bind(this),
      });
    }
  }

  initToggle() {
    if(this.config.toggleEl) {
      this.toggle = new MicrositeToggle(this.config.toggleEl, {
        ...{tracking: this.config.tracking },
        ...(this.config.toggleConfig || {}),
        ...{ onClick: this.onClickToggle.bind(this) }
      })
    }
  }

  onClickToggle(e) {
    const galleryId = e.currentTarget.getAttribute('data-gallery_id');
    this.modal.show(galleryId);
  }
}
