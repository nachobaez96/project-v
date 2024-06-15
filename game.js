import Phaser from 'phaser';
import Dude from './dude';
import Ball from './ball';
import { playerMovement } from './functions';
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

        const platforms = this.physics.add.staticGroup();

        this.add.image(700, 300, 'sky').setScale(2);

        platforms.create(700, 690, 'ground').setScale(5).refreshBody();
        platforms.create(350, 490, 'ground').setScale(0.5).refreshBody();
        platforms.create(150, 340, 'ground').setScale(0.5).refreshBody();
        platforms.create(1150, 490, 'ground').setScale(0.5).refreshBody();
        platforms.create(1350, 340, 'ground').setScale(0.5).refreshBody();

        this.player1 = new Dude(this, platforms, 50, 100);
        this.player2 = new Dude(this, platforms, 100, 200);

        this.ball = new Ball(this, platforms, 400, 200);

        this.cursors1 = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player1, this.ball);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.player1.activateHitbox();
        });

        this.physics.add.overlap(this.player1.hitbox, this.ball.body, this.handleHitboxBallCollision, null, this);
        this.physics.add.collider(this.ball.body, platforms, this.handleBallPlatformCollision, null, this)
    }

    update() {
        playerMovement(this.cursors1, this.player1)
        playerMovement(this.cursors2, this.player2)
    }

    handleHitboxBallCollision(hitbox, ball) {
        if (this.player1.hitboxActive) {
            const angle = Phaser.Math.Angle.Between(hitbox.x, hitbox.y, ball.x, ball.y);
            const force = 800;
            ball.setVelocity(Math.cos(angle) * force, Math.sin(angle) * force);
        }
    }

    handleBallPlatformCollision(ball, platform) {
        this.ball.respawn()
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 700,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: true // Enable debug to see hitboxes
        }
    }
};

const game = new Phaser.Game(config);