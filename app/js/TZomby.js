/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */
function TZomby(id,width,height,speed,damage) {
    var self=this;
    self.id=id;
    self.Width=width;
    self.Height=height;
    self.Speed=speed;
    self.Damage=damage;
    //self.Img=background;
    self.posX=0;
    self.posY=0;
    self.Healthy=100;
    self.HealthyDom='';
    self.DomElem;
    self.Angle=0;
    self.MoveZobmie=function () {
        if(self.posX<player.posX){
            self.posX+=self.Speed;

        } else if (self.posX>player.posX) {
            self.posX-=self.Speed;

        }
        if(self.posY<player.posY){
            self.posY+=self.Speed;

        }else if (self.posY>player.posY){
            self.posY-=self.Speed;
        }

        if(self.posY>=player.posY && self.posX>=player.posX ){
            self.Angle=-45;
        }
        if(self.posY>=player.posY && self.posX<=player.posX ) {
            self.Angle=45;
        }
        if(self.posY<player.posY && self.posX<player.posX ) {
            self.Angle=120;
        }
        if(self.posY<player.posY && self.posX>player.posX ) {
            self.Angle=240;
        }
        return self.Angle;
    },
        self.Atack=function () {
            if(((self.posX-player.posX)<0)&&((self.posX-player.posX)>-60)&&((self.posY-player.posY)<=0)&&((self.posY-player.posY)>-60)){
                player.health-=self.Damage;
            }
            if (player.health==0){
                game.status=0;
                alert("Игра окончена");
            }
        },
        self.RenderZombie=function () {
            var angle =self.MoveZobmie();
            self.DomElem.style.left=self.posX +"px";
            self.DomElem.style.top=self.posY +"px";
            self.DomElem.style.transform="translateZ(0) rotate("+angle+"deg)";
            self.HealthyDom.style.width=self.Healthy+"%";
            
            if(self.Healthy<100&&self.Healthy>0){
                self.HealthyDom.style.display="block";
            }
            if(self.Healthy<=0){
                self.DomElem.style.background="url(img/slow4_a.png) -20px -785px,url(img/blood.png)center center";
                self.DomElem.style.zIndex='9';
                self.HealthyDom.style.display="none";
                delete  zombies[self.id];

                if(!checkObj(zombies)) {
                    game.status=0;
                    setTimeout(function(){alert("Вы победили!")},1000);
                }

            }
            self.Atack();

        };
    self.Damaged=function(dmg){
        if(self.Healthy>0){
            self.Healthy -= dmg;
        }

    }


}