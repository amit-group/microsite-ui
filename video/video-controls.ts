import { MicrositeVideo } from "./video";
const buttonPlay = require("../assets/images/btn_play.png");
const buttonReplay = require("../assets/images/btn_replay.png");
const buttonSoundOff = require("../assets/images/btn_sound_off.png");
const buttonSoundOn = require("../assets/images/btn_sound_on.png");

export interface MicrositeVideoControlConfig {
  type: "play" | "sound-off" | "sound-on" | "replay";
  image?: string;
  // events?: Array<string>
}

export abstract class MicrositeVideoControl {
  video: MicrositeVideo;
  config: MicrositeVideoControlConfig;
  button: HTMLButtonElement;

  constructor(video: MicrositeVideo, config: MicrositeVideoControlConfig) {
    this.video = video;
    this.config = config;
    this.render();
  }

  abstract get image(): string;
  abstract onClick(): void;

  render() {
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.className = `am-video-control am-video-control-${this.config.type}`;
    this.button.innerHTML = `<img src="${this.image}" alt="${this.config.type}" />`;

    if (
      (this.config.type === "play" && !this.video.element.hasAttribute("autoplay")) ||
      (this.config.type === "sound-on" && !this.video.element.muted) ||
      (this.config.type === "sound-off" && this.video.element.muted)
    ) {
      this.button.classList.add("show");
    }

    const events = ["click"];
    events.forEach((event) => {
      this.button.addEventListener(event, this.onClick.bind(this));
    });

    this.video.container.appendChild(this.button);
  }

  show() {
    this.button.classList.add("show");
  }

  hide() {
    this.button.classList.remove("show");
  }
}

export class MicrositeVideoPlayControl extends MicrositeVideoControl {
  get image(): string {
    return this.config.image || buttonPlay;
  }

  onClick(): void {
    this.video.play();
  }
}

export class MicrositeVideoReplayControl extends MicrositeVideoControl {
  get image(): string {
    return this.config.image || buttonReplay;
  }

  onClick(): void {
    this.video.replay();
  }
}

export class MicrositeVideoSoundOffControl extends MicrositeVideoControl {
  get image(): string {
    return this.config.image || buttonSoundOff;
  }

  onClick(): void {
    this.video.soundOn();
  }
}

export class MicrositeVideoSoundOnControl extends MicrositeVideoControl {
  get image(): string {
    return this.config.image || buttonSoundOn;
  }

  onClick(): void {
    this.video.soundOff();
  }
}

window.MicrositeVideoSoundOffControl = MicrositeVideoSoundOffControl;
window.MicrositeVideoSoundOnControl = MicrositeVideoSoundOnControl;
window.MicrositeVideoPlayControl = MicrositeVideoPlayControl;
window.MicrositeVideoReplayControl = MicrositeVideoReplayControl;

export default {};