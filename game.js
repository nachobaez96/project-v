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

        this.player1 = new Dude(this, platforms, 150, 250);
        this.player2 = new Dude(this, platforms, 100, 200);
        this.player1.opponent = this.player2;
        this.player2.opponent = this.player1;

        this.ball = new Ball(this, platforms, 400, 200);

        this.cursors1 = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.physics.add.collider(this.player1, this.player2)
        this.physics.add.collider(this.ball.body, this.player1.body, () => this.player1.handleBallCollision(this.ball.body), null, this)
        this.physics.add.collider(this.ball.body, this.player2.body, () => this.player2.handleBallCollision(this.ball.body), null, this)
    
        this.input.keyboard.on('keydown-SPACE', () => {
            this.player1.activateHitbox();
        });

        this.physics.add.overlap(this.player1.hitbox, this.ball.body, (hitbox, ball) => {
            this.player1.handleHitboxCollision(ball)
          }, null, this)

        this.physics.add.collider(this.ball.body, platforms, this.handleBallPlatformCollision, null, this)
    

        this.player1Score = 0
        this.player2Score = 0

        this.player1ScoreText = this.add.text(16, 16, 'Player 1: 0', { fontSize: '32px', fill: '#000' })
        this.player2ScoreText = this.add.text(1200, 16, 'Player 2: 0', { fontSize: '32px', fill: '#000' })
    }

    update() {
        playerMovement(this.cursors1, this.player1)
        playerMovement(this.cursors2, this.player2)

        // this.checkBallPosition()
    }

    handleBallPlatformCollision(ball, platform) {
        this.updateScore(ball.x)
        this.ball.respawn()
    }

    // checkBallPosition() {
    //     const ballX = this.ball.body.x
    //     const ballY = this.ball.body.y

    //     // Check if ball touched the ground
    //     if (ballY >= 680) {
    //         this.updateScore(ballX)
    //         this.ball.respawn()
    //     }
    // }

    updateScore(ballX) {
        if (ballX < 750) {
            this.player2Score += 1
            this.player2ScoreText.setText('Player 2: ' + this.player2Score)
        } else {
            this.player1Score += 1
            this.player1ScoreText.setText('Player 1: ' + this.player1Score)
        }
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