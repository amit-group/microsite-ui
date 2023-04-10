import { MicrositeCarousel } from "@microsite/main/carousel";
import { MicrositeTrackingConfig } from "./general";

export interface MicrositeCarouselConfig {
  delay?: boolean;
  tracking?: MicrositeTrackingConfig;
  onClickItem?: (e, item: HTMLElement, carousel: MicrositeCarousel) => void;
  options?: OwlCarousel.Options;
}
