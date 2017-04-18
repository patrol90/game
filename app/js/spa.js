/**
 * Created by dmitry.sobolevsky on 18.04.2017.
 */

var container=document.querySelector(".container");
window.onhashchange=SwitchToStateFromURLHash;
function SwitchToStateFromURLHash() {
    var URLHash=window.location.hash;
    URLHash=URLHash.substr(1);
   switch (URLHash) {
        case "game":

            container.innerHTML='<div id="player"></div>';
            container.style.cssText="width: 100vw;\
            height: 100vh;\
            background: url(\"img/fon2.jpg\");";
            break;
        case "home":
            $.ajax({
                url: "index.html",
                cache: false,
                success: function(html){
                    document.querySelector('body').innerHTML=html;
                }
            });
            break;
    }
}

