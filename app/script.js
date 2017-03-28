/**
 * Created by dmitry.sobolevsky on 28.03.2017.
 */
"use strict";

document.addEventListener("DOMContentLoaded", ready);
var player=document.getElementById('player');
function ready() {
    console.log("ee");
    document.addEventListener("mousemove",look,false);


}

function look(EO) {
    EO=EO||window.event;

    // получаем координаты блока с текстом
    var ctr = {
        x:player.offsetLeft,
        y:player.offsetTop,
    }
    var ms = {
        x:EO.pageX,
        y:EO.pageY
    };



     function GetAngle(ms, ctr) {
        var x     = ms.x - ctr.x,
            y     = - ms.y + ctr.y,
            hyp   = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
            angle = Math.acos(x / hyp);

        if (y < 0) {
            angle = 2 * Math.PI - angle;
        }

        return radToDeg(angle);
    }

    var  radToDeg = function(r) {
        return (r * (180 / Math.PI));
    };
    var angle=GetAngle(ms,ctr).toFixed(3);
    var angle_cursor =angle + 90;
    console.log(angle + ' - '+angle_cursor );
    player.style.transform="translate(-50%,-50%) rotate(-"+angle+"deg)";
    document.querySelector("#cursor").style.transform="translate(0%,-50%) rotate(-"+angle_cursor+"deg)"; // +90

    //player.transform.rotate(h+'deg');


    /*


     var distance = 50; // расстояние тени до текста
     // высчитаваем координаты для тени
     var v = Math.round((distance * Math.cos(Math.PI*degree360/180)));
     var h = Math.round((distance * Math.sin(Math.PI*degree360/180)));
     var stlyle = h+'px '+v+'px';






            // поворачиваем тень
            $('#text').css({
                'text-shadow' : stlyle
            });

    */

}

