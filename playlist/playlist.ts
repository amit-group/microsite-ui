import { MicrositeCarousel, MicrositeCarouselConfig } from "../carousel";
import { MicrositeElement } from "../core/element";
import { MicrositeVideoConfig } from "../video";
import { MicrositeVideo } from "../video";
import { MicrositeTrackingConfig } from "../tracking";

export interface MicrositePlaylistConfig {
  carouselEl?: HTMLDivElement;
  carouselConfig?: MicrositeCarouselConfig;
  
  videoEl: HTMLVideoElement;
  videoConfig?: MicrositeVideoConfig;

  toggleEl?: HTMLElement | NodeListOf<HTMLElement>;
  toggleConfig?: MicrositePlaylistToggleConfig;

  tracking?: Partial<MicrositeTrackingConfig>;
}

export interface MicrositePlaylistToggleConfig {
  tracking?: Partial<MicrositeTrackingConfig>;
}

export class MicrositePlaylist extends MicrositeElement {
  id: string;
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
    super();
    this.config = config;
    this.carouselEl = config.carouselEl;
    this.videoEl = config.videoEl;
    this.toggleEl = config.toggleEl;

    this.carouselConfig = {
      ...(config.carouselConfig || {}),
      ...{
        onClickItem: this.onClickToggle.bind(this),
      },
      ...{
        tracking: {
          ...(config.tracking || {}),
          ...(config.carouselConfig?.tracking || {}),
        },
      },
    };

    this.videoConfig = {
      ...(config.videoConfig || {}),
      ...{
        tracking: {
          ...(config.tracking || {}),
          ...(config.videoConfig?.tracking || {}),
        },
      },
    };
    this.toggleConfig = {
      ...(config.toggleConfig || {}),
      ...{
        tracking: {
          ...(config.tracking || {}),
          ...(config.toggleConfig?.tracking || {}),
        },
      },
    };

    this.init();
  }

  init(): void {
    this.video = new MicrositeVideo(this.config.videoEl, this.videoConfig);

    if (this.carouselEl) {
      this.carousel = new MicrositeCarousel(this.config.carouselEl, this.carouselConfig);
    }
    if ((this.toggleEl, NodeList.prototype.isPrototypeOf(this.toggleEl))) {
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
    const src = item.getAttribute("data-src");
    const name = item.getAttribute("data-video-name");
    this.video.changeSource(src, name);

    console.log(e, item, isToggle, this.toggleConfig);

    if (isToggle && this.toggleConfig.tracking) {
      this.sendGA(
        this.trackingConfig?.events?.toggleClick
          ? {
              ...this.trackingConfig?.events?.toggleClick,
              action: this.trackingConfig?.events?.toggleClick.action.replace("{name}", item.getAttribute("data-name")),
            }
          : {
              action: `${item.getAttribute("data-name")} Clicked`,
              target: "",
              label: this.toggleConfig.tracking.label,
              category: this.toggleConfig.tracking.category,
            }
      );
    }
  }

  initCarousel(): void {
    // $(this.element)
  }

  initEvents(): void {}
}

export default window.MicrositePlaylist = MicrositePlaylist;