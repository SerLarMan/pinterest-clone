import { setUpImageCard } from "../ImageCard/imageCard";
import { setUpCollectionCard } from "../CollectionCard/collectionCard";

import "../../styles/global.scss";
import "./cardContainer.scss";

const CLIENTID = "vHkgxEBcvsBZ7kmjwUB5t-0IY0oxZnajPAiPa6dZlwg";
const UNSPLASH_ROOT = "https://api.unsplash.com";

/**
 * Función que obtiene las imagenes de una búsqueda de la apì
 * @param {*} query
 * @param {*} type
 * @returns
 */
async function getImages(query, type) {
  const res = await fetch(
    `${UNSPLASH_ROOT}/search/${type}?query=${query}&client_id=${CLIENTID}&per_page=20`
  );

  return await res.json();
}

/**
 * Función que obtiene las imagenes de una colección de la api
 * @param {*} id
 * @returns
 */
async function getCollectionImages(id) {
  const res = await fetch(
    `${UNSPLASH_ROOT}/collections/${id}/photos?client_id=${CLIENTID}&per_page=20`
  );

  return await res.json();
}

function generateImageColumns(images, columnCount, type) {
  const colsHeights = Array(columnCount).fill(0);
  const cols = [...Array(columnCount)].map(() => []);

  images.forEach((image) => {
    const realImage = type == "photos" ? image : image.cover_photo;

    // Se saca la columna con menos "altura" y el índice de esa columna
    const smallestHeight = Math.min(...colsHeights);
    const indexOfSmallestHeight = colsHeights.indexOf(Math.min(...colsHeights));

    // En la columna con menos "altura" se mete la imagen
    const smallestColumn = cols[indexOfSmallestHeight];
    smallestColumn.push(realImage);

    // Se saca la altura de la imagen que se acaba de meter y se actualiza la "altura" de la columna
    const height = getRelativeImageHeight(realImage, 200);
    colsHeights[indexOfSmallestHeight] = smallestHeight + height;
  });

  return cols;
}

/**
 * Función que calcula la altura relativa de cada imagen dependiendo de si ancho
 * @param {*} image
 * @param {*} targetWidth
 * @returns
 */
function getRelativeImageHeight(image, targetWidth) {
  const widthQuotient = targetWidth / image.width;
  const relativeHeight = widthQuotient * image.height;

  return relativeHeight;
}

/**
 * Función que añade a cada columna imagenes o colecciones
 * @param {*} col
 * @param {*} type
 * @param {*} images
 * @returns
 */
function renderColumn(col, type, images) {
  const colDiv = document.createElement("div");
  colDiv.classList.add("column");

  col.forEach((image) => {
    type == "photos"
      ? colDiv.append(setUpImageCard(image))
      : colDiv.append(setUpCollectionCard(image, images));
  });

  return colDiv;
}

export function setUpCardContainer(query, type) {
  const main = document.querySelector("main");
  main.textContent = "";

  const container = document.createElement("section");
  container.classList.add("container");

  // Query a la API de unsplash
  const images = [];
  getImages(query, type).then((imagesPromise) => {
    if (imagesPromise.results.length == 0) {
      const h2 = document.createElement("h2");
      h2.textContent =
        "Parece que tu búsqueda no ha tenido muchos resultado. Prueba con otra cosa.";

      container.append(h2);
    } else {
      imagesPromise.results.forEach((res) => images.push(res));

      const columnsCount = 7;
      const imageColumns = generateImageColumns(images, columnsCount, type);

      const h2 = document.createElement("h2");
      type == "photos"
        ? (h2.textContent = "Disfruta de nuestras imagenes")
        : (h2.textContent = "Explora nuestra variedad de colecciones");
      container.append(h2);

      const div = document.createElement("div");
      div.classList.add("colContainer");
      imageColumns.forEach((col) => {
        div.append(renderColumn(col, type, images));
      });
      container.append(div);
    }

    main.append(container);
  });
}

export function setUpCardContainerByCollection(id) {
  const main = document.querySelector("main");
  main.textContent = "";

  const container = document.createElement("section");
  container.classList.add("container");

  // Query a la API de unsplash
  const images = [];
  getCollectionImages(id).then((imagesPromise) => {
    if (imagesPromise.results.length == 0) {
      const h2 = document.createElement("h2");
      h2.textContent =
        "Parece que tu búsqueda no ha tenido muchos resultado. Prueba con otra cosa.";

      container.append(h2);
    } else {
      imagesPromise.forEach((res) => images.push(res));

      const columnsCount = 7;
      const imageColumns = generateImageColumns(images, columnsCount, "photos");

      const h2 = document.createElement("h2");
      h2.textContent = "Disfruta de las imagenes de la colección";
      container.append(h2);

      const div = document.createElement("div");
      div.classList.add("colContainer");
      imageColumns.forEach((col) => {
        div.append(renderColumn(col, "photos"));
      });
      container.append(div);
    }

    main.append(container);
  });
}
