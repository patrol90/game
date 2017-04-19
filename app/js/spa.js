/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */

var container=document.querySelector(".container");
window.onhashchange=SwitchToStateFromURLHash;
SwitchToStateFromURLHash();
function SwitchToStateFromURLHash() {
    var URLHash=window.location.hash;
    URLHash=URLHash.substr(1);
    if(URLHash==''){
        URLHash="home";
    }

   switch (URLHash) {
        case "game":

            container.innerHTML='<div id="player"></div>';
            $("head").append($("<link rel='stylesheet' href='css/game.css' type='text/css'  />"));
            LoadScriptAsync("js/custom.js");
            LoadScriptAsync("js/Game.js");
            LoadScriptAsync("js/TBullet.js");
            LoadScriptAsync("js/TZomby.js");
            LoadScriptAsync("js/TEasyZomby.js");
            LoadScriptAsync("js/Player.js");
            LoadScriptAsync("js/script.js");



            break;

        case "home":
            container.innerHTML=' \
            <div class="block">\
                <ul>\
                <li><a href="#game">Начать игру</a></li>\
                <li><a href="#record">Рекорды</a></li>\
                </ul>\
            </div>';

            $("head").append($("<link rel='stylesheet' href='css/main.css' type='text/css'  />"));
            break;
    }
}



function LoadScriptAsync(url)
{
    var s=document.createElement("script");
    s.src=url;
    document.getElementsByTagName("head")[0].appendChild(s);
}



