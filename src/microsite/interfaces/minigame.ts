import { MicrositeMinigame } from "@microsite/main/minigame/minigame";
import { MicrositeToggleConfig } from "./toggle";
import { MicrositeTrackingConfig } from "./tracking";

export interface MicrositeMinigameConfig {
  popupEl: HTMLDivElement | string;
  toggleEl: HTMLElement | string;
  toggleConfig?: MicrositeToggleConfig;
  onOpen?: (minigame: MicrositeMinigame) => void;
  onClose?: (minigame: MicrositeMinigame) => void;
  tracking?: MicrositeTrackingConfig;
}