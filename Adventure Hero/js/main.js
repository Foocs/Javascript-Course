var canvas, ctx;
var FPS = 30;

player = new Player;

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    drawRect(0, 0, canvas.width, canvas.height, "black"); //loadscreen
    drawText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, "white", "bold 50px Comic Sans");

    loadImages();
}

function startGame() {
    
    setupInput();

    loadLevel(block.levelOne);

    //player.SetupInput(37, 38, 39, 40) // ArrowLeft, ArrowUp, ArrowRight, ArrowDown
    player.SetupInput(65, 87, 68, 83); // A, W, D, S  

    setInterval(update, 1000 / FPS);
}

function loadLevel(level) {
    block.array = level.slice(); // array copy without memory reference
    player.Reset();
}

function setupInput() {
    document.addEventListener("keydown", key.Press);
    document.addEventListener("keyup", key.Release);
}

function update() {
    player.Movement();
    drawAll();
}

function drawAll() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawBlocks();
    player.Draw();
    if (player.winTimer-- > 0) {
        drawText("YOU WIN!", canvas.width / 2 - 2, canvas.height / 2 + 2, "black", "bold 50px Comic Sans"); // black offset
        drawText("YOU WIN!", canvas.width / 2, canvas.height / 2, "blue", "bold 50px Comic Sans");
    }
}

function drawBlocks() {
    var arrayIndex = 0;
    var blockX = 0;
    var blockY = 0;
    for (var i = 0; i < block.row; i++) {
        for (var j = 0; j < block.col; j++) {
            //var arrayIndex = block.Index(i, j);
            var blockType = block.array[arrayIndex];
            var useImg = block.type[Object.keys(block.type)[blockType]].img;
            ctx.drawImage(useImg, blockX, blockY);
            blockX += block.w;
            arrayIndex++;
        }
        blockX = 0;
        blockY += block.h;
    }
}
