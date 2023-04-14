export interface ToggleProps {
  label: string;
}

export const createToggle = (args: ToggleProps) => {
  const button = document.createElement("button");
  button.innerText = args.label;
  button.className = "btn btn-primary";
  button.setAttribute("data-name", "Example Toggle");

  return button;
};
