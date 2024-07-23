import Phaser from "phaser";
import StartScreen from "./StartScreen";
import GameScene from "./GameScene";

const config = {
  type: Phaser.AUTO,
  width: 1500,
  height: 700,
  scene: [StartScreen, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: true, // Enable debug to see hitboxes
    },
  },
};

const game = new Phaser.Game(config);
