
export const createCarousel = (args) => {
  const container = document.createElement('div');
  container.style.maxWidth = "80%";
  container.style.margin = "0 auto";

  const carousel = document.createElement("div");
  carousel.className = "owl-carousel owl-theme am-carousel";
  carousel.setAttribute("data-name", "Example Carousel");

  carousel.innerHTML = `
    <div class="item" data-name="1">
      <img src="https://picsum.photos/1920/1080?random=1" alt="Image 1" />
    </div>  
    <div class="item" data-name="2">
      <img src="https://picsum.photos/1920/1080?random=2" alt="Image 2" />
    </div>  
    <div class="item" data-name="3">
      <img src="https://picsum.photos/1920/1080?random=3" alt="Image 3" />
    </div>  
    <div class="item" data-name="4">
      <img src="https://picsum.photos/1920/1080?random=4" alt="Image 4" />
    </div>  
    <div class="item" data-name="5">
      <img src="https://picsum.photos/1920/1080?random=5" alt="Image 5" />
    </div>  
    <div class="item" data-name="6">
      <img src="https://picsum.photos/1920/1080?random=6" alt="Image 6" />
    </div>  
  `;

  container.appendChild(carousel);

  return container;
};
