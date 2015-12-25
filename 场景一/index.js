var main = document.querySelector('#main');
var oLis = document.querySelectorAll(".slide>li");
var winW = window.innerWidth;
var winH = window.innerHeight;
//获取页数
var pageTip = document.querySelector("#pageTip");
//获取span
var span = document.querySelector("#sp");
var desW = 640;
var desH = 960;
//获取有多少页 首先默认为1页
pageTip.innerHTML = "1/" + oLis.length;
//获取span的宽度首先默认为总长度/1
span.style.width = (1 / oLis.length) * 100 + "%";

main.style.webkitTransform = "scale(" + winH / desH + ")";
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener('touchstart', start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
});
function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    /*阻止默认行为*/
    var touchMove = e.changedTouches[0].pageY;
    var changePos = touchMove - this.startY;
    var cur = this.index;
    var step = 1 / 2;
    var scalePos = (Math.abs(changePos) / winH) * step;
    [].forEach.call(oLis, function () {
        if (arguments[1] != cur) {
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    });
    if (changePos > 0) {/*↓*/
        var pos = -winH + changePos;
        this.preSIndex = cur == 0 ? oLis.length - 1 : cur - 1;
        //页数
        pageTip.innerHTML = (this.preSIndex + 1) + "/" + oLis.length;
        //span的宽度
        span.style.width = ((this.preSIndex + 1) / oLis.length) * 100 + "%";


    } else if (changePos < 0) {/*↑*/
        var pos = winH + changePos;
        this.preSIndex = cur == oLis.length - 1 ? 0 : cur + 1;
        //页数
        pageTip.innerHTML = (this.preSIndex + 1) + "/" + oLis.length;
        //span的宽度
        span.style.width = ((this.preSIndex + 1) / oLis.length) * 100 + "%";

    }
    oLis[this.preSIndex].style.webkitTransform = "translate(0," + pos + "px)";
    oLis[this.preSIndex].className = "zIndex";
    oLis[this.preSIndex].style.display = "block";
    oLis[cur].style.webkitTransform = "scale(" + (1 - scalePos) + ") translate(0," + changePos + "px)";
}
function end(e) {
    oLis[this.preSIndex].style.webkitTransform = "translate(0,0)";
    oLis[this.preSIndex].style.webkitTransition = "0.5s";
    oLis[this.preSIndex].addEventListener('webkitTransitionEnd', function () {
        this.style.webkitTransition = "";
        this.firstElementChild.id = "a" + (this.index + 1);
    })
}

document.addEventListener("touchstart",function(){},false);