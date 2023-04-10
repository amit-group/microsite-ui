import { MicrositePlaylist } from '@microsite/main';
import { createPlaylist, createPlaylistWithoutCarousel } from './Playlist';

export default {
  title: "Microsite/Playlist"
}
const Template = (args) => {
  return createPlaylist(args);
}

export const Playlist = Template.bind({});
Playlist.play = ({ canvasElement, args }) => {
  const video = canvasElement.querySelector(`.am-video`);
  const carousel = canvasElement.querySelector(`.am-carousel`);

  new MicrositePlaylist({
    carouselEl: carousel,
    carouselConfig: {
      tracking: {
        label: "Playlist",
        category: "Engagement"
      }
    },
    videoEl: video,
    videoConfig: {
      customControl: true,
      tracking: {
        label: "Playlist",
        category: "Video Interaction"
      }
    }
  });
}
Playlist.parameters = {
  docs: {
    source: {
      code: `
<div class="am-playlist" style="max-width: 80%; margin: 0px auto;">
  <div class="am-video-container" style="width: 600px; margin: 0px auto;">
    <video class="am-video" data-name="TVC 1" src="static/media/src/microsite/assets/videos/tvc1.mp4" poster="https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg" controls=""></video>
  </div>
  <div class="owl-carousel owl-theme am-carousel" data-name="Example Carousel">
    <div class="item" data-src="static/media/src/microsite/assets/videos/tvc1.mp4" data-video-name="TVC 1" data-name="1">
      <img src="https://picsum.photos/1920/1080?random=1" alt="Image 1">
    </div>  
    <div class="item" data-src="static/media/src/microsite/assets/videos/tvc2.mp4" data-video-name="TVC 2" data-name="2">
      <img src="https://picsum.photos/1920/1080?random=2" alt="Image 2">
    </div>  
    <div class="item" data-src="static/media/src/microsite/assets/videos/tvc1.mp4" data-video-name="TVC 3" data-name="3">
      <img src="https://picsum.photos/1920/1080?random=3" alt="Image 3">
    </div>  
    <div class="item" data-src="static/media/src/microsite/assets/videos/tvc2.mp4" data-video-name="TVC 4" data-name="4">
      <img src="https://picsum.photos/1920/1080?random=4" alt="Image 4">
    </div>  
  </div>
</div>
<script>
  new MicrositePlaylist({
    carouselEl: document.querySelector('.am-carousel'),
    carouselConfig: {
      tracking: {
        label: "Playlist",
        category: "Engagement"
      }
    },
    videoEl: document.querySelector('.am-video'),
    videoConfig: {
      customControl: true,
      tracking: {
        label: "Playlist",
        category: "Video Interaction"
      }
    }
  });
</script>
    `
    }
  }
}

export const PlaylistWithoutCarousel = (args) => {
  return createPlaylistWithoutCarousel(args);
};
PlaylistWithoutCarousel.storyName = "Playlist without Carousel";
PlaylistWithoutCarousel.play = ({ canvasElement, args }) => {
  const video = canvasElement.querySelector('.am-video');
  const toggles = canvasElement.querySelectorAll('.am-playlist-toggle');
  new MicrositePlaylist({
    videoEl: video,
    videoConfig: {
      tracking: {
        label: "Playlist",
        category: "Engagement"
      }
    },
    toggleEl: toggles
  })
}