var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var mouse = {
    x: 0,
    y: 0
}
var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 7
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
    ],
    /*w: canvas.width / 20,
    get h() { return this.w },
    gap: canvas.width / 400,
    array: [],
    x: 0,
    y: 0,
    get row() { return canvas.height / this.h },
    get col() { return canvas.width / this.w }*/
}

function mouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouse.x = e.clientX - rect.left - root.scrollLeft;
    mouse.y = e.clientY - rect.top - root.scrollTop;
}

function ballReset() {
    for (var i = 0; i < tile.row; i++) {
        for (var j = 0; j < tile.col; j++) {
            if (tile.array[tileIndex(i, j)] == 2) {
                tile.array[tileIndex(i, j)] = 0;
                ball.x = j * tile.w + tile.w / 2 + 1;
                ball.y = i * tile.h + tile.w / 2 + 1;
            }
        }
    }
}

window.onload = function () {
    ballReset();
    setInterval(update, 30);
    canvas.addEventListener("mousemove", mouseMove)
}

function update() {
    moveAll();
    drawAll();
}

function moveAll() {
    //  ballMovement();
    ballBoundsCollision();
    tileCollision();
}
function ballMovement() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
}

function ballBoundsCollision() {
    if (ball.x + ball.radius > canvas.width && ball.speedX > 0)
        ball.speedX *= -1;
    if (ball.x - ball.radius < 0 && ball.speedX < 0)
        ball.speedX *= -1;
    if (ball.y + ball.radius > canvas.height)
        ball.speedY *= -1;
    if (ball.y - ball.radius < 0 && ball.speedY < 0)
        ball.speedY *= -1;
}

function tileIndex(currentRow, currentCol) {
    return tile.col * currentRow + currentCol;
}

function tileCollision() {
    var ballTileCol = Math.floor(ball.x / tile.w);
    var ballTileRow = Math.floor(ball.y / tile.h);
    if (ballTileCol >= 0 && ballTileCol < tile.col &&
        ballTileRow >= 0 && ballTileRow < tile.row) {
        if (tile.array[tileIndex(ballTileRow, ballTileCol)] == 1) {

            var prevBallPosX = ball.x - ball.speedX;
            var prevBallPosY = ball.y - ball.speedY;
            var prevTileCol = Math.floor(prevBallPosX / tile.w);
            var prevTileRow = Math.floor(prevBallPosY / tile.h);

            var bothTestsFailed = true;

            if (prevTileCol != ballTileCol) {
                var adjTileSide = tileIndex(ballTileRow, prevTileCol);
                if (tile.array[adjTileSide] == 0) {
                    ball.speedX *= -1;
                    bothTestsFailed = false;
                }
            }
            if (prevTileRow != ballTileRow) {
                var adjTileTopBot = tileIndex(prevTileRow, ballTileCol)
                if (tile.array[adjTileTopBot] == 0) {
                    ball.speedY *= -1;
                    bothTestsFailed = false;
                }
            }
            if (bothTestsFailed) {
                ball.speedX *= -1;
                ball.speedY *= -1;
            }
        }
    }
}

function drawAll() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawTiles();
    drawCircle(ball.x, ball.y, ball.radius, "white");
    drawCoords();
}
function drawTiles() {
    //  console.log("here");
    for (var i = 0; i < tile.row; i++)
        for (var j = 0; j < tile.col; j++) {
            //console.log(tile.array[tileIndex(i, j)]);
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