export default class Dude {
    body;

    /* 
    * @param 
    */
    constructor(scene, platforms, positionX, positionY) {
        const particles = scene.add.particles(20, 20, 'dude', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const circle = new Phaser.Geom.Circle(20, 20, 20);

        const graphics = scene.add.graphics({ fillStyle: { color: 0xff0000 } });
        graphics.fillCircleShape(circle);

        graphics.setPosition(positionX, positionY);

        this.body = scene.physics.add.existing(graphics).body;

        this.body.setCircle(20);

        // this.body.setBounce(1);
        this.body.setCollideWorldBounds(true);

        particles.startFollow(this.body);

        scene.physics.add.collider(this.body, platforms);
    }
}
