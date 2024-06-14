export const playerMovement = (cursors, player1) => {
    if (cursors.left.isDown) {
        player1.body.setVelocityX(-360);
    }
    else if (cursors.right.isDown) {
        player1.body.setVelocityX(360);
    }
    else {
        player1.body.setVelocityX(0);
    }

    if (cursors.up.isDown && player1.body.touching.down) {
        player1.body.setVelocityY(-480);
    }
}