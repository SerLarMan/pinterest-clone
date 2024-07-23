import { setUpCabecera } from "./src/components/Cabecera/cabecera";
import { setUpCardContainer } from "./src/components/CardContainer/cardContainer";
import { setUpOffCanvasMenu } from "./src/components/OffCanvasMenu/offCanvasMenu";

const app = document.querySelector("#app");

const header = document.createElement("header");
app.append(header);
setUpCabecera();

const main = document.createElement("main");
app.append(main);
setUpCardContainer(undefined, "photos");
setUpOffCanvasMenu();
