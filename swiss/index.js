

//弹出层
  var a=0;
var oLi = document.getElementById("ul1").getElementsByTagName("li");
for (var i = 0; i < oLi.length; i++) {
    oLi[i].index = i;
    oLi[i].onclick = function () {
        var keepOut = document.getElementById("keepOut");
        keepOut.style.display = "block";
        var oP = document.getElementById("p1");
        oP.innerHTML = "你选择了\"" + this.getAttribute('val') + "\"组别, 之后你将无法修改此分组设置, 要继续吗 ? ";
        var oDiv2 = document.getElementsByClassName("div2")[0];
        oDiv2.style.display = "block";
        var yes = document.getElementById("yes");
        var no = document.getElementById("no");
        yes.onclick = function () {
            alert("xxxx");
        }
        no.onclick = function () {
            keepOut.style.display = "none";
            oDiv2.style.display = "none";
        }
    }
}
//非空验证信息

var oText = document.querySelectorAll(".pres ul li input[type='text']");
var oBtn = document.querySelector(".pres ul li input[type='button']");
oBtn.onclick = function () {
    for (var i = 0; i < oText.length; i++) {
        //清空前后的空格
        if (oText[i].value.replace(/(^\s*)|(\s*$)/g, "") == "") {
            alert("请输入" + oText[i].getAttribute("val") + "后进行提交操作!");
            return;
        }
        if (oText[i].getAttribute("val") == "手机号") {
            if (!(/^1[3|4|5|8]\d{9}$/.test(oText[i].value))) {
                alert("输入的手机号格式不正确!");
                return;
            }
        }
        if (oText[i].getAttribute("val") == "电子邮件") {
            if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(oText[i].value))) {
                alert("输入的电子邮件格式不正确!");
                return;
            }
        }
    }
}
