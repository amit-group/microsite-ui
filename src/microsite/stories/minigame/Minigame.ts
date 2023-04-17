import closePopup from '../../assets/images/close_popup.png';
export const createMinigame = (args) => {
  const container = document.createElement("DIV");

  const button = document.createElement("BUTTON") as HTMLButtonElement;
  button.type = "button";
  button.innerHTML = "Toggle";
  button.setAttribute("data-name", "Minigame Toggle");

  const popup = document.createElement("DIV");
  popup.id = "popup";
  popup.innerHTML = `
  <div class="row justify-content-center popup-wrapper">
    <div class="popup-item popup-game d-flex justify-content-center align-item-center show">
      <div class="animate__animated animate_bounceIn animate_faster">
        <div class="popup-game__container">
          <div class="popup-game__wrapper">
            <iframe src="" data="/minigame/index.html" scrolling="no"></iframe>
          </div>
          <div class="popup-close" data-name="Minigame Close" role="button"><img src="${closePopup}" alt="" /></div>
        </div>
      </div>
    </div>
  </div>
  `;

  container.appendChild(button);
  container.appendChild(popup);
  return container;
};
