const key = {

    KeyPressHelper: function (e, bool) {
        if (e.keyCode == player.input.left)
            player.key.left = bool;
        if (e.keyCode == player.input.up)
            player.key.up = bool;
        if (e.keyCode == player.input.right)
            player.key.right = bool;
        if (e.keyCode == player.input.down)
            player.key.down = bool;
    },
    Press: function (e) {
        e.preventDefault();
        key.KeyPressHelper(e, true);
    },

    Release: function (e) {
        key.KeyPressHelper(e, false);
    },
}

class Player {

    pic = document.createElement("img");

    x = 0;
    y = 0;
    speedX = 0;
    speedY = 0;
    velocity = 0.9;
    friction = 0.9;
    collisionFriction = 0.2;
    keys = 0;

    winTimer = 0;

    key = {
        left: false,
        up: false,
        right: false,
        down: false
    }

    input = {
        left: undefined,
        up: undefined,
        right: undefined,
        down: undefined
    }

    SetupInput = function (left, up, right, down) {
        this.input.left = left;
        this.input.up = up;
        this.input.right = right;
        this.input.down = down;
    }

    Reset = function () {

        this.speedX = 0;
        this.speedY = 0;

        for (var i = 0; i < block.row; i++) {
            for (var j = 0; j < block.col; j++) {
                if (block.array[block.Index(i, j)] == block.type.playerLocation.code) {
                    block.array[block.Index(i, j)] = block.type.empty.code;
                    this.x = j * block.w + block.w / 2;
                    this.y = i * block.h + block.w / 2;
                    return;
                }
            }
        }
    }

    Movement = function () {
        this.speedX *= this.friction;
        this.speedY *= this.friction;

        if (this.key.up)
            this.speedY -= this.velocity;
        if (this.key.down)
            this.speedY += this.velocity;
        if (this.key.left)
            this.speedX -= this.velocity;
        if (this.key.right)
            this.speedX += this.velocity;

        var nextX = this.x;
        var nextY = this.y;

        nextX += this.speedX;
        nextY += this.speedY;

        block.Collision(nextX, nextY);
    }

    Draw = function () {
        drawBitmapCenteredWithAngle(this.pic, this.x, this.y, 0);
    }
}


var block = {
    w: 50,
    h: 50,
    row: document.getElementById("gameCanvas").height / 50,
    col: document.getElementById("gameCanvas").width / 50,
    levelOne: [

        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 4, 0, 0, 4, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 4, 0, 0, 4, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 4, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 5, 0, 0, 5, 0, 0, 5, 0, 3, 0, 1, 0, 4, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    array: [],

    type: {
        empty: { code: 0, file: "empty.png" },
        wall: { code: 1, file: "wall.png" },
        playerLocation: { code: 2 },
        cup: { code: 3, file: "cup.png", transparency: true },
        key: { code: 4, file: "key2.png", transparency: true },
        door: { code: 5, file: "door.png", transparency: true }
    },

    Index: function (currentRow, currentCol) {
        return block.col * currentRow + currentCol;
    },
    removeBlock: function (rowY, rowX) {
        block.array[block.Index(rowY, rowX)] = block.type.empty.code;
    },
    Collision: function (nextX, nextY) {

        var playerblockCol = Math.floor(nextX / block.w);
        var playerblockRow = Math.floor(nextY / block.h);

        if (playerblockCol >= 0 && playerblockCol < block.col &&
            playerblockRow >= 0 && playerblockRow < block.row) {

            blockTypeHere = block.array[block.Index(playerblockRow, playerblockCol)];

            if (blockTypeHere == block.type.cup.code) {
                player.winTimer = 5 * FPS; //5 seconds, 30 frames

                loadLevel(block.levelOne);
            }

            else if (blockTypeHere == block.type.key.code) {
                this.removeBlock(playerblockRow, playerblockCol);
                player.keys++;
            }

            else if (blockTypeHere == block.type.door.code && player.keys > 0) {
                player.keys--;
                this.removeBlock(playerblockRow, playerblockCol);
            }

            else if (blockTypeHere != block.type.empty.code) {
                this.CollisionKnockback(playerblockCol, playerblockRow);
            }

            else {
                player.x = nextX;
                player.y = nextY;
            }
        }
    },

    CollisionKnockback: function (playerblockCol, playerblockRow) {
        var prevPlayerPosX = player.x - player.speedX;
        var prevPlayerPosY = player.y - player.speedY;
        var prevblockCol = Math.floor(prevPlayerPosX / block.w);
        var prevblockRow = Math.floor(prevPlayerPosY / block.h);

        if (prevblockCol != playerblockCol) {

            var adjacentblockType = this.Index(playerblockRow, prevblockCol);

            if (block.array[adjacentblockType] == block.type.empty.code)
                player.speedX *= -1;
        }
        if (prevblockRow != playerblockRow) {

            var adjacentblockType = this.Index(prevblockRow, playerblockCol);

            if (block.array[adjacentblockType] == block.type.empty.code)
                player.speedY *= -1;
        }
        player.speedX *= player.collisionFriction;
        player.speedY *= player.collisionFriction;
        // console.log(prevblockCol, prevblockRow);
        //console.log(playerblockCol, playerblockRow);
    }

}
console.log(block);