import { MicrositeToggleConfig } from "@microsite/interfaces/toggle";
import { MicrositeToggle } from "../toggle";
import { MicrositeMinigameConfig } from "@microsite/interfaces/minigame";
import { MicrositeTrackingData } from "@microsite/interfaces/tracking";
import { TrackingUtils } from "@microsite/utils/tracking";

export class MicrositeMinigame {
  config: MicrositeMinigameConfig;

  popupEl: HTMLDivElement;

  toggle: MicrositeToggle;

  get toggleEl() {
    return this.config.toggleEl;
  }

  get toggleConfig() {
    return this.config.toggleConfig;
  }

  get trackingConfig() {
    return this.config.tracking;
  }

  constructor(config: MicrositeMinigameConfig) {
    this.config = config;  
    this.popupEl = typeof this.config.popupEl  === 'string' ? document.querySelector(this.config.popupEl) : this.config.popupEl;
    this.toggle = new MicrositeToggle(this.toggleEl, {
      ...this.toggleConfig || {},
      onClick: this.onClickToggle.bind(this),
      ...{
        tracking: {
          ...this.config.tracking || {},
          ...this.toggleConfig.tracking || {}
        }
      }
    });
    this.initEvents();
  }

  onClickToggle(e, toggle) {
    this.showPopup();
  }

  showPopup() {
    document.querySelectorAll('video').forEach(function(videoEl: HTMLVideoElement) {
      videoEl.pause();
    });
    this.popupEl.classList.add('show');
    document.body.classList.add('popup');
    const iframe = this.popupEl.querySelector('iframe');
    iframe.setAttribute('src', iframe.getAttribute('data'));
    if(this.config.onOpen){
      this.config.onOpen(this);
    }
  }

  hidePopup() {
    this.popupEl.classList.remove('show');
    document.body.classList.remove('popup');
    if(this.config.onClose) {
      this.config.onClose(this);
    }
  }

  initEvents() {
    const popupClose = this.popupEl.querySelector('.popup-close');
    if(popupClose) {
      popupClose.addEventListener('click', () => {
        this.hidePopup();
        this.sendGA({
          action: "Clicked",
          target: popupClose.getAttribute("data-name"),
          category: this.trackingConfig.category || "Engagement",
          label: this.trackingConfig.label || "Minigame"
        });
      });
    }
    
  }

  sendGA(actionOrData: MicrositeTrackingData): void {
    if (this.trackingConfig) {
      const data = actionOrData;
      const action = data.action ?? "Clicked";
      const target = data.target ?? "";
      const category = data.category ?? (this.trackingConfig?.category || "Engagement");
      const label = data.label ?? (this.trackingConfig?.label || "General");
      TrackingUtils.SendGA(`${target} ${action}`.trim(), label, category);
    }
  }

}