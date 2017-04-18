/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */
var game={
    status:1,
    playerName:"",
    level:1,
    Safe:function(){
        game.level++;

        var stat = { name: game.playerName , level:game.level};
        var sObj = JSON.stringify(stat);
        localStorage.setItem("progress", sObj);
        setTimeout(game.NextRound,1000);
    },
    NextRound:function(){
        game.status=1;
        CreateZomby(game.level*3,game.level*7g0);
        Update();
        magazine.reloading();
    }

};