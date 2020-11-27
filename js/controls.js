var container = document.getElementById("music");
var slider = document.getElementById("volume-slider");
var playButton = document.getElementById("play-button");
var audio = document.getElementById("audio");

/*
    Music
*/

InitControls();

function InitControls()
{
    audio.volume = 0.3;
    slider.setAttribute("value", 30);
    slider.addEventListener("input", UpdateVolume, false);
}

function UpdateVolume()
{
    var volume = (slider.value - 1) / 100;
    audio.volume = volume;
}

var playing = true;

function OnPlayButtonClick()
{
    if(playing)
    {
        playing = false;
        audio.pause();
        playButton.classList.remove("icon-pause-circle");
        playButton.classList.add("icon-play-circled");
    }
    else
    {
        playing = true;
        audio.play();
        playButton.classList.remove("icon-play-circled");
        playButton.classList.add("icon-pause-circle");
    }
}


/*
    Cursor
*/

var cursor = document.getElementById("cursor");

var body = document.body;

function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;

    while (el) {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
    }
    return {
        x: xPosition,
        y: yPosition
    };
}  

var windowPos = getPosition(body);
var mouseX = 0;
var mouseY = 0;

function update() {
    cursor.style.top = mouseY;
    cursor.style.left = mouseX;
    requestAnimationFrame(update);
}
update();

function setCursorPosition(e) {
    mouseX = e.clientX - windowPos.x;
    mouseY = e.clientY - windowPos.y;
}

window.onload = function() 
{
  document.body.addEventListener("mousemove", setCursorPosition, false);
}