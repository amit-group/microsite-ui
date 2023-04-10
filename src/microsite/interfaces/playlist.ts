import { MicrositeCarouselConfig } from "./carousel";
import { MicrositeTrackingConfig } from "./general";
import { MicrositeVideoConfig } from "./video";

export interface MicrositePlaylistConfig {
  carouselEl?: HTMLDivElement;
  carouselConfig?: MicrositeCarouselConfig;
  
  videoEl: HTMLVideoElement;
  videoConfig: MicrositeVideoConfig;

  toggleEl?: HTMLElement | NodeListOf<HTMLElement>;

  tracking?: MicrositeTrackingConfig;
}

export interface MicrositePlaylistToggleConfig {
  tracking?: MicrositeTrackingConfig;
}