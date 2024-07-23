import { setUpSearchBar } from "../SearchBar/searchBar";
import { setUpTextButton } from "../TextButton/textButton";
import { setUpIconButton } from "../IconButton/iconButton";
import { setUpCardContainer } from "../CardContainer/cardContainer";
import { setUpNotificacionesSide } from "../NotificacionesSide/notificacionesSide";
import { setUpMensajesSide } from "../MensajesSide/mensajesSide";

import "../../styles/global.scss";
import "./cabecera.scss";
import { setUpOffCanvasMenu } from "../OffCanvasMenu/offCanvasMenu";

export function setUpCabecera() {
  const header = document.querySelector("header");
  header.textContent = "";

  const h1 = document.createElement("h1");
  h1.textContent = "Pinterest clone";
  h1.classList.add("hidden");
  header.append(h1);

  // Icono de pinterest
  const divBrand = document.createElement("div");
  divBrand.className = "divBrand";

  const brand = document.createElement("i");
  brand.className = "fa-brands fa-pinterest fa-2xl";
  brand.style.color = "#fb0909";
  brand.addEventListener("click", () => {
    const button = document.querySelector(".textButton");
    onTextButtonClicked(button);
    goHome();
  });

  divBrand.append(brand);
  header.append(divBrand);

  // Se marca el botón inicio como clickado al cargar la página
  const inicioButton = setUpTextButton("Inicio", onTextButtonClicked);
  inicioButton.classList.add("clickedTextButton");
  header.append(inicioButton);

  header.append(setUpTextButton("Explorar", onTextButtonClicked));

  header.append(setUpSearchBar());

  header.append(
    setUpIconButton("fas fa-bell fa-lg", onIconButtonClicked, "Notificaciones")
  );
  header.append(
    setUpIconButton(
      "fas fa-comment-dots fa-lg",
      onIconButtonClicked,
      "Mensajes"
    )
  );
}

/**
 * Función que añade la clase clickedButton al botón de texto clickado para darle estilos
 * @param {*} e evento
 */
function onTextButtonClicked(e) {
  const buttons = document.querySelectorAll(".textButton");
  buttons.forEach((button) => button.classList.remove("clickedTextButton"));

  if (e.target) {
    e.target.classList.add("clickedTextButton");

    // Se cambia de "pantalla" depende del botón
    if (e.target.textContent == "Inicio") {
      goHome();
    } else if (e.target.textContent == "Explorar") {
      goCollections();
    }
  } else {
    e.classList.add("clickedTextButton");
  }
}

/**
 * Función que añade la clase clickedButton al botón con icono clickado para darle estilos
 * @param {*} e evento
 */
function onIconButtonClicked(e) {
  const sidecanvas = document.querySelector(".sidecanvas");

  if (!e.target.classList.contains("clickedIconButton")) {
    const buttons = document.querySelectorAll(".iconButton");
    buttons.forEach((button) => button.classList.remove("clickedIconButton"));
    e.target.classList.add("clickedIconButton");

    sidecanvas.style.width = "350px";
  } else {
    e.target.classList.remove("clickedIconButton");
    sidecanvas.style.width = "0";
  }

  // Se cambia el contenido del sidecanvas depende del botón pulsado
  const clickedButton = document.querySelector(".clickedIconButton");
  if (clickedButton) {
    if (clickedButton.textContent == "Notificaciones") {
      setUpNotificacionesSide();
    } else if (clickedButton.textContent == "Mensajes") {
      setUpMensajesSide();
    }
  }
}

/**
 * Función que redirige a pantalla de inicio
 */
function goHome() {
  const input = document.querySelector("form > input");
  input.value = "";

  setUpCardContainer(undefined, "photos");
  setUpOffCanvasMenu();
}

/**
 * Función que redirige a la pantalla de colecciones
 */
function goCollections() {
  const input = document.querySelector("form > input");
  input.value = "";

  setUpCardContainer(undefined, "collections");
  setUpOffCanvasMenu();
}
