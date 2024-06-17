export default class Dude {
    body;
    hitbox;
    hitboxActive = false;
    consecutiveTouches = 0
    lastTouchTime = 0
    hitboxActivatedTime = 0

    /* 
    * @param 
    */
    constructor(scene, platforms, positionX, positionY, opponent) {
        this.scene = scene

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
        // this.hitbox.body.setImmovable(true);

        this.scene = scene
        this.opponent = opponent
    }

    activateHitbox() {
        this.hitbox.setVisible(true)
        this.hitboxActive = true
        this.hitboxActivatedTime = this.scene.time.now
        this.hitbox.body.reset(this.body.x + 20, this.body.y + 20)
        this.hitbox.setPosition(this.body.x + 20, this.body.y + 20)

        setTimeout(() => {
            this.hitbox.setVisible(false)
            this.hitboxActive = false
        }, 200)
    }

    resetTouches() {
        this.consecutiveTouches = 0
    }

    registerTouch() { // REMOVE
        const currentTime = this.scene.time.now
        if (currentTime - this.lastTouchTime > 2000) {
            this.consecutiveTouches = 0
        }
        this.consecutiveTouches += 1
        this.lastTouchTime = currentTime
    }

    handleBallCollision(ball) {
        this.registerTouch()

        this.opponent.resetTouches()

        if (this.consecutiveTouches > 2) {
            this.scene.updateScore(this === this.scene.player1 ? this.scene.ball.body.x + 1000 : this.scene.ball.body.x - 1000)
            this.scene.ball.respawn()
            this.resetTouches()
            this.opponent.resetTouches()
        } else if (!this.hitboxActive) {
            let force = 200
            const angle = Phaser.Math.Angle.Between(this.body.x, this.body.y, ball.x, ball.y)
            ball.setVelocity(Math.cos(angle) * force, Math.sin(angle) * force)
        }
    }

    handleHitboxCollision(ball) { // ARREGLARAIROAJEOIAJDFLKASLDFNAESJFNALSFNLGE
        this.registerTouch()

        this.opponent.resetTouches()

        if (this.consecutiveTouches > 2) {
            this.scene.updateScore(this === this.scene.player1 ? this.scene.ball.body.x + 1000 : this.scene.ball.body.x - 1000)
            this.scene.ball.respawn()
            this.resetTouches()
            this.opponent.resetTouches()
        }

        const elapsed = this.scene.time.now - this.hitboxActivatedTime
        let force
        if (elapsed <= 20) {
            force = 800
        } else if (elapsed <= 100) {
            force = 600
        } else {
            force = 400
        }
        const angle = Phaser.Math.Angle.Between(this.hitbox.x, this.hitbox.y, ball.x, ball.y)
        ball.setVelocity(Math.cos(angle) * force, Math.sin(angle) * force)
    }
}