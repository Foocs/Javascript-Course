var canvas, ctx;

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    drawRect(0, 0, canvas.width, canvas.height, "black"); //loadscreen
    loadImages();
    /*
    car.pic.onload = function () {
        car.picLoaded = true;
    }
    car.pic.src = "car.png";
    */
}

function imageLoadingDoneSoStartGame() {
    setupInput();
    car.Reset();
    setInterval(update, 30);
}

function setupInput() {
    //canvas.addEventListener("mousemove", mouse.Move);
    document.addEventListener("keydown", key.Press);
    document.addEventListener("keyup", key.Release);
}

function update() {
    moveAll();
    drawAll();
}

function moveAll() {
    car.Movement();
    tile.Collision();
}

function drawAll() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawTiles();
    drawCar();
    //drawCoords();
}

function drawCar() {
    drawBitmapCenteredWithAngle(car.pic, car.x, car.y, car.ang);
}

function drawTiles() {
    for (var i = 0; i < tile.row; i++)
        for (var j = 0; j < tile.col; j++) {
            var arrayIndex = tile.Index(i, j);
            var tileType = tile.array[arrayIndex];
            var item = tile.type;
            var useImg;
            switch (tileType) {
                case item.empty.code:
                    useImg = item.empty.img;
                    break;
                case item.wall.code:
                    useImg = item.wall.img;
                    break;
                case item.goal.code:
                    useImg = item.goal.img;
                    break;
                case item.flag.code:
                    useImg = item.flag.img;
                    break;
                case item.trees.code:
                    useImg = item.trees.img;
            }
            ctx.drawImage(useImg, tile.w * j, tile.h * i);
            //drawRect(tile.w * j + tile.gap / 2, tile.h * i + tile.gap / 2, tile.w - tile.gap, tile.h - tile.gap, tile.wallColor);}

        }
}
