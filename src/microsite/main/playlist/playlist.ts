import { MicrositePlaylistConfig, MicrositePlaylistToggleConfig } from "@microsite/interfaces/playlist";
import { MicrositeVideo } from "../video";
import { MicrositeCarousel } from "../carousel";
import { MicrositeVideoConfig } from "@microsite/interfaces/video";
import { MicrositeCarouselConfig } from "@microsite/interfaces/carousel";
import { TrackingUtils } from "@microsite/utils/tracking";

export class MicrositePlaylist {
  element: HTMLElement;
  config: MicrositePlaylistConfig;
  carousel: MicrositeCarousel;
  carouselEl: HTMLDivElement;
  carouselConfig: MicrositeCarouselConfig;

  video: MicrositeVideo;
  videoEl: HTMLVideoElement;
  videoConfig: MicrositeVideoConfig;

  toggleEl: HTMLElement | NodeListOf<HTMLElement>;
  toggleConfig: MicrositePlaylistToggleConfig;

  constructor(config: MicrositePlaylistConfig) {
    this.config = config;
    this.carouselEl = config.carouselEl;
    this.videoEl = config.videoEl;
    this.toggleEl = config.toggleEl;

    this.carouselConfig = {
      ...(config.carouselConfig || {}),
      ...{
        onClickItem: this.onClickToggle.bind(this),
      },
    };

    this.videoConfig = config.videoConfig || {};

    this.init();
  }

  init(): void {
    this.video = new MicrositeVideo(this.config.videoEl, this.videoConfig);

    if (this.carouselEl) {
      this.carousel = new MicrositeCarousel(this.config.carouselEl, this.carouselConfig);
    }
    if (this.toggleEl ,NodeList.prototype.isPrototypeOf(this.toggleEl)) {
      if (NodeList.prototype.isPrototypeOf(this.toggleEl)) {
        (this.toggleEl as NodeListOf<HTMLElement>).forEach((item) => {
          item.addEventListener("click", (e) => {
            this.onClickToggle(e, item, true);
          });
        });
      } else {
        (this.toggleEl as HTMLElement).addEventListener("click", (e) => {
          this.onClickToggle(e, this.toggleEl, true);
        });
      }
    }
  }

  onClickToggle(e, item, isToggle = false) {
    const src = item.getAttribute('data-src');
    const name = item.getAttribute('data-video-name');
    this.video.changeSource(src, name);

    if(isToggle && this.toggleConfig.tracking) {
      TrackingUtils.SendGA(`${item.getAttribute('data-name')} Clicked`, this.toggleConfig.tracking.label, this.toggleConfig.tracking.category);
    }
  }

  initCarousel(): void {
    // $(this.element)
  }

  initEvents(): void {}
}
