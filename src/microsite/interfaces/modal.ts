import { MicrositeCarouselConfig } from "./carousel";
import { MicrositeTrackingConfig } from "./general";

export interface MicrositeModalGalleryConfig {
  data: MicrositeModalGalleryData[];
  carouselEl?: HTMLDivElement | string;
  carouselConfig?: MicrositeCarouselConfig;  
  tracking?: MicrositeTrackingConfig
}

export interface MicrositeModalGalleryData {
  id: string | number;
  title: string;
  description: string;
  images?: string[]
}