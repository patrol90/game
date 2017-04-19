/**
 * Created by dmitry.sobolevsky on 28.03.2017.
 */
"use strict";


var container=document.querySelector('.container');
var playerHealth=document.createElement('div');



var pressed={};
var path={};
var zombies={};








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
    game.Start();
    player.CreateInterface();
    player.posX=playerEl.offsetLeft;
    player.posY=playerEl.offsetTop;
    CreateZomby(5);
    Update();
    magazine.reloading();
    if(game.level){
        game.GameStartMessage("К бою");
    }

}


function Update() {
    if(game.status){
        player.MovePlayer();
        for (var key in zombies){
           zombies[key].RenderZombie();
        }
        playerEl.style.left=player.posX+"px";
        playerEl.style.top=player.posY+"px";
        playerHealth.style.width=player.health+"%";

        requestAnimationFrame(Update);
    }
}


function CreateZomby(count,health) {


    for (var  i=0;i<count;i++){
        zombies[i]= new TEasyZomby(i,60,70,0.5,2);
        zombies[i].Create(health);
    }

}

setTimeout(ready,1000);

