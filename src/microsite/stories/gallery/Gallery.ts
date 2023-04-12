import { ModalGalleryDataMockup } from "@microsite/mocks";
import btnClose from "../../assets/images/btn_close.png";

export const createGalleryWithCarousel = (args) => {
  const container = document.createElement("div");
  container.style.maxWidth = "600px";
  container.style.margin = "0 auto";

  const carousel = document.createElement("div");
  carousel.className = "owl-carousel owl-theme am-carousel am-gallery-carousel";
  carousel.setAttribute('data-name', 'Gallery Carousel');
  
  carousel.innerHTML = ModalGalleryDataMockup.map((item) => {
    return `
    <div class="item am-carousel-item am-gallery-carousel-item" data-name="Playset ${item.id}" data-gallery_id="${item.id}">
      <div class="am-carousel-item-top">
        <img class="am-carousel-item-image" src="${item.images ? item.images[0] : `/images/${item.id}/1.png`}" />
      </div>
      <div class="am-carousel-item-bottom">
        <p class="mb-0 fw-bold am-carousel-item-title">
          ${item.title}
        </p>
      </div>
    </div>
    `;
  }).join("\n");

  const modal = document.createElement("div");
  modal.className = "modal fade am-modal am-gallery-modal";
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <img src="${btnClose}" alt="Close" />
        </button>
          <div class="am-gallery-modal-inner">
            <div class="owl-carousel owl-theme am-carousel am-gallery-modal-carousel" data-name="Example Gallery Carousel">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(carousel);
  container.appendChild(modal);
  return container;
};

export const createGalleryWithToggle = (args) => {
  const container = document.createElement("div");
  container.style.maxWidth = "600px";
  container.style.margin = "0 auto";
  container.innerHTML = `
    <button type="button" class="am-gallery-toggle" data-name="Gallery Toggle 1" data-gallery_id="1">
      Toggle 1
    </button>
    <button type="button" class="am-gallery-toggle" data-name="Gallery Toggle 2" data-gallery_id="2">
      Toggle 2
    </button>
    
  `

  const modal = document.createElement("div");
  modal.className = "modal fade am-modal am-gallery-modal";
  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <img src="${btnClose}" alt="Close" />
        </button>
          <div class="am-gallery-modal-inner">
            <div class="owl-carousel owl-theme am-carousel am-gallery-modal-carousel" data-name="Example Gallery Carousel">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(modal);
  return container;
};
