function drawBitmapCenteredWithAngle(pic, x, y, ang) {
    ctx.save()
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.drawImage(pic, -pic.width / 2, -pic.height / 2);
    ctx.restore();
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

function drawCoords() {
    ctx.fillStyle = "orange";
    ctx.font = "bold 15px Comic Sans"
    var rowCoords = Math.floor(mouse.y / block.h);
    var colCoords = Math.floor(mouse.x / block.w);
    ctx.fillText(rowCoords + "." + colCoords + ":" + block.Index(rowCoords, colCoords), mouse.x + 2, mouse.y - 2);
}

function drawText(text, x, y, color, font) {
    ctx.fillStyle = color;
    ctx.font = font
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}