import { MicrositeToggle } from "@microsite/main/toggle";
import { createToggle } from "./Toggle"

export default {
  title: "Microsite/Toggle",
  argTypes: {
    label: {
      control: "text",
    }
  }
}

const Template = (args) => createToggle(args);

export const Toggle = Template.bind({});
Toggle.args = {
  label: "Toggle",
}
Toggle.play = ({ canvasElement }) => {
  const button = canvasElement.querySelector('button');
  new MicrositeToggle(button, {
    tracking: {
      category: 'General',
      label: 'Example Toggle',
    }
  })
}
