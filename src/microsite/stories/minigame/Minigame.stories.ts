import { MicrositeMinigame } from "@microsite/main/minigame/minigame";
import { createMinigame } from "./Minigame"

export default {
  title: "Microsite/Minigame",
}

const Template = (args) => {
  return createMinigame(args);
}

export const Minigame = Template.bind({});
Minigame.play = ({ canvasElement }) => {
  const popupEl = canvasElement.querySelector('#popup');
  const toggleEl = canvasElement.querySelector('button');

  new MicrositeMinigame({
    popupEl: popupEl,
    toggleEl: toggleEl,
    toggleConfig: {
      tracking: {
        category: "Engagement",
        label: "Minigame"
      }
    },
    onOpen: (minigame) => {
      console.log(minigame);
    },
    onClose: (minigame) => {
      console.log(minigame);
    },
    tracking: {
      category: "Engagement",
      label: "Minigame"
    }
  });
}
Minigame.parameters = {
  docs: {
    source : {
      code: `
<button data-name="Minigame Toggle" type="button">Toggle</button>
<div id="popup">
  <div class="row justify-content-center popup-wrapper">
    <div class="popup-item popup-game d-flex justify-content-center align-item-center show">
      <div class="animate__animated animate_bounceIn animate_faster">
        <div class="popup-game__container">
          <div class="popup-game__wrapper">
            <iframe src="" data="/minigame/index.html" scrolling="no"></iframe>
          </div>
          <div class="popup-close" data-name="Minigame Close" role="button"><img src="static/media/src/microsite/assets/images/close_popup.png" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
  const toggleEl = document.querySelector('button');
  const popupEl = document.querySelector('#popup');
  new MicrositeMinigame({
    popupEl: popupEl,
    toggleEl: toggleEl,
    toggleConfig: {
      tracking: {
        category: "Engagement",
        label: "Minigame"
      }
    },
    tracking: {
      category: "Engagement",
      label: "Minigame"
    }
  });
</script>
      `
    }
  }
}