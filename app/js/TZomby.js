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
    self.posX=0;
    self.posY=0;
    self.Healthy=100;
    self.HealthyDom='';
    self.Cofiecent=1;
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
                window.navigator.vibrate(1000);

            }
            if (player.health==0){
                game.status=0;
            }
        },
        self.RenderZombie=function () {
            var angle =self.MoveZobmie();
            self.DomElem.style.left=self.posX +"px";
            self.DomElem.style.top=self.posY +"px";
            if(self.Healthy>20){
                self.DomElem.style.transform="translateZ(0) rotate("+angle+"deg)";
            }
            self.HealthyDom.style.width=(self.Healthy/self.Cofiecent)+"%";
            
            if((self.Healthy) && self.Healthy>0){
                self.HealthyDom.style.display="block";
            }
            if(self.Healthy<=0){
                self.DomElem.style.background="url(img/slow4_a.png) -20px -785px,url(img/blood.png)center center";
                self.DomElem.style.zIndex='9';
                self.DomElem.classList.add('dead');
                self.HealthyDom.style.display="none";
                delete  zombies[self.id];

                if(!checkObj(zombies)) {
                    game.status=0;
                    game.Safe();
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