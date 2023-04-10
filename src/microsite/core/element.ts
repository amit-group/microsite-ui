import { MicrositeTrackingConfig } from "@microsite/interfaces/general";
import { TrackingUtils } from "../utils/tracking";

export abstract class MicrositeElement {
  abstract id: string;
  abstract name: string;
  abstract element: HTMLElement;
  abstract config: any;

  abstract init(): void;
  abstract initEvents(): void;

  get trackingConfig(): MicrositeTrackingConfig {
    return this.config.tracking;
  }

  get dataName(): string {
    return this.element.getAttribute('data-name') || 'Unknown';
  }

  sendGA(action: string, customName?: string, customLabel?: string, customCategory?:string) {
    if (this.trackingConfig) {
      const name = customName || this.element.getAttribute('data-name');
      const category = customCategory || this.trackingConfig?.category || "Engagement";
      const label = customLabel || this.trackingConfig?.label || "General";
      TrackingUtils.SendGA(`${name} ${action}`, label, category);
    }
  }

  generateID() {
    return `${this.element.tagName.toLowerCase()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
