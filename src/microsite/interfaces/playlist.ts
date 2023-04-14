import { MicrositeCarouselConfig } from "./carousel";
import { MicrositeTrackingConfig } from "./tracking";
import { MicrositeVideoConfig } from "./video";

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