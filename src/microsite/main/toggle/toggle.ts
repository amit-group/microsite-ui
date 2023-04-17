import { MicrositeElement } from "@microsite/core/element";
import { MicrositeToggleConfig } from "@microsite/interfaces/toggle";

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

      this.sendGA(this.trackingConfig?.events?.toggleClick || "Clicked");
    });
  }
}
