/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */
function TEasyZomby() {
    var self=this;
    TZomby.apply(this,arguments);//наследуем
    self.Create=function (health) {
        if(!health) health=120;
        self.Healthy=health;
        self.Cofiecent=self.Healthy/100;
        var zombyEl=document.createElement("div");
        zombyEl.classList.add('zomby');
        zombyEl.classList.add('easy');
        zombyEl.id="z"+self.id;
        var RandomMinX=randomInteger(1,window.innerWidth/2-200);
        var RandomMaxX=randomInteger(window.innerWidth/2+200,window.innerWidth);
        var RandomMinY=randomInteger(1,window.innerHeight/2-200);
        var RandomMaxY=randomInteger(window.innerHeight/2+200,window.innerWidth);

        if(randomInteger(0,1)){self.posX=RandomMinX } else {self.posX= RandomMaxX };
        if(randomInteger(0,1)){self.posY=RandomMinY } else {self.posY= RandomMaxY };
        self.posY=randomInteger(1,window.innerHeight);
        zombyEl.style.cssText=" width: "+self.Width+"px;\
        height: "+self.Height+"px;\
        position: absolute;\
        left:"+self.posX+"px;\
        top:"+self.posY+"px;\
        background:url('img/easyAnimation.gif');\
        background-position: -40px -25px;\
        z-index: 10;\
        transition: transform 1s;";
        container.appendChild(zombyEl);
        self.DomElem=zombyEl;
        var HealthBar=document.createElement('div');
        HealthBar.style.cssText="width:"+(self.Healthy/self.Cofiecent)+"%;height:3px;background:green;position:absolute;bottom:0px;display:none;opacity:0.5";
        self.HealthyDom=HealthBar;
        self.DomElem.appendChild(HealthBar);

    };
}