import Phaser from "phaser";

class StartScreen extends Phaser.Scene {
  constructor() {
    super({ key: "StartScreen" });
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
  }

  create() {
    this.add.image(700, 300, "sky").setScale(2);
    this.add
      .text(750, 200, "Instructions:", { fontSize: "32px", fill: "#000" })
      .setOrigin(0.5);
    this.add
      .text(750, 250, "Player 1: Use arrow keys to move", {
        fontSize: "24px",
        fill: "#000",
      })
      .setOrigin(0.5);
    this.add
      .text(750, 280, "Player 2: Use W, A, S, D keys to move", {
        fontSize: "24px",
        fill: "#000",
      })
      .setOrigin(0.5);
    this.add
      .text(750, 310, "Press SPACE to activate hitbox", {
        fontSize: "24px",
        fill: "#000",
      })
      .setOrigin(0.5);

    const startButton = this.add
      .text(750, 400, "START", { fontSize: "32px", fill: "#000" })
      .setOrigin(0.5);
    startButton.setInteractive();

    startButton.on("pointerdown", () => {
      this.scene.start("Example");
    });
  }
}

export default StartScreen;
