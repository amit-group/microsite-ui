import { MicrositeCarousel } from "@microsite/main/carousel";
import { MicrositeTrackingConfig } from "./tracking";

export interface MicrositeCarouselConfig {
  delay?: boolean;
  tracking?: Partial<MicrositeTrackingConfig>,
  onClickItem?: (e, item: HTMLElement, carousel: MicrositeCarousel) => void;
  options?: OwlCarousel.Options;
}
