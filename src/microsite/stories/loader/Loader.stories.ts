import { MicrositeLoader } from "@microsite/main/loader";
import { createLoader } from "./Loader";

export default {
  title: "Microsite/Loader",
};

const Template = () => {
  return createLoader();
};

export const Loader = Template.bind({});
Loader.play = ({ canvasElement }) => {
  const loader = canvasElement.querySelector("#loader");
 
  new MicrositeLoader(loader, {});

  window.addEventListener('loader.hidden', e => {
    console.log(e);
  })
  
};
Loader.parameters = {
  docs: {
    source: {
      code: `
<style>
  .loader {
    position: fixed;
    display: block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 1;
    background: #fff0f2;

    z-index: 99999;
    transition: all 1s ease;
  }
  .loader.hiding {
    opacity: 0;
  }
  .loader.hide {
    display: none;
  }
  .loader1 {
    position: relative;
    height: 80px;
    width: 80px;
    border-radius: 80px;
    border: 3px solid #ff8696;
    top: 28%;
    top: -webkit-calc(50% - 43px);
    top: calc(50% - 43px);
    left: 35%;
    left: -webkit-calc(50% - 43px);
    left: calc(50% - 43px);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: loader1 3s linear infinite;
    animation: loader1 3s linear infinite;
  }

  .loader1:after {
    content: "";
    position: absolute;
    top: -5px;
    left: 20px;
    width: 11px;
    height: 11px;
    border-radius: 10px;
    background-color: #ff2e2e;
  }

  @-webkit-keyframes loader1 {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes loader1 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
<div id="loader" class="loader">
  <div class="loader1"></div>
</div>
    
      `,
    },
  },
};
