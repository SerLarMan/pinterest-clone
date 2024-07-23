import "./offCanvasMenu.scss";
import "../../styles/global.scss";

export function setUpOffCanvasMenu() {
  const main = document.querySelector("main");

  const sidecanvas = document.createElement("div");
  sidecanvas.classList.add("sidecanvas");

  main.append(sidecanvas);
}
