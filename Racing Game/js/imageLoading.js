/*
tile.wall = document.createElement("img");
tile.empty = document.createElement("img");
tile.goal = document.createElement("img");
tile.flag = document.createElement("img");
tile.trees = document.createElement("img");

car.picLoaded = false;

var picsToLoad = 0; // set automatically based on imgList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad == 0)
        imageLoadingDoneSoStartGame();
}
*/
function beginLoadingImage(img, fileName) {
    //img.onload = countLoadedImagesAndLaunchIfReady();
    img.src = "images/" + fileName;
}

function loadImages() {
    /*
    var imgList = [
        { name: car.pic, file: "car.png" },
        { name: tile.wall, file: "wall1.png" },
        { name: tile.empty, file: "empty5.png" },
        { name: tile.goal, file: "goal.png" },
        { name: tile.trees, file: "trees.png" },
        { name: tile.flag, file: "flag.png" }
    ];
    picsToLoad = 6;
    */
   
    //for (var i = 0; i < imgList.length; i++)
    //  beginLoadingImage(imgList[i].name, imgList[i].file);

    beginLoadingImage(blueCar.pic, "blueCar.png");
    beginLoadingImage(greenCar.pic, "greenCar.png");

    for (var item in tile.type) {
        // console.log(tile.type[item]);
        tile.type[item].img = document.createElement("img");
        if (tile.type[item].file != undefined)
            beginLoadingImage(tile.type[item].img, tile.type[item].file);
    }
    imageLoadingDoneSoStartGame();
}
