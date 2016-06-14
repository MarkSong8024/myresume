$(function () {
    $("#firstClick").on("touchstart", function (e) {
        e.preventDefault();
        $("#stamp_landing_popup").css({visibility: "visible"});
    });

    $("#firstClose").on("touchstart", function (e) {
        e.preventDefault();
        $("#stamp_landing_popup").css({visibility: "hidden"});
    });
    $("#firstClose_1").on("touchstart", function (e) {
        e.preventDefault();
        $("#stamp_landing_popup_2").css({visibility: "hidden"});
    });
    $("#firstClose_2").on("touchstart", function (e) {
        e.preventDefault();
        $("#stamp_landing_popup_3").css({visibility: "hidden"});
    });
    var isTrue=false;
    $(".firstButton").on("touchstart", function (e) {
        if(isTrue)return;
        e.preventDefault();
        var img=new Image;
        $(".firstPage").hide();
        $(".configBody").show();
        var time =3;
        var interVal = window.setInterval(function () {
            console.log(time);
            time--;
            if(time>=0){
                img.src='img/count-down-' + time + '.png';
                img.onload=function(){
                    $('#countDown').prop('src', img.src);
                }
            }
            if (time <0) {
                clearInterval(interVal);
                $("#stamp_landing_popup_6").hide();
            }
        }, 1000);
    });

    $("#lottery").on("touchstart", function (e) {
        e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;

    });
    $("#gameOverButton").on("touchstart", function (e) {
        e.preventDefault();
        $(".gameOverPage").hide();
        $(".scratch_card_page").css({visibility: "visible"});
    })
    $("#lottery").on("touchmove", function (e) {
        if(isTrue) return;
        e.preventDefault();
        var moveEndX = e.originalEvent.changedTouches[0].pageX,
            moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - (startX + 50),
            Y = moveEndY - (startY + 50);

        if (Math.abs(X) > Math.abs(Y) && X > 50) {
            $("img#lottery").attr("src", "img/guajiang-2.png");
            $("#scratch_card_p").css({visibility: "visible", "z-index": "10"});
            $("#scratchButton_1").css({visibility: "visible"});
            $("#scratchP").text("填写领奖信息");
            showImg();


        }
        else if (Math.abs(X) > Math.abs(Y) && X < -50) {
            $("img#lottery").attr("src", "img/guajiang-2.png");
            $("#scratch_card_p").css({visibility: "visible", "z-index": "10"});
            $("#scratchButton_1").css({visibility: "visible"});
            $("#scratchP").text("填写领奖信息");
            showImg();
        }
    });
    $("#scratchP").on('touchstart', function (e) {
        e.preventDefault();
        if ($(this)[0].innerText == '填写领奖信息') {
            $(".drawn_prize_page").css({visibility: "visible"});
            $(".scratch_card_page").hide();
        }
    })
    $("#scratchButton_2").on('touchstart', function (e) {
        e.preventDefault();
        if ($('#userPres').val().replace(/\s+/g, '') == "") {
            return alert("请填写您的姓名!");
        }
        if ($("#presText_inp").val() == "") {
            alert('请输入手机号码!');
        }
        else {
            var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            var b = reg.test($("#presText_inp").val());
            if (!b) {
                return alert("手机号码格式不正确！");
            }
        }
        $("#content").hide();
        $("#context_1").show();
        $(".pres").hide();
        $("#context_2").show();
        $("#button_context").html("立即分享");
    });
    $("#button_context").on('touchstart', function (e) {
        e.preventDefault();
        if ($(this)[0].innerText == '立即分享') {
            $("#stamp_landing_popup_4").css({visibility: "visible"});
        }
    });
    function showImg(){
       var interVal=window.setTimeout(function(){
           $("img#lottery").hide();
       },1000)
    }
});

