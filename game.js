import Phaser from 'phaser'
class Example extends Phaser.Scene {

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');

        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.platforms = this.physics.add.staticGroup();


        this.add.image(400, 300, 'sky');

        const particles = this.add.particles(0, 0, 'dude', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const circle = new Phaser.Geom.Circle(0, 0, 20);

        const graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
        graphics.fillCircleShape(circle);

        this.dude = this.physics.add.existing(graphics).body

        // this.dude.setCircle(100)

        this.dude.position.x = 400
        this.dude.position.y = 300

        // this.dude.isCircle = true

        
        this.dude.setBounce(0, 0);
        this.dude.setCollideWorldBounds(true);

        particles.startFollow(this.dude);

        this.cursors = this.input.keyboard.createCursorKeys()

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.physics.add.collider(this.dude, this.platforms);

    }

    update() {
        if (this.cursors.left.isDown) {
            this.dude.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown) {
            this.dude.setVelocityX(160);
        }
        else {
            this.dude.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.dude.touching.down) {
            this.dude.setVelocityY(-330);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};

const game = new Phaser.Game(config);