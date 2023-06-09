import 'jquery';
import 'bootstrap';
import { MicrositeElement } from "../core";
import { MicrositeCarousel, MicrositeCarouselConfig } from "../carousel";
import { MicrositeTrackingConfig } from "../tracking";

export interface MicrositeModalGalleryConfig {
  data: MicrositeModalGalleryData[];
  hasMiniThumbnail?: boolean;
  carouselEl?: HTMLDivElement | string;
  carouselConfig?: MicrositeCarouselConfig;
  tracking?: Partial<MicrositeTrackingConfig>;
}

export interface MicrositeModalGalleryData {
  id: string | number;
  title: string;
  description: string;
  images?: string[];
}

export class MicrositeModalGallery extends MicrositeElement {
  id: string;
  name: string;
  element: HTMLDivElement;
  config: MicrositeModalGalleryConfig;

  carouselEl: HTMLDivElement;
  carousel: MicrositeCarousel;

  contentEl: HTMLDivElement;

  get modalEl(): HTMLDivElement {
    return this.element;
  }

  get galleryData(): MicrositeModalGalleryData[] {
    return this.config.data;
  }

  constructor(element: HTMLDivElement, config: MicrositeModalGalleryConfig) {
    super();

    this.element = element;
    this.id = this.element.getAttribute("id") || this.generateID();
    if (this.element.getAttribute("id") === null) {
      this.element.id = this.id;
    }
    this.config = config;

    this.init();
  }

  init(): void {
    this.initElements();
    this.renderData();
    this.initCarousel();
    this.initEvents();
  }

  initElements() {
    if (this.config.carouselEl) {
      this.carouselEl = typeof this.config.carouselEl === "string" ? document.querySelector(this.config.carouselEl) : this.config.carouselEl;
    } else {
      this.carouselEl = document.querySelector(".am-gallery-modal-carousel");
    }
  }

  renderData() {
    const html = this.galleryData
      .map((data, index) => {
        return `
        <div class="item am-gallery-modal-item" data-gallery_id="${data.id}" data-name="Playset ${data.id}" data-index="${index}">
          <div class="am-gallery-modal-item-inner">
            <div class="am-gallery-modal-item-left">
              <div class="am-gallery-modal-image-main">
                <img src="${data.images && data.images.length > 0 ? data.images[0] : `./images/${data.id}/1.png`}" data-index="1" alt="Gallery ${
          data.id
        } - Main" />
              </div>
              <div class="am-gallery-modal-image-list">
                ${
                  data.images && data.images.length > 0
                    ? data.images
                        .map(
                          (image, index) => `
                <div class="am-gallery-modal-image-col">
                  <img src="${image}" data-index="${index}" class="am-gallery-modal-image-thumb ${index == 0 ? "active" : ""}" data-name="${
                            index + 1
                          }" alt="Gallery ${data.id} - ${index}" />
                </div>
                `
                        )
                        .join("\n")
                    : `
                <div class="am-gallery-modal-image-col">
                  <img src="./images/${data.id}/1${this.config.hasMiniThumbnail ? '-mini': ''}.png" data-src="./images/${data.id}/1.png" data-index="1" onerror="this.style.display = 'none'" class="am-gallery-modal-image-thumb active" data-name="1" alt="Gallery ${data.id} - 1" />
                </div>
                <div class="am-gallery-modal-image-col">
                  <img src="./images/${data.id}/2${this.config.hasMiniThumbnail ? '-mini': ''}.png" data-src="./images/${data.id}/2.png" data-index="2" onerror="this.style.display = 'none'" class="am-gallery-modal-image-thumb" data-name="2" alt="Gallery ${data.id} - 2" />
                </div>
                <div class="am-gallery-modal-image-col">
                  <img src="./images/${data.id}/3${this.config.hasMiniThumbnail ? '-mini': ''}.png" data-src="./images/${data.id}/3.png" data-index="3" onerror="this.style.display = 'none'" class="am-gallery-modal-image-thumb" data-name="3" alt="Gallery ${data.id} - 3" />
                </div>
                <div class="am-gallery-modal-image-col">
                  <img src="./images/${data.id}/4${this.config.hasMiniThumbnail ? '-mini': ''}.png" data-src="./images/${data.id}/4.png" data-index="4" onerror="this.style.display = 'none'" class="am-gallery-modal-image-thumb" data-name="4" alt="Gallery ${data.id} - 4" />
                </div>
                `
                }             
              </div>
            </div>
            <div class="am-gallery-modal-item-right">
              <div class="am-gallery-modal-item-infor">
                <h3 class="am-gallery-modal-item-title">${data.title}</div>
                <p class="am-gallery-modal-item-description">${data.description}</div>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("\n");
    this.carouselEl.innerHTML = html;
  }

  initCarousel(): void {
    this.carousel = new MicrositeCarousel(this.carouselEl, {
      ...this.config.carouselConfig,
      tracking: this.config.tracking,
      options: {
        nav: true,
        items: 1,
        responsive: {},
        onChanged: this.onCarouselChanged.bind(this),
        ...(this.config.carouselConfig?.options || {}),
      },
    });
  }

  initEvents(): void {
    this.modalEl.querySelector(".close").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      ($(this.modalEl) as any).modal("hide");
      this.sendGA(this.trackingConfig?.events?.modalClickClose || "Popup Close Clicked");
    });

    const thumbs = $(this.modalEl).find(".am-gallery-modal-image-thumb");
    $(thumbs).on("click", (e) => {
      const thumb = e.currentTarget as HTMLImageElement;
      const name = $(thumb).data("name");
      const mainImg = thumb.parentElement.parentElement.parentElement.querySelector(".am-gallery-modal-image-main img");
      const thumbContainer = thumb.parentElement.parentElement;

      $(mainImg).attr("src", thumb.getAttribute('data-src') ?? thumb.src);
      $($(thumbContainer).find('.am-gallery-modal-image-thumb')).removeClass("active");
      $(thumb).addClass("active");

      this.sendGA(
        this.trackingConfig?.events?.modalClickThumb
          ? {
              ...this.trackingConfig?.events?.modalClickThumb,
              action: this.trackingConfig?.events?.modalClickThumb.action.replace("{name}", name),
            }
          : `Image ${name} Clicked`
      );
    });
  }

  show(id?: number | string) {
    if (id) {
      const item = this.carouselEl.querySelector(`[data-gallery_id="${id}"]`);
      const index = item.getAttribute("data-index") || "0";
      this.carousel.moveToIndex(parseInt(index));
    }

    ($(this.modalEl) as any).modal("show");
  }

  hide() {
    ($(this.modalEl) as any).modal("hide");
  }

  onCarouselChanged(e) {
    if (this.carousel) {
      this.carousel.removeNavDisabledClass();

      const currentIndex = e.relatedTarget.current();
      const currentSlide = this.carousel.getItemByIndex(currentIndex);
      const currentItem = currentSlide.querySelector(".am-gallery-modal-item");

      this.modalEl.setAttribute("data-name", $(currentItem).data("name"));
    }
  }
}

export default window.MicrositeModalGallery = MicrositeModalGallery;