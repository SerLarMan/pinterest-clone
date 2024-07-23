import { setUpUserInfo } from "../UserInfo/userInfo";
import { setUpIconButton } from "../IconButton/iconButton";

import "../../styles/global.scss";
import "./imageCard.scss";

export function setUpImageCard(image) {
  const imageCard = document.createElement("article");
  imageCard.classList.add("imageCard");

  const h3 = document.createElement("h3");
  h3.textContent = "Imagen";
  h3.classList.add("hidden");

  const img = document.createElement("img");
  img.src = image.urls.thumb;
  img.classList.add("displayImage");

  const downloadButton = setUpIconButton("fas fa-download fa-lg", downloadImage, 'Descargar');
  downloadButton.classList.add("downloadButton");
  downloadButton.download = image.links.download;

  imageCard.append(h3);
  imageCard.append(img);
  imageCard.append(setUpUserInfo(image.user));
  imageCard.append(downloadButton);
  return imageCard;
}

function downloadImage(e) {
  window.open(e.currentTarget.download, "_blank");
}
