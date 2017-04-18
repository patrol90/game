/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */
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
                    try {
                        document.querySelector(".container").removeChild(self.Element.parentNode);
                    } catch (err){

                    }
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
                    zombies[key].Damaged(20);

                }

            }
        }
    }

}