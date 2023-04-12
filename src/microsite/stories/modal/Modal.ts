import './Modal.scss';
import btnClose from '../../assets/images/btn_close.png';

export const createModalGallery = (args) => {
  const container = document.createElement("div");
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop fade show";

  const modal = document.createElement("div");
  modal.className = "modal fade show am-modal am-gallery-modal";
  modal.role = "dialog";
  modal.tabIndex = -1;
  modal.style.display = "block";
  modal.style.paddingLeft = "17px";
  modal.setAttribute("data-name", "Example Gallery");
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
  container.appendChild(backdrop);
  container.appendChild(modal);
  
  return container;
};
