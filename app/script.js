/**
 * Created by dmitry.sobolevsky on 28.03.2017.
 */
"use strict";

document.addEventListener("DOMContentLoaded", ready);
var playerEl=document.getElementById('player');
var pressed={};

var ctr = { //player position
    x:playerEl.offsetLeft,
    y:playerEl.offsetTop,
};

function ready() {
    document.addEventListener("keydown",DownKey,false);
    document.addEventListener("keydown",MovePlayer,false);
    document.addEventListener("keyup",UpKey,false);
    player.posX=playerEl.offsetLeft;
    player.posY=playerEl.offsetTop;
    CreateZomby(15);
    Update();

}

var zomby = {
    width:60,
    height:70,
    background:"../img/slow4_a.png",
    };
var player= {
    posX:0,
    posY:0,
    speed:1,

};


function look(EO) {
    EO=EO||window.event;

    var ms = {
        x:EO.pageX,
        y:EO.pageY
    };
    var angle=GetAngle(ms,ctr).toFixed(3);
    playerEl.style.transform="translate(-50%,-50%) rotate(-"+angle+"deg)";
}

function MovePlayer(EO) {
    EO = EO || window.event;
    if (player.posX<playerEl.offsetWidth/2){
        player.posX=playerEl.offsetWidth/2;
    }

    if (player.posX>window.innerWidth - playerEl.offsetWidth/2){
        player.posX=window.innerWidth - playerEl.offsetWidth/2;
    }
    if (player.posY+playerEl.offsetHeight/2>window.innerHeight){
        player.posY=window.innerHeight - playerEl.offsetHeight/2;
    }
    if (player.posY<playerEl.offsetHeight/2){
        player.posY=playerEl.offsetHeight/2;
    }

    if (pressed["87"]&& pressed["68"]) {
        player.posY -= player.speed/3;
        player.posX += player.speed/3;
    }
    if (pressed["83"]&& pressed["68"]) {
        player.posY += player.speed/3;
        player.posX += player.speed/3;
    }
    if (pressed["83"]&& pressed["65"]) {
        player.posY += player.speed/3;
        player.posX -= player.speed/3;
    }
    if (pressed["87"]&& pressed["65"]) {
        player.posY -= player.speed/3;
        player.posX -= player.speed/3;
    }
    if (pressed["87"]) {
        player.posY -= player.speed;
    }
    if (pressed["83"]) {
        player.posY += player.speed;
    }
    if (pressed["68"]) {
        player.posX += player.speed;
    }
    if (pressed["65"]) {
        player.posX -= player.speed;
    }



}


function DownKey(EO) {
    EO = EO || window.event;
    var keycode;
    if (EO.keyCode) keycode = EO.keyCode; // IE
    else if (EO.which) keycode = EO.which; // all browsers
    pressed[keycode]=true;

}
function UpKey(EO) {
    EO = EO || window.event;
    var keycode;
    if (EO.keyCode) keycode = EO.keyCode; // IE
    else if (EO.which) keycode = EO.which; // all browsers
    pressed[keycode]=false;
}


function Update() {
    MovePlayer();
    playerEl.style.left=player.posX+"px";
    playerEl.style.top=player.posY+"px";
    document.addEventListener("mousemove",look,false);
    document.addEventListener("keyup",function () {
        var arr=document.querySelectorAll(".zomby");
        for (var i=0;i<arr.length;i++){
            arr[i].style.left=player.posX+"px";
            arr[i].style.top=player.posY+"px";
        }
    },false);

    requestAnimationFrame(Update);

}






function moveUp(EO) {
    EO = EO || window.event;
    var keycode;
    if (EO.keyCode) keycode = EO.keyCode; // IE
    else if (EO.which) keycode = EO.which; // all browsers

    if (keycode == 87) {
        player.posY -= player.speed;
        console.log("verh");
    }

}
function moveDown(EO) {
    EO = EO || window.event;
    var keycode;
    if (EO.keyCode) keycode = EO.keyCode; // IE
    else if (EO.which) keycode = EO.which; // all browsers

    if (keycode == 83) {
        player.posY += player.speed;
        console.log("niz");
    }

}
function moveRight(EO) {
    EO = EO || window.event;
    var keycode;
    if (EO.keyCode) keycode = EO.keyCode; // IE
    else if (EO.which) keycode = EO.which; // all browsers

    if (keycode == 68) {
        player.posX += player.speed;
        console.log("right");
    }

}
function moveLeft(EO) {
    EO = EO || window.event;
    var keycode;
    if (EO.keyCode) keycode = EO.keyCode; // IE
    else if (EO.which) keycode = EO.which; // all browsers

    if (keycode == 65) {
        player.posX -= player.speed;
        console.log("levo");
    }

}





function CreateZomby(count) {

    var container=document.querySelector('.container');
    for (var  i=0;i<count;i++){
        var zombyEl=document.createElement("div");
        zombyEl.classList.add('zomby');
        var zombyPositon={
            x:randomInteger(0,window.innerWidth),
            y:randomInteger(0,window.innerHeight)
        };
       /* zombyEl.onmouseover=function (EO) {
            var self=this;
            self.style.left=player.posX+"px";
            self.style.top=player.posY+"px";

        }; */
        zombyEl.style.cssText=" width: 60px;\
        height: 70px;\
        background: url('../img/slow4_a.png');\
        background-position: -40px -20px;\
        position: absolute;\
        left:"+zombyPositon.x+"px;\
        top:"+zombyPositon.y+"px;\
        z-index: 0;\
        transition: all 15s;";
        container.appendChild(zombyEl);

    }

}

//helpful
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
function GetAngle(ms, ctr) { //узнать угол поворота
    var x     = ms.x - ctr.x,
        y     = - ms.y + ctr.y,
        hyp   = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
        angle = Math.acos(x / hyp);

    if (y < 0) {
        angle = 2 * Math.PI - angle;
    }

    var  radToDeg = function(r) { //пересчет в радианы
        return (r * (180 / Math.PI));
    };
    return radToDeg(angle);
}
function isEmpty(object) {
    for (var key in object)
        if (object.hasOwnProperty(key)) return true;

    return false;
}
