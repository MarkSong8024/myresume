/**
 * Created by Song on 2015/11/28.
 */

//处理注册
~function () {
    var boxReg = document.getElementById("boxRegister");
    var markReg = document.getElementById("markRegister");
    var register = document.getElementById("register");
    var close = document.getElementById("close");
    var model = document.getElementById("model");
//duration:总时间 interval:时间因子 callBack:动画完成后的回调
    var move = function (duration, interval, callBack) {
        var _this = this;
        var stepW = (420 / duration) * interval, stepH = (520 / duration) * interval;
        ~function _move() {
            window.clearInterval(_this.timer);
            var curW = utils.css(_this, "width"), curH = utils.css(_this, "height");
            if (curW + stepW >= 420) {
                utils.setGroupCss(_this, {
                    width: 420,
                    height: 520
                });
                //处理拖拽
                utils.setGroupCss(boxReg, {
                    left: (winW - boxW) / 2,
                    top: (winH - boxH) / 2,
                    margin: 0
                });
                typeof callBack === "function" ? callBack.call(_this) : null;
                return;
            }
            utils.setGroupCss(_this, {
                width: curW + stepW,
                height: curH + stepH,
                marginLeft: -(curW + stepW) / 2,
                marginTop: -(curH + stepH) / 2
            });


            _this.timer = window.setTimeout(_move, interval);
        }();
    };
//展示div
    function showDiv() {
        //boxReg.style.display = "block";
        boxReg.style.visibility = "visible";
        move.call(boxReg, 2000, 10, function () {
            markReg.style.display = "block";
            close.style.display = "block";
            var count = 0;
            markReg.timer = window.setInterval(function () {
                if (count + 0.01 >= 1) {
                    utils.css(markReg, "opacity", 1);
                    window.clearInterval(markReg.timer);
                    return;
                }
                count += 0.01;
                utils.css(markReg, "opacity", count);
            }, 10);
        })
    }

    register.onclick = function (e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        //点击注册之前 先给整个页面加一个遮罩层,让其他按钮不可点击(模态窗口)
        model.style.display = "block";
        showDiv();
    };

//点击关闭
    close.onclick = function (e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        //取消模态窗口
        model.style.display = "none";
        goHome();
    };
//关闭逐渐消失表头
    function goHome() {
        //关闭按钮隐藏
        close.style.display = "none";
        window.clearInterval(markReg.timer);

        //处理关闭的时候,再次把整个div居中
        boxReg.style.top = 50 + "%";
        boxReg.style.left = 50 + "%";
        utils.setGroupCss(boxReg, {
            marginLeft: -210,
            marginTop: -260
        });

        var markRegO = utils.css(markReg, "opacity");
        markRegO -= 0.01;
        if (markRegO <= 0) {
            utils.css(markReg, "opacity", 0);
            window.clearTimeout(markReg.timer);
            hideBoxReg.call(boxReg, 2000, 15);
            return;
        }
        utils.css(markReg, "opacity", markRegO);
        markReg.timer = window.setTimeout(goHome, 15);
    }

//大的Div逐渐失去
    function hideBoxReg(duration, interval) {
        var _this = this;
        window.clearInterval(_this.timer);
        ~function move() {
            var stepW = (420 / duration) * interval, stepH = (520 / duration) * interval;
            var curW = utils.css(_this, "width"), curH = utils.css(_this, "height");
            if (curW <= stepW) {
                utils.setGroupCss(_this, {
                    width: 0,
                    height: 0
                });
                window.clearTimeout(_this.timer);

                return;
            }
            utils.setGroupCss(_this, {
                width: curW - stepW,
                height: curH - stepH,
                marginLeft: -(curW + stepW) / 2,
                marginTop: -(curH + stepH) / 2
            });
            _this.timer = window.setTimeout(move, 15);
        }();
    }

//处理拖拽
    var winW = document.documentElement.clientWidth || document.body.clientWidth, winH = document.documentElement.clientHeight || document.body.clientHeight;
    var boxW = 420, boxH = 520;
//获取四个边界的最大值和最小值
    var minL = 0, maxL = winW - boxW, minT = 0, maxT = winH - boxH;
//鼠标按下处理
    markReg.onmousedown = function (e) {
        e = e || window.event;
        //获取当前的鼠标和盒子的起始位置->增加到当前操作元素的自定义属性上
        this.strX = e.clientX;
        this.strY = e.clientY;
        this.strTop = utils.css(boxReg, "top");
        this.strLeft = utils.css(boxReg, "left");
        var _this = this;
        //IE和火狐的处理[大范围拖拽]
        if (this.setCapture) {
            this.setCapture();
            //鼠标移动
            this.onmousemove = moveBox;
            //鼠标抬起
            this.onmouseup = up;
        } else {
            //谷歌的处理[大范围拖拽]
            document.onmousemove = function (e) {
                moveBox.call(_this, e);
            };
            document.onmouseup = function (e) {
                up.call(_this, e);
            };
        }
    };

    var moveBox = function (e) {
        e = e || window.event;
        var curX = e.clientX, curY = e.clientY;
        var curLeft = this.strLeft + (curX - this.strX);
        var curTop = this.strTop + (curY - this.strY);
        if (curLeft <= minL) {
            utils.css(boxReg, "left", minL);
        } else if (curLeft >= maxL) {
            utils.css(boxReg, "left", maxL);
        } else {
            utils.css(boxReg, "left", curLeft);
        }

        if (curTop <= minT) {
            utils.css(boxReg, "top", minT);
        } else if (curTop >= maxT) {
            utils.css(boxReg, "top", maxT);
        } else {
            utils.css(boxReg, "top", curTop);
        }
    };
//处理大范围拖拽取消绑定
    var up = function (e) {
        e = e || window.event;
        if (this.releaseCapture) {
            this.releaseCapture();
            this.onmousemove = null;
            this.onmouseup = null;
        } else {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    };
}();

//处理美女时钟
~function () {
    var timeLine = document.getElementById("timeLine");
    window.onload = function () {
        setInterval(function () {
            var cDate = new Date();
            var hour = cDate.getHours();
            var minute = cDate.getMinutes();
            //处理图片下的红色滚动条
            var second = cDate.getSeconds();
            timeLine.style.width = second * 1.7 + "px";

            hour = hour.toString().length == 1 ? "0" + hour : hour + "";
            minute = minute.toString().length == 1 ? "0" + minute : minute + "";
            var imgAddress = "img/mm_全/" + hour + "_" + minute + ".jpg";
            document.getElementById("img").src = imgAddress;

        }, 1000);
    };
//获取元素
    var oDiv = document.getElementById("time");
    var oImg = document.getElementById("img");
    var intervalId = 0;
//鼠标悬停
    oImg.onmouseenter = function (e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        var divImg = document.getElementById("divImg");
        if (!divImg) {
            var oDiv1 = document.createElement("div");
            oDiv1.id = "divImg";
            oDiv1.style.background = "transparent";
            var str = "";
            str += "<img id='imgSrc' class='c1' src='" + oImg.src + "'/>";
            oDiv1.innerHTML = str;
            document.body.appendChild(oDiv1);
            var h = 0;
            ~function move() {
                oDiv1 = document.getElementById("divImg");
                window.clearTimeout(this.timer);
                if (h > 400) {
                    utils.setGroupCss(oDiv1, {
                        height: 400
                    });
                    window.clearTimeout(this.timer);
                    return;
                }
                utils.setGroupCss(oDiv1, {
                    height: h += 5
                });
                this.timer = window.setTimeout(move, 15);
            }();

            //处理展示动态获取图片
            intervalId = window.setInterval(function () {
                var imgSrc = document.getElementById("imgSrc");
                imgSrc.src = oImg.src;
            }, 1000);
        }
    };
//鼠标滑动
    oImg.onmousemove = function (e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        var oDiv1 = document.getElementById("divImg");
        if (oDiv1) {
            oDiv1.style.left = e.clientX + 20 + "px";
            oDiv1.style.top = e.clientY + 20 + "px";
        }
    };
//鼠标离开
    oImg.onmouseleave = function () {
        //清空动态展示的图片定时器
        window.clearInterval(intervalId);
        var oDiv1 = document.getElementById("divImg");
        if (oDiv1) {
            document.body.removeChild(oDiv1);
        }
    };
}();

//处理轮播图
~function () {
    var dataAry = ["img/banner/1.jpg", "img/banner/2.jpg", "img/banner/3.jpg", "img/banner/4.jpg", "img/banner/5.jpg", "img/banner/6.jpg"];
    var dataContext = ["投稿最后一天", "搞怪乐器OTAMATONE", "2015动画角色人气大赛", "玻璃之花与崩坏的世界", "bilibili正版完结番合集", "借金风暴说的就是你"];
    var zhufengEffect = {
        zfLinear: function zfLinear(t, b, c, d) {
            return c * t / d + b;
        },
        Quad: {
            easeIn: function QuadEaseIn(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function QuadEaseOut(t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOut: function QuadEaseInOut(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            }
        },
        Quint: {
            easeIn: function (t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function (t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function (t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOut: function (t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function ExpoEaseIn(t, b, c, d) {
                return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOut: function ExpoEaseOut(t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOut: function (t, b, c, d) {
                if (t == 0) return b;
                if (t == d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOut: function (t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function (t, b, c, d, a, p) {
                if (t == 0) return b;
                if ((t /= d / 2) == 2) return b + c;
                if (!p) p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else var s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
            }
        },
        Back: {
            easeIn: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        zfBounce: {
            easeIn: function (t, b, c, d) {
                return c - zhufengEffect.zfBounce.easeOut(d - t, 0, c, d) + b;
            },
            easeOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function (t, b, c, d) {
                if (t < d / 2) return zhufengEffect.zfBounce.easeIn(t * 2, 0, c, d) * .5 + b;
                else return zhufengEffect.zfBounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    };
    var animate = function (curEle, oTarget, duration, effect, callBack) {

        //初始化传递进来的参数值,主要处理的是动画的方式
        var fnEffect = zhufengEffect.Expo.easeOut;
        if (typeof effect === "number") {
            switch (effect) {
                case 1:
                    fnEffect = zhufengEffect.zfLinear;
                    break;
                case 2:
                    fnEffect = zhufengEffect.Elastic.easeOut;
                    break;
                case 3:
                    fnEffect = zhufengEffect.Back.easeOut;
                    break;
                case 4:
                    fnEffect = zhufengEffect.zfBounce.easeOut;
                    break;
                case 5:
                    fnEffect = zhufengEffect.Expo.easeIn;
                    break;
            }
        } else if (effect instanceof Array) {
            fnEffect = effect.length === 1 ? zhufengEffect[effect] : zhufengEffect[effect[0]][effect[1]];
        } else if (typeof effect === "function") {
            callBack = effect;
        }

        //times:当前运动的时间 interval:多长时间运动一次 oBegin:起始的位置集合 oChange:总距离集合 oTarget:目标的位置集合{left: "-2000", opacity: 1}
        var times = null, interval = 15, oBegin = {}, oChange = {};
        for (var key in oTarget) {
            if (oTarget.hasOwnProperty(key)) {
                oBegin[key] = utils.css(curEle, key);
                oChange[key] = oTarget[key] - oBegin[key];
            }
        }

        //实现我们的动画
        //1)清除之前正在运行的动画
        window.clearInterval(curEle.timer);
        //2)开始设置新的动画执行我们的操作
        curEle.timer = window.setInterval(function () {
            times += interval;
            if (times >= duration) {
                utils.setGroupCss(curEle, oTarget);
                window.clearInterval(curEle.timer);
                typeof callBack === "function" ? callBack.call(curEle) : null;
                return;
            }

            for (var key in oChange) {
                var curVal = fnEffect(times, oBegin[key], oChange[key], duration);
                utils.css(curEle, key, curVal);
            }
        }, interval);
    };

    /*下面是实现轮播图的具体的业务逻辑*/
    ~function () {
        //获取需要的元素
        var banner = document.getElementById("banner");
        var bannerImg = utils.getElementsByClass("bannerImg", banner);
        if (bannerImg.length <= 0) return;
        bannerImg = bannerImg[0];
        var bannerTip = utils.getElementsByClass("bannerTip", banner);
        if (bannerTip.length <= 0) return;
        bannerTip = bannerTip[0];


        //计算当前bannerImg的宽度和位置
        var bannerW = banner.clientWidth, totalW = (dataAry.length + 2) * bannerW, count = dataAry.length + 2;
        utils.setGroupCss(bannerImg, {
            width: totalW,
            left: -bannerW
        });
        //初始换数据绑定

        var initData = function () {
            var str = "";
            str += "<div trueImg='" + dataAry[dataAry.length - 1] + "'>";
            str += "<a class='dataCount'>" + dataContext[dataContext.length - 1] + "</a></div>";
            for (var i = 0; i < dataAry.length; i++) {
                str += "<div trueImg='" + dataAry[i] + "'>";
                str += "<a class='dataCount'>" + dataContext[i] + "</a></div>";
            }
            str += "<div trueImg='" + dataAry[0] + "'>";
            str += "<a class='dataCount'>" + dataContext[0] + "</a></div>";

            bannerImg.innerHTML = str;

            str = "";
            for (i = 0; i < dataAry.length; i++) {
                i === 0 ? str += "<li class='select'></li>" : str += "<li></li>";
            }
            bannerTip.innerHTML = str;

        };
        initData();
        //图片延迟加载
        var initAsyncImg = function () {
            var divList = bannerImg.getElementsByTagName("div");
            for (var i = 0; i < divList.length; i++) {
                ~function (i) {
                    var curDiv = divList[i];
                    if (!curDiv.isLoad) {
                        var oImg = new Image;
                        oImg.src = curDiv.getAttribute("trueImg");
                        oImg.onload = function () {
                            curDiv.appendChild(oImg);
                            curDiv.isLoad = true;
                        };
                    }
                }(i);
            }
        };
        window.setTimeout(initAsyncImg, 1000);


        var bannerL = document.getElementById("bannerL");
        var bannerR = document.getElementById("bannerR");
        var bannerTipList = bannerTip.getElementsByTagName("li");
        //实现li的切换
        var setTip = function (index) {
            index < 0 ? index = bannerTipList.length - 1 : null;
            index >= bannerTipList.length ? index = 0 : null;
            for (var i = 0; i < bannerTipList.length; i++) {
                bannerTipList[i].className = index === i ? "select" : null;
            }
        };

        //实现图片的切换
        var step = 1;
        var move = function (dir) {
            if (typeof dir === "undefined" || dir === "right") {
                step++;
                if (step >= count) {
                    utils.css(bannerImg, "left", -1 * bannerW);
                    step = 2;
                }
            } else if (dir === "left") {
                step--;
                if (step < 0) {
                    utils.css(bannerImg, "left", -(count - 2) * bannerW);
                    step = 5;
                }
            } else if (dir === "tip") {
                step = this.index + 1;
            }
            animate(bannerImg, {left: -step * bannerW}, 500, 4);
            setTip(step - 1);
        };

        //实现自动轮播
        bannerImg.autoTimer = window.setInterval(move, 3000);

        //鼠标滑过显示左右切换
        banner.onmouseenter = function () {
            window.clearInterval(bannerImg.autoTimer);
            bannerL.style.display = bannerR.style.display = "block";
        };
        banner.onmouseleave = function () {
            bannerImg.autoTimer = window.setInterval(move, 3000);
            bannerL.style.display = bannerR.style.display = "none";
        };

        //左右切换
        bannerL.onclick = function () {
            move("left");
        };
        bannerR.onclick = function () {
            move("right");
        };

        //实现焦点点击切换
        for (var i = 0; i < bannerTipList.length; i++) {
            bannerTipList[i].index = i;
            bannerTipList[i].onclick = function () {
                move.call(this, "tip");
            };
        }
    }();
}();

//处理推广绑定数据
~function () {
    var expand = document.getElementById("expand");
    var initData = function () {
        if (!DataArray)return;
        var frg = document.createDocumentFragment();
        var oUl = document.createElement("ul");
        var str = "";
        for (var i = 0; i < DataArray.length; i++) {
            var curItem = DataArray[i];
            curItem.trueImg = curItem.trueImg || "img/border/loading.gif";
            curItem.title = curItem.title || "--";
            str += "<li><div class='imgDiv'> <img src='img/border/img_loading.png' trueImg='" + curItem.trueImg + "' alt=''/> <div title='" + curItem.title + "' class='t'>" + curItem.title + "</div> </div></li>";
        }
        oUl.innerHTML = str;
        frg.appendChild(oUl);
        expand.appendChild(frg);
    };
    initData();
    //图片延迟加载
    //条件 当前图片的高度+图片距离body的偏移量<=当前屏幕的高度+卷去的高度
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    var imgList = expand.getElementsByTagName("img");
    var loadImg = function () {
        window.clearInterval(this.intervalId);
        var winT = document.documentElement.scrollTop || document.body.scrollTop;
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                if (!curImg.isLoad) {
                    var offT = utils.offset(curImg).top;
                    var curH = curImg.offsetHeight;
                    if (curH + offT <= winH + winT) {
                        var oImg = new Image;
                        oImg.src = curImg.getAttribute("trueImg");
                        oImg.onload = function () {
                            curImg.src = this.src;
                            showImg(curImg);
                            curImg.isLoad = true;
                        };
                    }
                }
            }(i);
        }
    };
    var showImg = function (curEle) {
        var count = 0;
        var intervalId = window.setInterval(function () {
            count += 0.01;
            curEle.style.opacity = count;
            if (count >= 1) {
                window.clearInterval(intervalId);
                return;
            }
        }, 10);
    };
    window.onscroll = loadImg;
    window.setTimeout(loadImg, 1000);
}();


















