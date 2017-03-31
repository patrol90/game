/**
 * Created by dmitry.sobolevsky on 28.03.2017.
 */
"use strict";



document.addEventListener("DOMContentLoaded", ready);
var playerEl=document.getElementById('player');
var pressed={};
var zombies={};

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

function TZomby(id,width,height,speed,damage,background) {
    var self=this;
    self.id=id;
    self.Width=width;
    self.Height=height;
    self.Speed=speed;
    self.Damage=damage;
    self.Img=background;
    self.posX=0;
    self.posY=0;
    self.DomElem;
    self.Angle=0;
    self.MoveZobmie=function () {
        if(self.posX<player.posX){
            self.posX+=self.Speed;

        } else if (self.posX>player.posX) {
            self.posX-=self.Speed;

        }
        if(self.posY<player.posY){
            self.posY+=self.Speed;

        }else if (self.posY>player.posY){
            self.posY-=self.Speed;
        }

        if(self.posY>=player.posY && self.posX>=player.posX ){
            self.Angle=-45;
        }
        if(self.posY>=player.posY && self.posX<=player.posX ) {
            self.Angle=45;
        }
        if(self.posY<player.posY && self.posX<player.posX ) {
            self.Angle=120;
        }
        if(self.posY<player.posY && self.posX>player.posX ) {
            self.Angle=240;
        }
        return self.Angle;
    },
    self.RenderZombie=function () {
        var angle =self.MoveZobmie();
        self.DomElem.style.left=self.posX +"px";
        self.DomElem.style.top=self.posY +"px";
        self.DomElem.style.transform="translateZ(0) rotate("+angle+"deg)";
    }




}
function TEasyZomby() {
    var self=this;
    TZomby.apply(this,arguments);//наследуем
    self.Create=function () {
        var container=document.querySelector('.container');
        var zombyEl=document.createElement("div");
        zombyEl.classList.add('zomby');
        zombyEl.id="z"+self.id;
        var RandomMinX=randomInteger(1,window.innerWidth/2-200);
        var RandomMaxX=randomInteger(window.innerWidth/2+200,window.innerWidth);
        var RandomMinY=randomInteger(1,window.innerHeight/2-200);
        var RandomMaxY=randomInteger(window.innerHeight/2+200,window.innerWidth);

        if(randomInteger(0,1)){self.posX=RandomMinX } else {self.posX= RandomMaxX };
        if(randomInteger(0,1)){self.posY=RandomMinY } else {self.posY= RandomMaxY };
        self.posY=randomInteger(1,window.innerHeight);

        zombyEl.style.cssText=" width: "+self.Width+"px;\
        height: "+self.Width+"px;\
        background: url("+self.Img+");\
        position: absolute;\
        left:"+self.posX+"px;\
        top:"+self.posY+"px;\
        z-index: 0;\
        background-position: -40px -20px;\
        transition: transform 1s;"
        container.appendChild(zombyEl);
        self.DomElem=zombyEl;

    };


}





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

function MovePlayer() {
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
    for (var key in zombies){
        zombies[key].RenderZombie();
    }
    playerEl.style.left=player.posX+"px";
    playerEl.style.top=player.posY+"px";
    document.addEventListener("mousemove",look,false);
    requestAnimationFrame(Update);

}




function CreateZomby(count) {

    for (var  i=0;i<count;i++){
        zombies[i]= new TEasyZomby(i,60,70,0.3,2,"../img/slow4_a.png");
        zombies[i].Create();
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


    return radToDeg(angle);
}
var  radToDeg = function(r) { //пересчет в радианы
    return (r * (180 / Math.PI));
};

