/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */
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
};

var GetElementPos = function (EL) {

    var bbox=EL.getBoundingClientRect();
    return {
        left: Math.floor(bbox.left+window.pageXOffset),
        top: Math.floor(bbox.top+window.pageYOffset)
    };
};
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