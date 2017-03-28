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
    var x1 = player.offsetLeft;
    var y1 = player.offsetTop;


    // координаты курсора
    var x2 = EO.pageX;
    var y2 = EO.pageY;

    // координаты третей точки, чтоб получить треугольник
    var x3 = x2;
    var y3 = y1;


    // высчитываем угол
    var cos = (((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2))+((x1-x3)*(x1-x3))+((y1-y3)*(y1-y3))-((x2-x3)*(x2-x3))-((y2-y3)*(y2-y3)))/(2*Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))*Math.sqrt(((x1-x3)*(x1-x3))+((y1-y3)*(y1-y3))));
    var rad = Math.acos(cos);
    var degree = rad * 180 / Math.PI;

    var degree360 = 0;
    if(x2 < x1 && y2 < y1) degree360 = 180 + (90 - degree);
    if(x2 > x1 && y2 < y1) degree360 = 90 + degree;
    if(x2 > x1 && y2 > y1) degree360 -=  degree;
    if(x2 < x1 && y2 > y1) degree360 = degree - 90;

    var pogrewnost=-87;
    console.log(degree);
    degree360+=pogrewnost;
    player.style.transform="translate(-50%,-50%) rotate(-"+degree360+"deg)";


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

