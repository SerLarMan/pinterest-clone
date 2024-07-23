import "./notificacionesSide.scss";
import "../../styles/global.scss";

export function setUpNotificacionesSide() {
  const sidecanvas = document.querySelector(".sidecanvas");
  sidecanvas.textContent = "";

  const title = document.createElement("h2");
  title.textContent = "Notificaciones";

  const div = document.createElement("div");
  div.classList.add("divAviso");

  const i = document.createElement("i");
  i.className = "fas fa-circle-info";

  const span = document.createElement("span");
  span.textContent = "No hay notificaciones por el momento";

  div.append(i);
  div.append(span);

  sidecanvas.append(title);
  sidecanvas.append(div);
}
