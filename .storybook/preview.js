import "owl.carousel/dist/owl.carousel.min.js";
import 'bootstrap';
import 'jquery/dist/jquery';
import '../src/microsite/microsite.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}