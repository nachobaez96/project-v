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

        this.add.image(400, 300, 'sky');
        
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.player1 = new Dude(this, platforms, 50, 100);
        this.player2 = new Dude(this, platforms, 100, 200);

        this.ball = new Ball(this, platforms, 200, 200);

        this.cursors1 = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.physics.add.collider(this.player1, this.player2);
        this.physics.add.collider(this.player1, this.ball);
    }

    update() {
        playerMovement(this.cursors1, this.player1)
        playerMovement(this.cursors2, this.player2)
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