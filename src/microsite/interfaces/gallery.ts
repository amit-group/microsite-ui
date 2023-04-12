import { MicrositeCarouselConfig } from "./carousel";
import { MicrositeTrackingConfig } from "./general";
import { MicrositeModalGalleryConfig } from "./modal";

export interface MicrositeGalleryConfig {
  carouselEl?: HTMLDivElement | string;
  carouselConfig?: MicrositeCarouselConfig;
  modalEl: HTMLDivElement | string;
  modalConfig: MicrositeModalGalleryConfig;
  toggleEl?: HTMLElement | NodeListOf<HTMLElement> | string;
  toggleConfig?: any;
  tracking?: MicrositeTrackingConfig
}