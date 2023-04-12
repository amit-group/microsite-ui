import { MicrositeModalGallery } from "@microsite/main/modal/modal-gallery";
import { createModalGallery } from "./Modal";
import { ModalGalleryDataMockup } from "@microsite/mocks";

export default {
  title: "Microsite/Modal"
}

export const ModalGallery = (args) => {
  return createModalGallery(args);
}
ModalGallery.storyName = "Modal Gallery";
ModalGallery.play = ({ canvasElement, args }) => {
  console.log("PLAY");
  const modalEl = canvasElement.querySelector('.am-gallery-modal');
  new MicrositeModalGallery(modalEl, { 
    data: ModalGalleryDataMockup,
    tracking: {
      label: 'Gallery',
      category: 'Engagement'
    }
  })
}
ModalGallery.parameters = {
  docs: {
    source: {
      code: `
<div class="modal fade show am-modal am-gallery-modal" role="dialog" tabindex="-1" data-name="Example Gallery" style="display: block; padding-left: 17px;">
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
  const modalEl = canvasElement.querySelector('.am-gallery-modal');
  new MicrositeModalGallery(modalEl, { 
    data: ${JSON.stringify(ModalGalleryDataMockup)},
    tracking: {
      label: 'Gallery',
      category: 'Engagement'
    }
  })
</script>
      `
    }
  }
}