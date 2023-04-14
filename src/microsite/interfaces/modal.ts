import { MicrositeCarouselConfig } from "./carousel";
import { MicrositeTrackingConfig } from "./tracking";

export interface MicrositeModalGalleryConfig {
  data: MicrositeModalGalleryData[];
  carouselEl?: HTMLDivElement | string;
  carouselConfig?: MicrositeCarouselConfig;  
  tracking?: Partial<MicrositeTrackingConfig>
}

export interface MicrositeModalGalleryData {
  id: string | number;
  title: string;
  description: string;
  images?: string[]
}