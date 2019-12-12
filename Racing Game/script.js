var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var mouse = {
    x: 0,
    y: 0
}

const key = {
    left: false,
    up: false,
    right: false,
    down: false
}

var car = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 0,
    pic: document.createElement("img"),
    picLoaded: false,
    ang: 0,
    angSpeed: 0.04,
    velocity: 0.3
}

var tile = {
    w: 40,
    h: 40,
    gap: 2,
    row: 15,
    col: 20,
    array: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]
}

function mouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouse.x = e.clientX - rect.left - root.scrollLeft;
    mouse.y = e.clientY - rect.top - root.scrollTop;
}

function keyPress(e) {
    e.preventDefault();
    if (e.key == "ArrowLeft" || e.key == "A" || e.key == "a")
        key.left = true;
    if (e.key == "ArrowRight" || e.key == "D" || e.key == "d")
        key.right = true;
    if (e.key == "ArrowUp" || e.key == "W" || e.key == "w")
        key.up = true;
    if (e.key == "ArrowDown" || e.key == "S" || e.key == "s")
        key.down = true;
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
}

function keyRelease(e) {
    if (e.key == "ArrowLeft" || e.key == "A" || e.key == "a")
        key.left = false;
    if (e.key == "ArrowRight" || e.key == "D" || e.key == "d")
        key.right = false;
    if (e.key == "ArrowUp" || e.key == "W" || e.key == "w")
        key.up = false;
    if (e.key == "ArrowDown" || e.key == "S" || e.key == "s")
        key.down = false;
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
}

window.onload = function () {
    carReset();
    setInterval(update, 30);
    canvas.addEventListener("mousemove", mouseMove);
    car.pic.onload = function () {
        car.picLoaded = true;
    }
    car.pic.src = "car.png";

    document.addEventListener("keydown", keyPress);
    document.addEventListener("keyup", keyRelease);
}

function carReset() {
    for (var i = 0; i < tile.row; i++) {
        for (var j = 0; j < tile.col; j++) {
            if (tile.array[tileIndex(i, j)] == 2) {
                tile.array[tileIndex(i, j)] = 0;
                car.ang = -Math.PI / 2;
                car.x = j * tile.w + tile.w / 2 + 1;
                car.y = i * tile.h + tile.w / 2 + 1;
            }
        }
    }
}

function update() {
    moveAll();
    drawAll();
}

function moveAll() {
    carMovement();
    tileCollision();
}

function carMovement() {
    car.speed *= 0.97;
    console.log(car.speed);
    if (key.left)
        car.ang -= car.angSpeed;
    if (key.right)
        car.ang += car.angSpeed;
    if (key.up)
        car.speed += car.velocity;
    if (key.down)
        car.speed -= car.velocity;
    /*
    switch (true) {
        case key.left:
            car.ang -= car.angSpeed;
            break;
            case key.right:
                car.ang += car.angSpeed;
                break;
                case key.up:
                    car.speed += car.velocity;
                    break;
                    case key.down:
            car.speed -= car.velocity;
            break;
            case !key.up && !key.down && (car.speed > 0 || car.speed < 0):
            car.speed *= 0.90;
            break;
        }
     */

car.x += Math.cos(car.ang) * car.speed;
car.y += Math.sin(car.ang) * car.speed;
}

function tileIndex(currentRow, currentCol) {
    return tile.col * currentRow + currentCol;
}

function tileCollision() {
    var carTileCol = Math.floor(car.x / tile.w);
    var carTileRow = Math.floor(car.y / tile.h);
    if (carTileCol >= 0 && carTileCol < tile.col &&
        carTileRow >= 0 && carTileRow < tile.row) {
        if (tile.array[tileIndex(carTileRow, carTileCol)]) {
            car.x -= Math.cos(car.ang) * car.speed;
            car.y -= Math.sin(car.ang) * car.speed;
            car.speed *= -0.5;
        }
    }
}

function drawAll() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawTiles();
    drawBitmapCenteredWithAngle(car.pic, car.x, car.y, car.ang);
    //drawCircle(car.x, car.y, car.radius, "white");
    drawCoords();
}

function drawBitmapCenteredWithAngle(pic, x, y, ang) {
    ctx.save()
    ctx.translate(x, y);
    ctx.rotate(ang);
    if (car.picLoaded)
        ctx.drawImage(pic, -pic.width / 2, -pic.height / 2);
    ctx.restore();
}

function drawTiles() {
    for (var i = 0; i < tile.row; i++)
        for (var j = 0; j < tile.col; j++) {
            if (tile.array[tileIndex(i, j)] == 1)
                drawRect(tile.w * j + 1, tile.h * i + 1, tile.w - tile.gap, tile.h - tile.gap, "blue");
        }
}

function drawRect(x, y, w, h, c) {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, c) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    ctx.fill();
}

function drawCoords() {
    ctx.fillStyle = "orange";
    ctx.font = "bold 15px Comic Sans"
    var rowCoords = Math.floor(mouse.y / tile.h);
    var colCoords = Math.floor(mouse.x / tile.w);
    ctx.fillText(rowCoords + "." + colCoords + ":" + tileIndex(rowCoords, colCoords), mouse.x + 2, mouse.y - 2);
}