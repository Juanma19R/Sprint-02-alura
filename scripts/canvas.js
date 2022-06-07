function start_canvas() {
    document.getElementById('startCanvas').innerHTML='';
    var startCanvas = document.getElementById('startCanvas');
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id','board');
    canvas.width = 250;
    canvas.height = 350;
    canvas.style.backgroundColor = 'white';
    startCanvas.appendChild(canvas);
    brush.fillStyle = "white";
    brush.fillRect(0, 0, 250, 350);
    screen = document.querySelector("canvas");
    brush = screen.getContext("2d");
    creating_canvas(1);
}

function head() {
    brush.fillStyle = "white";
    brush.beginPath();
    brush.arc(180, 100, 35, 0, 2 * 3.14);
    brush.stroke();
}

function lines(x_initial, y_initial, x_final, y_final) {
    brush.lineWidth = 5;
    brush.strokeStyle = "#0A3871";
    brush.moveTo(x_initial, y_initial);
    brush.lineTo(x_final, y_final);
    brush.stroke();
}

function creating_canvas(option) {
    switch (option) {
        case 1  : lines(5,340,240,340); break;
        case 2  : lines(50,22,50,340); break;
        case 3  : lines(50,22,180,22); break;
        case 4  : lines(180,20,180,60); break;
        case 5  : head(); break;
        case 6  : lines(180,140,180,230); break;
        case 7  : lines(180,170,130,220); break;
        case 8  : lines(180,170,230,220); break;
        case 9  : lines(180,230,130,280); break;
        default: lines(180,230,230,280); break;
    }
}