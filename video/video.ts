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
    this.element = typeof element === "string" ? document.querySelector(element) : element;
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
    this.initAttributes();
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

  initAttributes() {
    this.element.setAttribute("data-25", "false");
    this.element.setAttribute("data-50", "false");
    this.element.setAttribute("data-75", "false");
    this.element.setAttribute("data-100", "false");
  }

  initControls() {
    if (this.enableCustomControl) {
      this.element.removeAttribute("controls");
      this.controls = {
        play: this.enablePlayControl
          ? new MicrositeVideoPlayControl(this, {
              type: "play",
              ...(typeof this.config.customControl == "object"
                ? typeof this.config.customControl.play === "object"
                  ? this.config.customControl.play
                  : {}
                : {}),
            })
          : null,
        soundOff: this.enableSoundOffControl
          ? new MicrositeVideoSoundOffControl(this, {
              type: "sound-off",
              ...(typeof this.config.customControl == "object"
                ? typeof this.config.customControl.soundOff === "object"
                  ? this.config.customControl.soundOff
                  : {}
                : {}),
            })
          : null,
        soundOn: this.enableSoundOnControl
          ? new MicrositeVideoSoundOnControl(this, {
              type: "sound-on",
              ...(typeof this.config.customControl == "object"
                ? typeof this.config.customControl.soundOn === "object"
                  ? this.config.customControl.soundOn
                  : {}
                : {}),
            })
          : null,
        replay: this.enableReplayControl
          ? new MicrositeVideoReplayControl(this, {
              type: "replay",
              ...(typeof this.config.customControl == "object"
                ? typeof this.config.customControl.replay === "object"
                  ? this.config.customControl.replay
                  : {}
                : {}),
            })
          : null,
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
    if (this.enablePlayControl && !this.element.ended) {
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

  onTimeUpdate(e) {
    e.stopPropagation();
    const videoDuration = e.target.duration;
    const videoWatchedTime = e.target.currentTime * 100;
    if (Math.floor(videoWatchedTime / videoDuration) >= 25 && this.element.getAttribute("data-25") == "false") {
      this.element.setAttribute("data-25", "true");
      this.sendGA(this.trackingConfig?.events?.video25Percent || "Played 25%");
    }
    if (Math.floor(videoWatchedTime / videoDuration) >= 50 && this.element.getAttribute("data-50") == "false") {
      this.element.setAttribute("data-50", "true");
      this.sendGA(this.trackingConfig?.events?.video50Percent || "Played 50%");
    }
    if (Math.floor(videoWatchedTime / videoDuration) >= 75 && this.element.getAttribute("data-75") == "false") {
      this.element.setAttribute("data-75", "true");
      this.sendGA(this.trackingConfig?.events?.video75Percent || "Played 75%");
    }
    if (Math.floor(videoWatchedTime / videoDuration) >= 100 && this.element.getAttribute("data-100") == "false") {
      this.element.setAttribute("data-100", "true");
      this.sendGA(this.trackingConfig?.events?.video100Percent || "Played 100%");
    }
  }

  getVideoCompletion(element: HTMLVideoElement) {
    return [25, 50, 75, 100].map((percent) => {
      return {
        percent: percent,
        status: element.getAttribute(`data-${percent}`) ?? "false",
      };
    });
  }

  setVideoCompletion(element: HTMLVideoElement | HTMLDivElement, array) {
    array.forEach((completion) => {
      element.setAttribute(`data-${completion.percent}`, completion.status);
    });
  }
}

export default window.MicrositeVideo = MicrositeVideo;
