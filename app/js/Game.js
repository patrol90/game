/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */

var game={
    status:1,
    playerName:"",
    level:1,
    win:1,
    Safe:function(){
        game.level++;
        game.ShowMessage("Уровень "+game.level);
        var stat = { name: game.playerName , level:game.level};
        var sObj = JSON.stringify(stat);
        localStorage.setItem("progress", sObj);
        $.post( "http://yoo.by/query.php", { name: game.playerName, level: game.level });

        setTimeout(game.NextRound,1000);
    },
    NextRound:function(){
        var mass=document.querySelectorAll(".dead");
        for (var i=0;i<mass.length;i++){
            container.removeChild(mass[i]);
        }
        game.status=1;
        CreateZomby(game.level*2,game.level*300);
        Update();
        magazine.reloading();
    },
    ShowMessage:function (text) {
        var Message=document.createElement("div");
        var TextOfMessage=document.createTextNode(text);
        Message.appendChild(TextOfMessage);
        Message.style.cssText="position:absolute;left:50%:top:50%;z-index:100;transform:translate(-50% -50%);font-weight:800;font-family:Arial;color:#151414;font-size:4vw;text-shadow:4px 3px 0px #9E9E9E, 9px 8px 0px rgba(0,0,0,0.15);-webkit-transition:all 1s;transition:all 1s;";
        document.querySelector('.container').appendChild(Message);
        setTimeout(function () {
            Message.style.fontSize="8vw";
        },500);
        setTimeout(function () {
            Message.style.fontSize="0vw";
            setTimeout(function () {
                document.querySelector('.container').removeChild(Message);
            },1000)
        },3000)

    },
    GameStartMessage:function (text) {

        var Message=document.createElement("div");
        var TextOfMessage=document.createTextNode(text);
        Message.appendChild(TextOfMessage);
        Message.style.cssText="position:absolute;left:50%:top:50%;z-index:100;transform:translate(-50% -50%);font-weight:800;font-family:Arial;color:#151414;font-size:4vw;text-shadow:4px 3px 0px #9E9E9E, 9px 8px 0px rgba(0,0,0,0.15);-webkit-transition:all 1s;transition:all 1s;animation-name: GameStart;animation-duration: 1s;";
        document.querySelector('.container').appendChild(Message);
        setTimeout(function () {
            document.querySelector('.container').removeChild(Message);
        },1000)
    },
    ListenStatus:function () {
        if(player.health<=0){
            if(game.win){
                game.win=0;
                game.status=0;
                game.ShowMessage("Вы проиграли");
                setTimeout(function () {
                    window.location.hash="#home";
                },3000);

            }
        }
    },
    checkLevelFromBD:function (){
        if(game.playerName!=''){
            $.ajax({
                type: "POST",
                url: "http://yoo.by/query.php",
                data: {name:game.playerName},
                success: function(data){game.level=Number(data)},
                dataType: "text"
            });

        }
    }

};
setInterval(game.ListenStatus,1000);
