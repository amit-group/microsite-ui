import { MicrositeToggle } from "@microsite/main/toggle/toggle";
import { MicrositeTrackingConfig } from "./general";

export interface MicrositeToggleConfig {
  onClick: (event, toggle: MicrositeToggle) => void;
  tracking: MicrositeTrackingConfig
}