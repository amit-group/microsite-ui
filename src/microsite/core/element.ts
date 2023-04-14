import { MicrositeTrackingConfig, MicrositeTrackingData, MicrositeTrackingEvents } from "@microsite/interfaces/tracking";
import { TrackingUtils } from "../utils/tracking";

export abstract class MicrositeElement {
  abstract id: string;
  abstract element: any;
  abstract config: any;

  abstract init(): void;
  abstract initEvents(): void;

  get trackingConfig(): MicrositeTrackingConfig {
    return this.config.tracking;
  }

  get trackingEvents(): Partial<MicrositeTrackingEvents> {
    return this.trackingConfig.events;
  }

  get dataName(): string {
    return this.element.getAttribute('data-name') || 'Unknown';
  }
  
  sendGA(actionOrData: string | MicrositeTrackingData): void {
    if (this.trackingConfig) {
      if(typeof actionOrData === 'string') {
        const action = actionOrData;
        const target = this.element.getAttribute('data-name');
        const category = this.trackingConfig?.category || "Engagement";
        const label = this.trackingConfig?.label || "General";
        TrackingUtils.SendGA(`${target} ${action}`.trim(), label, category);
      } else {
        const data = actionOrData;
        const action = data.action ?? "Clicked";
        const target = data.target ?? this.element?.getAttribute('data-name') ?? "";
        const category = data.category ?? (this.trackingConfig?.category || "Engagement");
        const label = data.label ?? (this.trackingConfig?.label || "General");
        TrackingUtils.SendGA(`${target} ${action}`.trim(), label, category);
      }
      
    }
  }

  generateID() {
    return `${this.constructor.name}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
