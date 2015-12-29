function getEle(ele) {
    return document.querySelector(ele);
}
var bell = getEle("#bell");
var music = getEle("#music");
var main = getEle("#main");
var loading = getEle(".loading");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 1008;
if (winW / winH > desW / desH) {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
} else {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
}
var loadSpan = getEle(".loadSpan");
var arr = ['cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png'];
/*
, 'cubeImg5.png', 'cubeImg6.png', 'd.png', 'd2.gif', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'messageArrow1.png', 'messageArrow1.png', 'phoneBg.jpg', 'phoneBtn.png', 'phoneHeader.png', 'phoneKey.png'
*/

var n=0;
function fnLoad() {
    if(!arr){
        return;
    }
    for(var i=0;i<arr.length;i++){
        var oImg=new Image;
        oImg.src="images/"+arr[i];
        oImg.onload=function(){
            n++;
            loadSpan.style.width = (n / arr.length) * 100 + "%";
            if(n>=arr.length){
                if(loading){
                    main.removeChild(loading);
                }
            }
        }
    }
    /*arr.forEach(function () {
        var oImg = new Image();
        oImg.src = "images/" + arguments[0];
        oImg.onload = function () {
            n++;
            loadSpan.style.width = n / arr.length * 100 + "%";
            if(loading){
                if(n>=arr.length){
                    loading.remove();
                    fnPhone.init();
                }
            }

        }
    });*/
    /*loadSpan.addEventListener("webkitTransitionEnd", function () {
        console.log(this);
        this.parentNode.parentNode.remove();
        fnPhone.init();
    }, false)*/

}
fnLoad();
var phone = getEle('#phone');
var touchClick = getEle('.touchClick');
var fnPhone = {
    init: function () {
        bell.play();
        phone.addEventListener("touchstart", this.touch, false);
    },
    touch: function (e) {
        bell.pause();
        if (e.target.className == "touchClick") {
            touchClick.parentNode.style.display = "none";
            touchClick.parentNode.nextElementSibling.style.webkitTransform = "translate(0,0)";
            touchClick.addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
            }, false)

        } else if (e.target.className == "otherClick") {
            fnPhone.close();
        }
    },
    close: function () {
        phone.style.webkitTransform = "translate(0," + desH + "px)";
        window.setTimeout(function () {
            phone.remove();
            fnMessage();
        }, 1000)
    }
};
fnPhone.init();
var message = getEle(".message");
var messageUl = getEle('.message>ul');
var messageLis = document.querySelectorAll('.message>ul>li');
function fnMessage() {
    music.play();
    var n = 0;
    var h = 0;
    var timer = window.setInterval(function () {
        messageLis[n].style.opacity = 1;
        messageLis[n].style.webkitTransform = "translate(0,0)";
        h -= messageLis[n].offsetHeight - 20;
        if (n >= 3) {
            messageUl.style.webkitTransform = "translate(0," + h + "px)";
        }
        if (n == messageLis.length - 1) {
            window.clearInterval(timer);
            window.setTimeout(function () {
                message.remove();
                fnCube();
            }, 2000)
        } else {
            n++;
        }
    }, 1000)
}

var cube = getEle(".cube");
var tip = getEle(".tip");
var cubeBox = getEle('.cubeBox');
var cubeLis = document.querySelectorAll('.cubeBox>li');
function fnCube() {
    var startTouch = {x: 0, y: 0};
    var startX = -45;
    var startY = -45;
    cubeBox.style.webkitTransform = "scale(0.7) rotateX(-45deg) rotateY(-45deg)";
    [].forEach.call(cubeLis, function () {
        arguments[0].addEventListener('touchstart', start, false);
        arguments[0].addEventListener('touchmove', move, false);
        arguments[0].addEventListener('touchend', end, false);
    });
    function start(e) {
        startTouch.x = e.changedTouches[0].pageX;
        startTouch.y = e.changedTouches[0].pageY;
    }

    function move(e) {
        var moveTouchX = e.changedTouches[0].pageX;
        var moveTouchY = e.changedTouches[0].pageY;
        this.changePosX = moveTouchX - startTouch.x;
        this.changePosY = moveTouchY - startTouch.y;
        this.parentNode.style.webkitTransform = "scale(0.7)  rotateX(" + (-startY - this.changePosY) + "deg) rotateY(" + (startX + this.changePosX) + "deg)";
    }

    function end() {
        startX += this.changePosX;
        startY += this.changePosY;
    }
}
document.addEventListener('touchstart', function () {
}, false);

//resume
var resume = getEle("#resume");
var oLis = document.querySelectorAll(".slide>li");
tip.onclick = function () {
    resume.style.display = "block";
    main.style.display = "none";
};
resume.style.webkitTransform = "scale(" + winH / 960 + ")";
[].forEach.call(oLis, function () {
    arguments[0].index = arguments[1];
    arguments[0].addEventListener("touchstart", start, false);
    arguments[0].addEventListener('touchmove', move, false);
    arguments[0].addEventListener('touchend', end, false);
});
function start(e) {
    this.start = e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    this.flag = true;
    var moveTouch = e.changedTouches[0].pageY;
    var changePos = moveTouch - this.start;
    var cur = this.index;
    var step = 1 / 2;

    [].forEach.call(oLis, function () {
        if (arguments[1] != cur) {
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    });
    if (changePos > 0) {/*ÍùÏÂ»¬*/
        var pos = -winH + changePos;
        this.prevSIndex = cur == 0 ? oLis.length - 1 : cur - 1;

    } else if (changePos < 0) {/*ÍùÉÏ»¬*/
        this.prevSIndex = cur == oLis.length - 1 ? 0 : cur + 1;
        var pos = winH + changePos;

    }
    oLis[this.prevSIndex].style.webkitTransform = "translate(0," + pos + "px)";
    oLis[this.prevSIndex].className = 'zIndex';
    oLis[this.prevSIndex].style.display = "block";
    oLis[cur].style.webkitTransform = "scale(" + (1 - Math.abs(changePos) / winH * step) + ") translate(0," + changePos + "px)";
}
function end(e) {
    if (this.flag) {
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevSIndex].style.webkitTransition = "0.5s";
        oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
            this.firstElementChild.id = "a" + (this.index + 1);
        }, false)
    }

}
window.setTimeout(function(){
var head=resume.querySelector(".a1");
    head.style.id="a1";
},500);


