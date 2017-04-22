/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */

var container=document.querySelector(".container");

window.onhashchange=SwitchToStateFromURLHash;
window.onbeforeunload = function(){
    return confirm('Точно хотите выйти?');
};
SwitchToStateFromURLHash();

function SwitchToStateFromURLHash() {
    var URLHash=window.location.hash;
    URLHash=URLHash.substr(1);
    if(URLHash==''){
        URLHash="home";
    }
   switch (URLHash) {
        case "game":
            checkLocalStorage();
            container.style.cursor="none";
            container.innerHTML='<div id="player"></div>';
            $("head").append($("<link rel='stylesheet' href='css/game.css' type='text/css'  />"));
            LoadScriptAsync("js/custom.js");
            LoadScriptAsync("js/TBullet.js");
            LoadScriptAsync("js/TZomby.js");
            LoadScriptAsync("js/TEasyZomby.js");
            LoadScriptAsync("js/Player.js");
            LoadScriptAsync("js/script.js");



            break;

       case "home":
           checkLocalStorage();
           game.status=0;
           LoadScriptAsync("js/Player.js");
            if (!game.playerName){
                container.style.cursor="auto";
                container.style.background="url(img/main-background.jpg)";
                container.innerHTML=' \
                <div class="block">\
                    <ul>\
                    <li><input type="text" id="name" placeholder="Введите имя"></li>\
                    <li><a href="#game">Начать игру</a></li>\
                    <li><a href="#record">Рекорды</a></li>\
                    </ul>\
                </div>';

                document.querySelector("#name").addEventListener("change",function () {
                    var progres={};
                    progres.name=this.value;
                    game.playerName=this.value;
                    localStorage.setItem("progress",JSON.stringify(progres));
                    game.checkLevelFromBD();

                });
            } else {
                if(game.level!=1){
                    container.style.background="url(img/main-background.jpg)";
                    container.style.cursor="auto";
                    container.innerHTML=' \
                    <div class="block">\
                       <h3>Привет ' +game.playerName +'</h3>\
                       <ul>\
                       \
                            <li><a onclick="ResetLevel(this)">Начать заново</a></li>\
                            <li><a href="#game">Продолжить игру</a></li>\
                            <li><a href="#record">Достижение</a></li>\
                       </ul>\
                    </div>';
                } else {
                    container.style.background="url(img/main-background.jpg)";
                    container.style.cursor="auto";
                    container.innerHTML=' \
                    <div class="block">\
                       <h3>Привет ' +game.playerName +'</h3>\
                       <ul>\
                       \
                            <li><a href="#game">Начать игру</a></li>\
                            <li><a href="#record">Достижение</a></li>\
                       </ul>\
                    </div>';
                }
            }

            $("head").append($("<link rel='stylesheet' href='css/main.css' type='text/css'  />"));

            break;
       case "record":
           checkLocalStorage();
           game.status=0;
           LoadScriptAsync("js/Player.js");
           if (!game.playerName){
               container.innerHTML=' \
                <div class="block">\
                   У вас нет достижений\
                </div>';
           } else {
               container.innerHTML=' \
                <div class="block">\
                    <h3>Вы прошли до '+game.level +' уровня</h3>\
                    <a href="#home" id="back"> назад</a>\
                </div>';
           }
           break;
    }
}



function LoadScriptAsync(url)
{
    var s=document.createElement("script");
    s.src=url;
    document.getElementsByTagName("head")[0].appendChild(s);
}

function ResetLevel(obj) {
    document.querySelector(".block li:nth-child(2) > a").innerText='Начать игру';
    obj.style.display='none';
    game.level=1;
    var stat = { name: game.playerName , level:game.level};
    var sObj = JSON.stringify(stat);
    localStorage.setItem("progress", sObj);
    $.post( "http://yoo.by/query.php", { name: game.playerName, delete: game.level });


}


