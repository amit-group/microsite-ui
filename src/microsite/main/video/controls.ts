import btnPlay from "../../assets/images/btn_play.png";
import btnSoundOff from "../../assets/images/btn_sound_off.png";
import btnSoundOn from "../../assets/images/btn_sound_on.png";
import btnReplay from "../../assets/images/btn_replay.png";

import { MicrositeVideoControlConfig } from "@microsite/interfaces/video";
import { MicrositeVideo } from "./video";

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
    return this.config.image || btnPlay;
  }

  onClick(): void {
    this.video.play();
  }
}

export class MicrositeVideoReplayControl extends MicrositeVideoControl {
  get image(): string {
    return this.config.image || btnReplay;
  }

  onClick(): void {
    this.video.replay();
  }
}

export class MicrositeVideoSoundOffControl extends MicrositeVideoControl {
  get image(): string {
    return this.config.image || btnSoundOff;
  }

  onClick(): void {
    this.video.soundOn();
  }
}

export class MicrositeVideoSoundOnControl extends MicrositeVideoControl {
  get image(): string {
    return this.config.image || btnSoundOn;
  }

  onClick(): void {
    this.video.soundOff();
  }
}
