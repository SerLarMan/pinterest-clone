import "../../styles/global.scss";
import "./iconButton.scss";

export function setUpIconButton(icon, clickFunction, toolTip) {
  const button = document.createElement("button");
  button.className = icon;
  button.classList.add("iconButton");
  button.addEventListener("click", clickFunction);

  const span = document.createElement("span");
  span.textContent = toolTip;
  span.classList.add("tooltiptext");

  button.append(span);
  return button;
}
