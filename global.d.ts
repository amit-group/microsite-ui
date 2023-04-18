import { MicrositeVideo } from "./video";
import { MicrositeToggle } from "./toggle";
import { MicrositePlaylist } from "./playlist";
import { MicrositeModalGallery } from "./modal";
import { MicrositeMinigame } from "./minigame";
import { MicrositeLoader } from "./loader";
import { MicrositeGallery } from "./gallery";
import { MicrositeCarousel } from "./carousel";
import { MicrositeElement } from "./core";
import { TrackingUtils } from './tracking';
import { MicrositeVideoSoundOffControl, MicrositeVideoSoundOnControl, MicrositeVideoPlayControl, MicrositeVideoReplayControl } from "video";

declare module "*.png";
declare module "*.mp4";
declare module "*.jpg";

declare global {
  interface Window {
    MicrositeCarousel: typeof MicrositeCarousel;
    MicrositeElement: typeof MicrositeElement;
    MicrositeGallery: typeof MicrositeGallery;
    MicrositeLoader: typeof MicrositeLoader;
    MicrositeMinigame: typeof MicrositeMinigame;
    MicrositeModalGallery: typeof MicrositeModalGallery;
    MicrositePlaylist: typeof MicrositePlaylist;
    MicrositeToggle: typeof MicrositeToggle;
    MicrositeVideo: typeof MicrositeVideo;
    MicrositeVideoSoundOffControl: typeof MicrositeVideoSoundOffControl;
    MicrositeVideoSoundOnControl: typeof MicrositeVideoSoundOnControl;
    MicrositeVideoPlayControl: typeof MicrositeVideoPlayControl;
    MicrositeVideoReplayControl: typeof MicrositeVideoReplayControl;
    TrackingUtils: typeof TrackingUtils;
  }
}
