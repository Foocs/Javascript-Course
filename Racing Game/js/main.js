var canvas, ctx;

blueCar = new Car;
greenCar = new Car;

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
    blueCar.Reset();
    greenCar.Reset();
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
    blueCar.Movement();
    greenCar.Movement();
}

function drawAll() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawTiles();
    blueCar.Draw();
    greenCar.Draw();
    //drawCoords();
}

function drawTiles() {
    var arrayIndex = 0;
    var tileX = 0;
    var tileY = 0;
    for (var i = 0; i < tile.row; i++) {
        for (var j = 0; j < tile.col; j++) {
            //var arrayIndex = tile.Index(i, j);
            var tileType = tile.array[arrayIndex];
            var useImg = tile.type[Object.keys(tile.type)[tileType]].img;
            /*
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
            }*/
            ctx.drawImage(useImg, tileX, tileY);
            tileX += tile.w;
            arrayIndex++;
            //drawRect(tile.w * j + tile.gap / 2, tile.h * i + tile.gap / 2, tile.w - tile.gap, tile.h - tile.gap, tile.wallColor);}
        }
        tileX = 0;
        tileY += tile.h;
    }
}
