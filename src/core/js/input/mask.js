import Inputmask from "inputmask";
const InputMaskConfig = {
  skipOptionalPartCharacter: " ",
  showMaskOnHover: false,
};

export function inputMaskElement(el) {
  const regex = el.getAttribute("data-regex");
  const mask = el.getAttribute("data-mask");
  const inputmask = new Inputmask({
    ...InputMaskConfig,
    regex,
    mask,
    placeholder: ""
  });
  inputmask.mask(el);
}

export function initInputMask(selectorOrElement) {
  if (!selectorOrElement) {
    document.querySelectorAll("[data-mask]").forEach((el) => {
      inputMaskElement(el);
    });
  } else {
    if (typeof selectorOrElement === "string") {
      document.querySelectorAll(selectorOrElement).forEach((el) => {
        inputMaskElement(el);
      });
    } else {
      inputMaskElement(selectorOrElement);
    }
  }
}

initInputMask();
