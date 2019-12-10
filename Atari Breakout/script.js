var canvas;
var ctx;

var mouseX;
var mouseY;

var brick = {
    width: 80,
    height: 20,
    rows: 15,
    cols: 10,
    array: new Array(),
    gap: 2,
    remaining: this.rows * this.cols
};

var ball = {
    x: document.getElementById("gameCanvas").width / 2,
    y: document.getElementById("gameCanvas").width / 2,
    speedX: 10,
    speedY: 7,
    radius: 10,
    color: "white",
    draw: function () { drawCircle(this.x, this.y, this.radius, this.color) }
}

var paddle = {
    x: 800 / 2 - 50,
    y: 600 - 15 - 30,
    width: 100,
    height: 15,
    color: "white",
    draw: function () { drawRect(this.x, this.y, this.width, this.height, this.color) }
}

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;
}

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    var FPS = 33;
    resetBricks();
    setInterval(update, 1000 / FPS);
    canvas.addEventListener("mousemove", function (evt) {
        calculateMousePos(evt);
        paddle.x = mouseX - paddle.width / 2;
      /*  ball.x = mouseX;
        ball.y = mouseY;
        ball.speedX = 4;
        ball.speedY = -4;*/
    });
}
function update() {
    moveAll();
    drawAll();
}

function moveAll() {
    ballMovement();
    brickCollision();
    paddleCollision();
}
function ballMovement() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
}
function brickCollision() {
    var ballBrickCol = Math.floor(ball.x / brick.width);
    var ballBrickRow = Math.floor(ball.y / brick.height);
    if (ballBrickCol >= 0 && ballBrickCol < brick.cols &&
        ballBrickRow >= 0 && ballBrickRow < brick.rows) {
        if (brick.array[brickIndex(ballBrickRow, ballBrickCol)]) {
            brick.array[brickIndex(ballBrickRow, ballBrickCol)] = false;

            brick.remaining--;

            var prevBallPosX = ball.x - ball.speedX;
            var prevBallPosY = ball.y - ball.speedY;
            var prevBrickCol = Math.floor(prevBallPosX / brick.width);
            var prevBrickRow = Math.floor(prevBallPosY / brick.height);

            var bothTestsFailed = true;

            if (prevBrickCol != ballBrickCol) {
                var adjBrickSide = brickIndex(ballBrickRow, prevBrickCol);
                if (brick.array[adjBrickSide] == false) {
                    ball.speedX *= -1;
                    bothTestsFailed = false;
                }
            }
            if (prevBrickRow != ballBrickRow) {
                var adjBrickTopBot = brickIndex(prevBrickRow, ballBrickCol)
                if (brick.array[adjBrickTopBot] == false) {
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
function paddleCollision() {

    if (ball.x + ball.radius >= paddle.x && ball.x - ball.radius <= paddle.x + paddle.width &&
        ball.y + ball.radius >= paddle.y && ball.y + ball.radius <= paddle.y + paddle.height) {
        ball.speedY *= -1;
        var deltaX = ball.x - (paddle.x + paddle.width / 2);
        ball.speedX = deltaX * 0.35;
        if (brick.remaining == 0) {
            resetBricks();
            resetBall();
        }
    }
    //bounds collision
    if (ball.x + ball.radius > canvas.width && ball.speedX > 0)
        ball.speedX *= -1;
    if (ball.x - ball.radius < 0 && ball.speedX < 0)
        ball.speedX *= -1;
    if (ball.y + ball.radius > canvas.height) {
        resetBall();
        resetBricks();
    }
    if (ball.y - ball.radius < 0 && ball.speedY < 0)
        ball.speedY *= -1;
}
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX *= -1;
    ball.speedY = 7;
}

function resetBricks() {
    brick.remaining = 0;
    var i;
    for (i = 0; i < brick.cols * 3; i++)
        brick.array[i] = false;
    for (; i < (brick.rows - 1) * brick.cols; i++) {
        brick.remaining++;
        brick.array[i] = true;
    }
    for (; i < brick.rows * brick.cols; i++)
        brick.array[i] = false;
}

function drawAll() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    paddle.draw();
    ball.draw();
    drawBricks();
    var mouseBrickCol = Math.floor(mouseX / brick.width);
    var mouseBrickRow = Math.floor(mouseY / brick.height);
    drawMouseCoordinates(mouseBrickCol + "." + mouseBrickRow + ":" + brickIndex(mouseBrickRow, mouseBrickCol), mouseX + 2, mouseY - 2, "yellow");
}
function drawBricks() {
    for (var i = 0; i < brick.rows; i++) {
        for (var j = 0; j < brick.cols; j++) {
            var arrayIndex = brickIndex(i, j);
            if (brick.array[arrayIndex]) {
                drawRect(brick.width * j, brick.height * i, brick.width - brick.gap, brick.height - brick.gap, "orange");
            }
        }
    }
}
function brickIndex(row, col) {
    return brick.cols * row + col;
}
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fill();
}

function drawMouseCoordinates(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}