/**
 * Created by dmitry.sobolevsky on 28.03.2017.
 */
"use strict";


document.addEventListener("DOMContentLoaded", ready);
var playerEl=document.getElementById('player');
var container=document.querySelector('.container');
function CreateAim() {

    var aim=document.createElement('div');
    aim.id="aim";
    aim.style.cssText="width:1000px;height:2px;position:absolute;background:rgba(255, 255, 0, 0.14);z-index:0;";
    aim.style.top=playerEl.offsetHeight/2+"px";
    aim.style.left=playerEl.offsetWidth+"px";
    playerEl.appendChild(aim);
}
CreateAim();

var pressed={};
var path={};
var zombies={};

var magazine={
    size:10,
    current:0,
    width:100,
    height:50,
    border:"black",
    fill:"yellow",
    stock:{},
    delDomBullet:[],
    reload:function () {
        for (this.current; this.current < this.size; this.current++) {
            //this.stock[this.current] = new TBullet();
            //this.stock[this.current].Create(this.current,player.posX,player.posY);
        }
    },
    show:function () {
        if(document.getElementById("magazine")) {
            container.removeChild(document.getElementById("magazine"));
        }
        var MagazineBlock = document.createElement("div");
        MagazineBlock.id="magazine";
        MagazineBlock.style.width=this.width+"px";
        MagazineBlock.style.height=this.height+"px";
        MagazineBlock.style.background=this.border;
        MagazineBlock.style.position="absolute";
        MagazineBlock.style.right="0px";
        MagazineBlock.style.padding="5px";
        for (var i=0;i<this.current;i++){
            var MagazineElement = document.createElement("div");
            MagazineElement.style.background=this.fill;
            MagazineElement.style.width="10%";
            MagazineElement.style.height="100%";
            MagazineElement.style.display="inline-block";
            MagazineElement.style.borderLeft="1px solid grey";
            MagazineElement.style.boxSizing="border-box";
            MagazineBlock.appendChild(MagazineElement);

        }
        container.appendChild(MagazineBlock);
    },
    reloading:function () {
        this.reload();
        this.show();
    }
};

var ctr = { //player position
    x:playerEl.offsetLeft,
    y:playerEl.offsetTop,
};

var player= {
    posX:0,
    posY:0,
    speed:1,
    angle:0,
    health:100,
    aim:document.querySelector("#aim"),

    Fire: function (EO) {
        EO=EO||window.event;
        (magazine.current>0) ? magazine.current=magazine.current-1:"";
        magazine.show();
        if (magazine.current){
            var bullet = new TBullet();
            bullet.Create(1,0,0);
            bullet.Shot();
        }

    },
    Look:function(EO) {
        EO=EO||window.event;

        var ms = {
            x:EO.pageX,
            y:EO.pageY
        };

        var angle=GetAngle(ms,ctr).toFixed(3);
        player.angle=angle;
        playerEl.style.transform="translate(-50%,-50%) rotate(-"+angle+"deg)";
    },

    MovePlayer:function () {
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

};

function ready() {
    document.addEventListener("keydown",DownKey,false);
    document.addEventListener("keydown",player.MovePlayer,false);
    document.addEventListener("keyup",UpKey,false);
    document.addEventListener('mousedown',player.Fire,false);
    document.addEventListener("mousemove",player.Look,false);
    document.addEventListener('keypress',function (EO) {
        EO = EO || window.event;
        if (EO.keyCode)var keycode = EO.keyCode; // IE
        else if (EO.which) var keycode = EO.which; // all browsers
        if(keycode=="32"){
            magazine.reloading();
        }

    },false);
    player.posX=playerEl.offsetLeft;
    player.posY=playerEl.offsetTop;
    CreateZomby(5);
    Update();
    magazine.reloading();


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
    self.Healthy=100;
    self.HealthyDom='';
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
        self.HealthyDom.style.width=self.Healthy+"%";
        if(self.Healthy<100&&self.Healthy>0){
            self.HealthyDom.style.display="block";
        }
        if(self.Healthy<=0){
            self.DomElem.style.background="url(img/slow4_a.png) -20px -785px";
            self.HealthyDom.style.display="none";
            delete  zombies[self.id];

            if(!checkObj(zombies)) {
                setTimeout(function(){alert("Вы победили!")},1000);
            }

        }
    };
    self.Damage=function(dmg){
        if(self.Healthy>0){
            self.Healthy -= dmg;
        }

    }





}
function TEasyZomby() {
    var self=this;
    TZomby.apply(this,arguments);//наследуем
    self.Create=function () {
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
        z-index: 110;\
        background-position: -40px -25px;\
        transition: transform 1s;";
        container.appendChild(zombyEl);
        self.DomElem=zombyEl;
        var HealthBar=document.createElement('div');
        HealthBar.style.cssText="width:"+self.Healthy+"%;height:3px;background:green;position:absolute;bottom:0px;display:none;opacity:0.5";
        self.HealthyDom=HealthBar;
        self.DomElem.appendChild(HealthBar);

    };
}

function  TBullet() {
    var self=this;
    self.height=10;
    self.width=5;
    self.PosX=0;
    self.PosY=0;
    self.color="red";
    self.id=0;
    self.Element='';
    self.coor={};

    self.Create=function (id,left,top) {
        if(!left && !top){
            left=self.PosX;
            top=self.PosY;
        }

        var bullet=document.createElement('span');
        bullet.style.height="2px";
        bullet.style.width="8px";
        bullet.style.background="red";
        bullet.style.position="absolute";
        bullet.id='bul'+id;
        self.Element=bullet;
        var clonedNode = document.getElementById("aim").cloneNode(false);
        clonedNode.style.transform="translate(-50%,-50%) rotate(-"+player.angle+"deg)";
        clonedNode.style.background="none";
        clonedNode.style.left=player.posX+"px";
        clonedNode.style.top=player.posY+"px";
        container.appendChild(clonedNode);

        self.PosX=clonedNode.offsetWidth/2;
        clonedNode.appendChild(bullet);

        setInterval(self.Check,100);


    };
    self.Shot=function () {
        if(self.Element){
            if(self.PosX<1500 && self.PosX>0){
                self.PosX+=10;
                self.Element.style.left=self.PosX+"px";
            }
            if(self.Element){
                if (self.PosX>=1500 || self.PosX==0){
                    document.querySelector(".container").removeChild(self.Element.parentNode);
                }
            }
           // console.log(GetElementPos(self.Element));
        }

        requestAnimationFrame(self.Shot);

    };

    self.Check=function () {
        if(self.Element){
            self.coor=GetElementPos(self.Element);
            for(var key in zombies){
               if(((zombies[key].posX-self.coor.left)<zombies[key].Width)&&((zombies[key].posX-self.coor.left)>-zombies[key].Width)&&((self.coor.top -zombies[key].posY)>=0)&&((self.coor.top -zombies[key].posY)<zombies[key].Height) ) {
                    zombies[key].Damage(20);

                }


            }
        }
    }

}




var GetElementPos = function (EL) {

    var bbox=EL.getBoundingClientRect();
    return {
        left: Math.floor(bbox.left+window.pageXOffset),
        top: Math.floor(bbox.top+window.pageYOffset)
    };
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
    player.MovePlayer();
    for (var key in zombies){
       zombies[key].RenderZombie();
    }
    playerEl.style.left=player.posX+"px";
    playerEl.style.top=player.posY+"px";


    requestAnimationFrame(Update);
}




function CreateZomby(count) {

    for (var  i=0;i<count;i++){
        zombies[i]= new TEasyZomby(i,60,70,0.3,2,"img/slow4_a.png");
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
function checkObj(object){
    if(!Object.keys(object).length) {
        return false;
    } else {
        return true;
    }
}

