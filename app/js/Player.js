/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */
var playerEl=document.getElementById('player');
var player= {
    posX:0,
    posY:0,
    speed:1,
    angle:0,
    health:100,
    aim:document.querySelector("#aim"),

    Fire: function (EO) {
        EO=EO||window.event;
        if(game.status){
            (magazine.current>0) ? magazine.current=magazine.current-1:"";
            magazine.show();
            if (magazine.current){
                var bullet = new TBullet();
                player.SoundOfShot();
                bullet.Create(1,0,0);
                bullet.Shot();
            }
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
        if(game.status){
            playerEl.style.transform="translate(-50%,-50%) rotate(-"+angle+"deg)";
        }
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

    },
    CreateInterface:function () {
        
        var playerHealthContainer=document.createElement('div');
        playerHealthContainer.style.cssText="width:200px;height:20px;border:2px solid white;border-radius:10px;overflow:hidden;position:absolute;top:20px;left:20px;";
        playerHealth.style.cssText="width:100%;height:20px;background:#f44336;"
        playerHealthContainer.appendChild(playerHealth);
        document.querySelector('.container').appendChild(playerHealthContainer);
    
        var aim=document.createElement('div');
        aim.id="aim";
        aim.style.cssText="width:1000px;height:2px;position:absolute;background:rgba(255, 255, 0, 0.14);z-index:0;";
        aim.style.top="72%";
        aim.style.left=playerEl.offsetWidth+"px";
        playerEl.appendChild(aim);
    },
    SoundOfShot:function () {
        var audio = new Audio(); // Создаём новый элемент Audio
        audio.src = 'img/gun.mp3'; // Указываем путь к звуку "клика"
        audio.autoplay = true; // Автоматически запускаем
    }

};

var magazine={
    size:10,
    current:0,
    width:100,
    height:20,
    border:"black",
    fill:"yellow",
    stock:{},
    delDomBullet:[],
    reload:function () {
        for (this.current; this.current < this.size; this.current++) {
            //this.stock[this.current] = new TBullet();
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
        MagazineBlock.style.right="20px";
        MagazineBlock.style.top="20px";

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
        var audio = new Audio(); // Создаём новый элемент Audio
        audio.src = 'img/reload3.mp3'; // Указываем путь к звуку "клика"
        audio.autoplay = true; // Автоматически запускаем
        this.reload();
        this.show();


    }
};