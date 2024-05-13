import {
  Color,
  Component,
  DefaultLoader,
  DisplayMode,
  Engine,
  Entity,
  ImageFiltering,
  ImageSource,
  Keys,
  PointerButton,
  Resolution,
  SpriteSheet,
  TileMap,
} from "excalibur";
import TerrainPath from "../resources/tileset_1bit.png";
import { floor, values } from "lodash";

const Images = {
  Terrain: new ImageSource(TerrainPath, { filtering: ImageFiltering.Pixel }),
};

const loader = new DefaultLoader();
loader.addResources(values(Images));

const game = new Engine({
  antialiasing: false,
  canvasElementId: "game",
  suppressConsoleBootMessage: true,
  pixelArt: true,
  displayMode: DisplayMode.Fixed,
  resolution: Resolution.NES,
  backgroundColor: Color.Transparent,
});

const terrainSpriteSheet = SpriteSheet.fromImageSource({
  image: Images.Terrain,
  grid: {
    columns: 8,
    rows: 8,
    spriteHeight: 16,
    spriteWidth: 16,
  },
});

const level = new TileMap({
  columns: 16,
  rows: 15,
  tileHeight: 16,
  tileWidth: 16,
});

for (const tile of level.tiles) {
  tile.addGraphic(terrainSpriteSheet.getSprite(tile.x % 8, tile.y % 8));
  tile.data.set("clicked", 0);
  tile.data.set("graphicX", tile.x % 8);
  tile.data.set("graphicY", tile.y % 8);

  tile.events.on("pointermove", (event) => {
    // console.log(event);
    const timesClicked = (tile.data.get("clicked") || 0) + 1;
    tile.data.set("clicked", timesClicked);
    const x = tile.data.get("graphicX") + tile.data.get("clicked");
    // console.log(x);
    const y = tile.data.get("graphicY");
    // tile.clearGraphics();
    // tile.addGraphic(terrainSpriteSheet.getSprite(x % 8, y));
  });
}

game.start(loader).then(() => {
  const btn = document.getElementById("custom-button");
  if (!btn) return;
  btn.onclick = () => console.log("drasl");
});
game.currentScene.add(level);

// game.input.pointers.primary.on("down", (evt) => {
//   console.log(evt.coordinates.worldPos.normalize());
// });

/*
game.input.keyboard.on("press", (event) => {
  if (event.key === Keys.Up) {
    console.log("up!");
  }
  if (event.key === Keys.Down) {
    console.log("down!");
  }
});
*/
