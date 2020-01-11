var canvas, ctx;

blueCar = new Car;
greenCar = new Car;

var winner;

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    drawRect(0, 0, canvas.width, canvas.height, "black"); //loadscreen
    drawText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, "white", "bold 50px Comic Sans");

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

    loadLevel(tile.levelOne);

    blueCar.SetupInput(37, 38, 39, 40) // ArrowLeft, ArrowUp, ArrowRight, ArrowDown
    greenCar.SetupInput(65, 87, 68, 83); // A, W, D, S  

    setInterval(update, 30);
}

function loadLevel(level) {
    tile.array = level.slice(); // array copy without memory reference
    blueCar.Reset();
    greenCar.Reset();
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
    if (winner.timer-- > 0) {
        drawText("THE " + winner.color + " CAR WINS!", canvas.width / 2 - 2, canvas.height / 2 + 2, "black", "bold 50px Comic Sans"); // black offset
        drawText("THE " + winner.color + " CAR WINS!", canvas.width / 2, canvas.height / 2, winner.color, "bold 50px Comic Sans");
    }
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
