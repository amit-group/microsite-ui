import { MicrositeGallery } from "@microsite/main/gallery";
import { createGalleryWithCarousel, createGalleryWithToggle } from "./Gallery";
import { ModalGalleryDataMockup } from "@microsite/mocks";

export default {
  title: "Microsite/Gallery",
};

export const GalleryWithCarousel = (args) => {
  return createGalleryWithCarousel(args);
};
GalleryWithCarousel.args = {};
GalleryWithCarousel.storyName = "Gallery With Carousel";
GalleryWithCarousel.play = ({ canvasElement, args }) => {
  const modalEl = canvasElement.querySelector(".modal") as HTMLDivElement;
  const carouselEl = canvasElement.querySelector(".am-gallery-carousel") as HTMLDivElement;
  new MicrositeGallery({
    modalEl,
    modalConfig: {
      data: ModalGalleryDataMockup,
      tracking: {
        label: "Gallery Modal",
        category: "Engagement",
      },
    },
    carouselEl,
    carouselConfig: {
      tracking: {
        label: "Gallery Carousel",
        category: "Engagement",
      },
    },
    tracking: {
      label: "Gallery",
      category: "Engagement",
    },
  });
};
GalleryWithCarousel.parameters = {
  docs: {
    source: {
      code: `
<div class="owl-carousel owl-theme am-carousel am-gallery-carousel" data-name="Gallery Carousel">
  <div class="item am-carousel-item am-gallery-carousel-item" data-name="Playset 1" data-gallery_id="1">
    <div class="am-carousel-item-top">
      <img class="am-carousel-item-image" src="https://picsum.photos/1920/1080?random=1">
    </div>
    <div class="am-carousel-item-bottom">
      <p class="mb-0 fw-bold am-carousel-item-title">
        Title 1
      </p>
    </div>
  </div>
  

  <div class="item am-carousel-item am-gallery-carousel-item" data-name="Playset 2" data-gallery_id="2">
    <div class="am-carousel-item-top">
      <img class="am-carousel-item-image" src="https://picsum.photos/1920/1080?random=2">
    </div>
    <div class="am-carousel-item-bottom">
      <p class="mb-0 fw-bold am-carousel-item-title">
        Title 2
      </p>
    </div>
  </div>
  

  <div class="item am-carousel-item am-gallery-carousel-item" data-name="Playset 3" data-gallery_id="3">
    <div class="am-carousel-item-top">
      <img class="am-carousel-item-image" src="https://picsum.photos/1920/1080?random=3">
    </div>
    <div class="am-carousel-item-bottom">
      <p class="mb-0 fw-bold am-carousel-item-title">
        Title 3
      </p>
    </div>
  </div>
  

  <div class="item am-carousel-item am-gallery-carousel-item" data-name="Playset 4" data-gallery_id="4">
    <div class="am-carousel-item-top">
      <img class="am-carousel-item-image" src="https://picsum.photos/1920/1080?random=4">
    </div>
    <div class="am-carousel-item-bottom">
      <p class="mb-0 fw-bold am-carousel-item-title">
        Title 4
      </p>
    </div>
  </div>
  

  <div class="item am-carousel-item am-gallery-carousel-item" data-name="Playset 5" data-gallery_id="5">
    <div class="am-carousel-item-top">
      <img class="am-carousel-item-image" src="https://picsum.photos/1920/1080?random=5">
    </div>
    <div class="am-carousel-item-bottom">
      <p class="mb-0 fw-bold am-carousel-item-title">
        Title 5
      </p>
    </div>
  </div>
  </div><div class="modal fade am-modal am-gallery-modal">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <img src="static/media/src/microsite/assets/images/btn_close.png" alt="Close">
      </button>
        <div class="am-gallery-modal-inner">
          <div class="owl-carousel owl-theme am-carousel am-gallery-modal-carousel" data-name="Example Gallery Carousel">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  const carouselEl = document.querySelector('.am-carousel.am-gallery-carousel');
  const modalEl = document.querySelector('.am-gallery-modal');
  new MicrositeGallery({
    modalEl,
    modalConfig: {
      data: ModalGalleryDataMockup,
      tracking: {
        label: "Gallery Modal",
        category: "Engagement",
      },
    },
    carouselEl,
    carouselConfig: {
      tracking: {
        label: "Gallery Carousel",
        category: "Engagement",
      },
    },
    tracking: {
      label: "Gallery",
      category: "Engagement",
    },
  });
</script>
      `,
    },
  },
};

export const GalleryWithToggle = (args) => {
  return createGalleryWithToggle(args);
};

GalleryWithToggle.play = ({ canvasElement, args }) => {
  const modalEl = canvasElement.querySelector(".modal") as HTMLDivElement;
  const toggle = canvasElement.querySelectorAll(".am-gallery-toggle");
  new MicrositeGallery({
    modalEl,
    modalConfig: {
      data: ModalGalleryDataMockup,
      tracking: {
        label: "Gallery Modal",
        category: "Engagement",
      },
    },
    toggleEl: toggle,
    toggleConfig: {
      tracking: "Gallery Toggle",
      category: "Engagement",
    },
    tracking: {
      label: "Gallery",
      category: "Engagement",
    },
  });
};
GalleryWithToggle.parameters = {
  docs: {
    source: {
      code: `
<button type="button" class="am-gallery-toggle" data-name="Gallery Toggle 1" data-gallery_id="1">
  Toggle 1
</button>
<button type="button" class="am-gallery-toggle" data-name="Gallery Toggle 2" data-gallery_id="2">
  Toggle 2
</button>
    
<div class="modal fade am-modal am-gallery-modal">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <img src="static/media/src/microsite/assets/images/btn_close.png" alt="Close">
        </button>
        <div class="am-gallery-modal-inner">
          <div class="owl-carousel owl-theme am-carousel am-gallery-modal-carousel" data-name="Example Gallery Carousel">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  const toggleEl = document.querySelector('.am-gallery-toggle');
  const modalEl = document.querySelector('.am-gallery-modal');
  new MicrositeGallery({
    modalEl,
    modalConfig: {
      data: ModalGalleryDataMockup,
      tracking: {
        label: "Gallery Modal",
        category: "Engagement"
      }
    },
    toggleEl: toggle,
    toggleConfig: {
      tracking: "Gallery Toggle",
      category: "Engagement"
    },
    tracking: {
      label: "Gallery",
      category: "Engagement"
    }
  })
</script>
      `,
    },
  },
};
