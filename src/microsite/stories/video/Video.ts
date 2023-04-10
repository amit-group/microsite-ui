import { setStyles } from "../utils";
import videoExample from "../../assets/videos/video-example.mp4";

const VIDEO_PREFIX = "am-video";

export type VideoProps = {
  url: string,
  thumbnailUrl?: string,
  containerStyles?: Partial<CSSStyleDeclaration>,
  videoStyles?: Partial<CSSStyleDeclaration>,
  controlStyles?: Partial<CSSStyleDeclaration>,
  autoplay?: boolean,
  customControl?: boolean,
}

export const DefaultVideoProps: VideoProps = {
  url: videoExample,
  thumbnailUrl: "https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg",
  autoplay: false,
  customControl: true,
  containerStyles: {
    width: "600px"
  },
  videoStyles: {},
  controlStyles: {},
}

export const createVideo = (args) => {
  const container = document.createElement('div');
  container.className = `${VIDEO_PREFIX}-container`;

  if(args.containerStyles) {
    setStyles(container, args.containerStyles);
  }

  const video = document.createElement('video');
  video.className = `${VIDEO_PREFIX}`;
  video.src = args.url;
  video.autoplay = !!args.autoplay;
  video.controls = !args.customControl;
  video.setAttribute("data-name", "Example Video");

  if(args.videoStyles) {
    setStyles(video, args.videoStyles);
  }

  container.appendChild(video);
  return container;
}