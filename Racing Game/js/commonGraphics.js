function drawBitmapCenteredWithAngle(pic, x, y, ang) {
    ctx.save()
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.drawImage(pic, -pic.width / 2, -pic.height / 2);
    ctx.restore();
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
    ctx.fillText(rowCoords + "." + colCoords + ":" + tile.Index(rowCoords, colCoords), mouse.x + 2, mouse.y - 2);
}

function drawText(text, x, y, color, font) {
    ctx.fillStyle = color;
    ctx.font = font
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}