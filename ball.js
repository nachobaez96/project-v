export default class Ball {
    body;
    initialX;
    initialY;

    /* 
    * @param 
    */
    constructor(scene, platforms, positionX, positionY) {

        const circle = new Phaser.Geom.Circle(10, 10, 10);

        const graphics = scene.add.graphics({ fillStyle: { color: 0x000000 } });
        graphics.fillCircleShape(circle);

        graphics.setPosition(positionX, positionY);

        this.body = scene.physics.add.existing(graphics).body;

        this.body.setCircle(10);

        this.body.setBounce(0.5);
        this.body.setCollideWorldBounds(true);

        scene.physics.add.collider(this.body, platforms);

        this.initialX = positionX
        this.initialY = positionY
    }

    respawn() {
      this.body.reset(this.initialX, this.initialY)
    }
  }