import { MicrositeTrackingConfig, MicrositeTrackingData, MicrositeTrackingEvents } from "../tracking/tracking";
import { TrackingUtils } from "../tracking";

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
        const eventName = this.trackingConfig?.eventName || "select_content";
        TrackingUtils.SendGA(`${target} ${action}`.trim(), label, category, eventName);
      } else {
        const data = actionOrData;
        const action = data.action ?? "Clicked";
        const target = data.target ?? this.element?.getAttribute('data-name') ?? "";
        const category = data.category ?? (this.trackingConfig?.category || "Engagement");
        const label = data.label ?? (this.trackingConfig?.label || "General");
        const eventName = data.eventName ?? "select_content";
        TrackingUtils.SendGA(`${target} ${action}`.trim(), label, category, eventName);
      }
      
    }
  }

  generateID() {
    return `${this.constructor.name}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default window.MicrositeElement = MicrositeElement;
