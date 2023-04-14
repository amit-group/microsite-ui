import { MicrositeElement } from "@microsite/core/element";
import { MicrositeToggleConfig } from "@microsite/interfaces/toggle";

export class MicrositeToggle extends MicrositeElement {
  id: string;
  element: HTMLElement | NodeListOf<HTMLElement>;
  config: MicrositeToggleConfig;

  constructor(element: HTMLElement | NodeListOf<HTMLElement> | string, config) {
    super();
    this.element = typeof element === "string" ? document.querySelectorAll(element) : element;
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

      this.sendGA(this.trackingConfig?.events?.toggleClick || "Clicked");
    });
  }
}
