/*
var mouse = {
    Move: function (e) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        mouse.x = e.clientX - rect.left - root.scrollLeft;
        mouse.y = e.clientY - rect.top - root.scrollTop;
    }
}
*/

const key = {

    KeyPressHelper: function (e, bool, car) {
        if (e.keyCode == car.input.left)
            car.key.left = bool;
        if (e.keyCode == car.input.up)
            car.key.up = bool;
        if (e.keyCode == car.input.right)
            car.key.right = bool;
        if (e.keyCode == car.input.down)
            car.key.down = bool;
        /*
        if (e.key == "ArrowLeft")
            blueCar.key.left = bool;
        if (e.key == "ArrowRight")
            blueCar.key.right = bool;
        if (e.key == "ArrowDown")
            blueCar.key.down = bool;
        if (e.key == "ArrowUp")
            blueCar.key.up = bool;

        if (e.key == "A" || e.key == "a")
            greenCar.key.left = bool;
        if (e.key == "D" || e.key == "d")
            greenCar.key.right = bool;
        if (e.key == "W" || e.key == "w")
            greenCar.key.up = bool;
        if (e.key == "S" || e.key == "s")
            greenCar.key.down = bool;
            */
    },
    Press: function (e) {
        e.preventDefault();
        key.KeyPressHelper(e, true, blueCar);
        key.KeyPressHelper(e, true, greenCar);
        /*
        e.key == "ArrowLeft" || e.key == "A" || e.key == "a" ? key.left = true : 0;
        e.key == "ArrowRight" || e.key == "D" || e.key == "d" ? key.right = true : 0;
        e.key == "ArrowUp" || e.key == "W" || e.key == "w" ? key.up = true : 0;
        e.key == "ArrowDown" || e.key == "S" || e.key == "s" ? key.down = true : 0;
        */
        /*
        switch (e.key) {
            case "a":
            case "A":
            case "ArrowLeft":
                key.left = true;
                break;
            case "d":
            case "D":
            case "ArrowRight":
                key.right = true;
                break;
            case "w":
            case "W":
            case "ArrowUp":
                key.up = true;
                break;
            case "s":
            case "S":
            case "ArrowDown":
                key.down = true;
                break;
        }*/
    },

    Release: function (e) {
        key.KeyPressHelper(e, false, blueCar);
        key.KeyPressHelper(e, false, greenCar);
        /*
        switch (e.key) {
            case "a":
            case "A":
            case "ArrowLeft":
                key.left = false;
                break;
            case "d":
            case "D":
            case "ArrowRight":
                key.right = false;
                break;
            case "w":
            case "W":
            case "ArrowUp":
                key.up = false;
                break;
            case "s":
            case "S":
            case "ArrowDown":
                key.down = false;
                break;
        }
        */
    },
}

class Car {
    x = document.getElementById("gameCanvas").width / 2;
    y = document.getElementById("gameCanvas").height / 2;
    speed = 0;
    ang = 0;
    angSpeed = 0.06;
    velocity = 0.3;
    friction = 0.97;
    collisionFriction = -0.5;
    minimumSpeed = 0.5;

    pic = document.createElement("img");

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

        this.speed = 0;

        for (var i = 0; i < tile.row; i++) {
            for (var j = 0; j < tile.col; j++) {
                if (tile.array[tile.Index(i, j)] == tile.type.playerLocation.code) {
                    tile.array[tile.Index(i, j)] = tile.type.empty.code;
                    this.ang = -Math.PI / 2;
                    this.x = j * tile.w + tile.w / 2;
                    this.y = i * tile.h + tile.w / 2;
                    return;
                }
            }
        }
    }

    Movement = function () {
        this.speed *= this.friction;

        if (this.key.up)
            this.speed += this.velocity;
        if (this.key.down)
            this.speed -= this.velocity;
        if (Math.abs(this.speed) > this.minimumSpeed) {
            if (this.key.left)
                this.ang -= this.angSpeed;
            if (this.key.right)
                this.ang += this.angSpeed;
        }
        /*
        switch (true) {
            case key.left:
                this.ang -= this.angSpeed;
                break;
                case key.right:
                    this.ang += this.angSpeed;
                    break;
                    case key.up:
                        this.speed += this.velocity;
                        break;
                        case key.down:
                this.speed -= this.velocity;
                break;
                case !key.up && !key.down && (this.speed > 0 || this.speed < 0):
                this.speed *= 0.90;
                break;
            }
         */

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;

        tile.Collision(this);
    }
    Draw = function () {
        drawBitmapCenteredWithAngle(this.pic, this.x, this.y, this.ang);
    }
}

/*car = {
    x: document.getElementById("gameCanvas").width / 2,
    y: document.getElementById("gameCanvas").height / 2,
    speed: 0,
    ang: 0,
    angSpeed: 0.06,
    velocity: 0.3,
    friction: 0.97,
    collisionFriction: -0.5,
    minimumSpeed: 0.5,

    Reset: function () {
        for (var i = 0; i < tile.row; i++) {
            for (var j = 0; j < tile.col; j++) {
                if (tile.array[tile.Index(i, j)] == tile.type.playerLocation.code) {
                    tile.array[tile.Index(i, j)] = tile.type.empty.code;
                    this.ang = -Math.PI / 2;
                    this.x = j * tile.w + tile.w / 2;
                    this.y = i * tile.h + tile.w / 2;
                }
            }
        }
    },

    Movement: function () {
        this.speed *= this.friction;

        if (key.up)
            this.speed += this.velocity;
        if (key.down)
            this.speed -= this.velocity;
        if (Math.abs(this.speed) > this.minimumSpeed) {
            if (key.left)
                this.ang -= this.angSpeed;
            if (key.right)
                this.ang += this.angSpeed;
        }
        /*
        switch (true) {
            case key.left:
                this.ang -= this.angSpeed;
                break;
                case key.right:
                    this.ang += this.angSpeed;
                    break;
                    case key.up:
                        this.speed += this.velocity;
                        break;
                        case key.down:
                this.speed -= this.velocity;
                break;
                case !key.up && !key.down && (this.speed > 0 || this.speed < 0):
                this.speed *= 0.90;
                break;
            }
         * /

        this.x += Math.cos(this.ang) * this.speed;
        this.y += Math.sin(this.ang) * this.speed;
    },
}

*/

/* Object copy methods : 

==SHALLOW COPY== (these two methods are short and very useful one, but it won't work out when you're having nested object in your object to be copied)

var clonedObj = { ...obj };

var clonedObj = Object.assign({}, obj);

==DEEP copy== (deepClone object won't have any effect if the main source object obj is modified and vice-versa)
--it does not copy methods => better use classes

let deepClone = JSON.parse(JSON.stringify(obj));
*/


var tile = {
    w: 40,
    h: 40,
    gap: 2,
    row: 15,
    col: 20,
    levelOne: [
        /*
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        */
        4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 4, 1, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 4, 4, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1

    ],
    array: [],

    wallColor: "blue",
    type: {
        empty: { code: 0, file: "empty.png" },
        wall: { code: 1, file: "wall.png" },
        playerLocation: { code: 2 },
        goal: { code: 3, file: "goal.png" },
        trees: { code: 4, file: "trees.png" },
        flag: { code: 5, file: "flag.png" }
    },

    Index: function (currentRow, currentCol) {
        return tile.col * currentRow + currentCol;
    },

    Collision: function (player) {
        var carTileCol = Math.floor(player.x / tile.w);
        var carTileRow = Math.floor(player.y / tile.h);

        if (carTileCol >= 0 && carTileCol < tile.col &&
            carTileRow >= 0 && carTileRow < tile.row) {

            tileTypeHere = tile.array[tile.Index(carTileRow, carTileCol)];

            if (tileTypeHere == tile.type.goal.code) {
                console.log("The " + (player == greenCar ? "green " : "blue ") + "car wins!");
                loadLevel(tile.levelOne);
            }
            else if (tileTypeHere != tile.type.empty.code) {
                this.CollisionKnockback(player);
            }
        }
    },

    CollisionKnockback: function (player) {
        player.x -= Math.cos(player.ang) * player.speed;
        player.y -= Math.sin(player.ang) * player.speed;
        player.speed *= player.collisionFriction;
    }

}
