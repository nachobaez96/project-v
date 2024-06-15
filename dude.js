export default class Dude {
    body;
    hitbox;
    hitboxActive = false;

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

        // HITBOX

        this.hitbox = scene.add.circle(positionX, positionY, 30, 0xff00ff, 0.5);
        this.hitbox.setVisible(false);
        scene.physics.add.existing(this.hitbox);
        this.hitbox.body.setCircle(30);
        this.hitbox.body.setAllowGravity(false);
        this.hitbox.body.setImmovable(true);
    }

    activateHitbox() {
        this.hitbox.setVisible(true);
        this.hitboxActive = true;
        this.hitbox.body.reset(this.body.x + 20, this.body.y + 20);
        this.hitbox.setPosition(this.body.x + 20, this.body.y + 20);

        setTimeout(() => {
            this.hitbox.setVisible(false);
            this.hitboxActive = false;
        }, 200);
    }
}

