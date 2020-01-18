function beginLoadingImage(img, fileName) {
    img.src = "images/" + fileName;
}

function loadImages() {

    beginLoadingImage(player.pic, "blueCar.png");

    for (var item in block.type) {

        block.type[item].img = document.createElement("img");

        if (block.type[item].file != undefined)
            beginLoadingImage(block.type[item].img, block.type[item].file);
    }
    startGame();
}
