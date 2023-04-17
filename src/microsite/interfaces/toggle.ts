import { MicrositeToggle } from "@microsite/main/toggle/toggle";
import { MicrositeTrackingConfig } from "./tracking";

export interface MicrositeToggleConfig {
  onClick?: (event, toggle: MicrositeToggle) => void;
  tracking?: MicrositeTrackingConfig
}