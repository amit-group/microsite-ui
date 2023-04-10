import { DefaultVideoProps, createVideo } from "../video/Video";
import tvc1 from "../../assets/videos/tvc1.mp4";
import tvc2 from "../../assets/videos/tvc2.mp4";
import { createCarousel } from "../carousel/Carousel";

export const createPlaylist = (args) => {
  const container = document.createElement('DIV') ;
  container.style.maxWidth = "80%";
  container.style.margin = "0 auto";

  const videoContainer = document.createElement('div');
  videoContainer.className = "am-video-container";
  videoContainer.style.width = "600px";
  videoContainer.style.margin = "0 auto";
  videoContainer.innerHTML = `
    <video class="am-video" data-name="TVC 1" src="${tvc1}" poster="https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg" controls></video>
  `;

  const carousel = document.createElement('DIV') as HTMLDivElement;
  carousel.className = "owl-carousel owl-theme am-carousel";
  carousel.setAttribute('data-name', 'Example Carousel');

  carousel.innerHTML = `
    <div class="item" data-src="${tvc1}" data-video-name="TVC 1" data-name="1">
      <img src="https://picsum.photos/1920/1080?random=1" alt="Image 1" />
    </div>  
    <div class="item" data-src="${tvc2}" data-video-name="TVC 2" data-name="2">
      <img src="https://picsum.photos/1920/1080?random=2" alt="Image 2" />
    </div>  
    <div class="item" data-src="${tvc1}" data-video-name="TVC 3" data-name="3">
      <img src="https://picsum.photos/1920/1080?random=3" alt="Image 3" />
    </div>  
    <div class="item" data-src="${tvc2}" data-video-name="TVC 4" data-name="4">
      <img src="https://picsum.photos/1920/1080?random=4" alt="Image 4" />
    </div>  
  `;

  container.appendChild(videoContainer);
  container.appendChild(carousel);


  return container;
}

export const createPlaylistWithoutCarousel = (args) => {
  const container = document.createElement('DIV') ;
  container.style.maxWidth = "80%";
  container.style.margin = "0 auto";

  const videoContainer = document.createElement('div');
  videoContainer.className = "am-video-container";
  videoContainer.style.width = "600px";
  videoContainer.style.margin = "0 auto";
  videoContainer.innerHTML = `
    <video class="am-video" data-name="TVC 1" src="${tvc1}" poster="https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg" controls></video>
  `;

  const nav = document.createElement('DIV') as HTMLDivElement;
  nav.className = "row justify-content-center align-items-center";

  nav.innerHTML = `
    <div class="col-4"  >
      <a href="javascript: void(0)" class="am-playlist-toggle" data-src="${tvc1}" data-video-name="TVC 1" data-name="1">
        <img src="https://picsum.photos/1920/1080?random=1" alt="Image 1" />
      </a>
    </div>  
    <div class="col-4"  >
      <a href="javascript: void(0)" class="am-playlist-toggle" data-src="${tvc2}" data-video-name="TVC 2" data-name="2">
        <img src="https://picsum.photos/1920/1080?random=2" alt="Image 2" />
      </a>
    </div>  
  `;

  container.appendChild(videoContainer);
  container.appendChild(nav);

  return container;
}