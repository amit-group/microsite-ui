import 'jquery';
import { MicrositeTrackingConfig } from "../tracking";
import { MicrositeElement } from "../core";

export interface MicrositeToggleConfig {
  onClick?: (event, toggle: MicrositeToggle) => void;
  tracking?: MicrositeTrackingConfig
}

export class MicrositeToggle extends MicrositeElement {
  id: string;
  element: HTMLElement | NodeListOf<HTMLElement>;
  config: MicrositeToggleConfig;

  constructor(element: HTMLElement | NodeListOf<HTMLElement> | string, config) {
    super();
    this.element = typeof element === "string" ? document.querySelectorAll(element) : element;
    if (this.element && NodeList.prototype.isPrototypeOf(this.element)) {
      (this.element as NodeListOf<HTMLElement>).forEach((el) => {
        if (!el.id) {
          el.id = this.generateID();
        }
      });
    } else {
      if ((this.element as HTMLElement).id) {
        this.id = (this.element as HTMLElement).id;
      } else {
        (this.element as HTMLElement).id = this.id = this.generateID();
      }
    }
    this.config = config;

    this.init();
  }

  init(): void {
    this.initEvents();
  }

  initEvents(): void {
    $(this.element).on("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.config.onClick) {
        this.config.onClick(e, this);
      }

      const target = e.target;

      this.sendGA({
        action: "Clicked",
        target: target.getAttribute('data-name'),
        category: this.trackingConfig?.category || "Engagement",
        label: this.trackingConfig?.label || "General",
        ...(this.trackingConfig?.events?.toggleClick ?? {})
      });
    });
  }
}
export default window.MicrositeToggle = MicrositeToggle;