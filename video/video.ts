import {
  MicrositeVideoPlayControl,
  MicrositeVideoSoundOffControl,
  MicrositeVideoSoundOnControl,
  MicrositeVideoReplayControl,
} from "./video-controls";
import { MicrositeElement } from "../core/element";
import { MicrositeTrackingConfig } from "../tracking";

declare global {
  interface Navigator {
    msMaxTouchPoints: number;
  }
}

export interface MicrositeVideoConfig {
  customControl?:
    | boolean
    | {
        play?: boolean | { image: any };
        soundOff?: boolean | { image: any };
        soundOn?: boolean | { image: any };
        replay?: boolean | { image: any };
      };
  tracking?: Partial<MicrositeTrackingConfig>;
}

export class MicrositeVideo extends MicrositeElement {
  id: string;
  element: HTMLVideoElement;
  container: HTMLDivElement;
  config: MicrositeVideoConfig;
  controls?: {
    play: MicrositeVideoPlayControl | null;
    soundOff: MicrositeVideoSoundOffControl | null;
    soundOn: MicrositeVideoSoundOnControl | null;
    replay?: MicrositeVideoReplayControl | null;
  };

  get enableCustomControl(): boolean {
    return this.config.customControl === true || typeof this.config.customControl === "object";
  }

  get enablePlayControl(): boolean {
    return (
      this.config.customControl === true ||
      (typeof this.config.customControl === "object" &&
        (this.config.customControl.play === true || typeof this.config.customControl.play === "object"))
    );
  }

  get enableSoundOffControl(): boolean {
    return (
      this.config.customControl === true ||
      (typeof this.config.customControl === "object" &&
        (this.config.customControl.soundOff === true || typeof this.config.customControl.soundOff === "object"))
    );
  }

  get enableSoundOnControl(): boolean {
    return (
      this.config.customControl === true ||
      (typeof this.config.customControl === "object" &&
        (this.config.customControl.soundOn === true || typeof this.config.customControl.soundOn === "object"))
    );
  }

  get enableReplayControl(): boolean {
    return (
      this.config.customControl === true ||
      (typeof this.config.customControl === "object" &&
        (this.config.customControl.replay === true || typeof this.config.customControl.replay === "object"))
    );
  }

  constructor(element, config: MicrositeVideoConfig) {
    super();
    this.element = element;
    this.id = this.element.getAttribute("id") || this.generateID();
    if (this.element.getAttribute("id") === null) {
      this.element.id = this.id;
    }
    this.config = config;
    this.container = this.element.parentElement as HTMLDivElement;
    this.init();
  }

  init() {
    this.initControls();
    this.initEvents();
  }

  play() {
    this.element.play();
  }

  pause() {
    this.element.pause();
  }

  replay() {
    this.element.currentTime = 0;
    this.element.play();
  }

  soundOn() {
    this.element.muted = false;
  }

  soundOff() {
    this.element.muted = true;
  }

  initControls() {
    if (this.enableCustomControl) {
      this.element.removeAttribute("controls");
      this.controls = {
        play: this.enablePlayControl ? new MicrositeVideoPlayControl(this, { type: "play" }) : null,
        soundOff: this.enableSoundOffControl ? new MicrositeVideoSoundOffControl(this, { type: "sound-off" }) : null,
        soundOn: this.enableSoundOnControl ? new MicrositeVideoSoundOnControl(this, { type: "sound-on" }) : null,
        replay: this.enableReplayControl ? new MicrositeVideoReplayControl(this, { type: "replay" }) : null,
      };
    }
  }

  initEvents() {
    this.element.addEventListener("play", this.onPlay.bind(this));
    this.element.addEventListener("pause", this.onPause.bind(this));
    this.element.addEventListener("ended", this.onEnded.bind(this));
    this.element.addEventListener("volumechange", this.onVolumeChange.bind(this));
    this.element.addEventListener("timeupdate", this.onTimeUpdate.bind(this));

    const supportsTouch = "ontouchstart" in window || navigator.maxTouchPoints || navigator.msMaxTouchPoints;
    if (supportsTouch) {
      this.element.addEventListener("touchend", this.onClick.bind(this));
    } else {
      this.element.addEventListener("click", this.onClick.bind(this));
    }
  }

  onPlay() {
    if (this.enablePlayControl) {
      this.controls.play.hide();
    }

    if (this.enableReplayControl) {
      this.controls.replay.hide();
    }

    this.element.setAttribute("controls", "true");

    if (this.enableReplayControl && this.element.hasAttribute("data-ended")) {
      this.sendGA(this.trackingConfig?.events?.videoReplay || "Replay Clicked");
    } else {
      this.sendGA(this.trackingConfig?.events?.videoPlay || "Play Clicked");
    }
    this.element.removeAttribute("data-ended");
  }

  onPause() {
    if (this.enablePlayControl) {
      this.controls.play.show();
    }

    if (this.enableCustomControl && this.enablePlayControl) {
      this.element.removeAttribute("controls");
    }

    this.sendGA(this.trackingConfig?.events?.videoPause || "Pause Clicked");
  }

  onEnded() {
    this.element.setAttribute("data-ended", "true");
    if (this.enableReplayControl) {
      this.controls.replay.show();
    } else {
      this.controls.play.show();
    }
  }

  onVolumeChange() {
    if (this.enableSoundOffControl || this.enableSoundOnControl) {
      if (this.element.muted) {
        this.controls.soundOff.show();
        this.controls.soundOn.hide();
        this.sendGA(this.trackingConfig?.events?.videoSoundOff || "SoundOff Clicked");
      } else {
        this.controls.soundOff.hide();
        this.controls.soundOn.show();
        this.sendGA(this.trackingConfig?.events?.videoSoundOn || "SoundOn Clicked");
      }
    }
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.element.paused) {
      this.pause();
    } else {
      this.play();
    }
  }

  changeSource(src: string, name: string) {
    this.element.src = src;
    if (name) {
      this.element.setAttribute("data-name", name);
    }
    this.element.currentTime = 0;
    this.play();
  }

  onTimeUpdate() {}
}

export default window.MicrositeVideo = MicrositeVideo;