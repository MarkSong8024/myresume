/*
 *插件作者:LPY
 *发布时间:2016年03月29日
 *插件介绍:图片上传本地预览插件 兼容浏览器(IE 谷歌 火狐) 为测试safari 当然如果是使用这些内核的浏览器基本都兼容
 *作  者QQ:1721821916
 *使用方法:
 *界面构造(IMG标签外必须拥有DIV 而且必须给予DIV控件ID)
 *<div id="Up0">
 *<!--<img class="imgShowUp0">       这是默认的缩略图，可选-->
 *<input type="file" class="UpSty1" id="Up0-Input0" name="ImagePathUp0">
 *</div>
 *<input type="button" class="UpSty2" id="BtnInputUp0">
 *建议请不要自行修改默认的样式名及ID，以防出现无法使用的问题

 *调用代码:
 *new uploadPreview({UpBtn: "InputUp0", DivShow: "Up0", ImgShow: "imgShowUp"});
 *参数说明:
 *UpBtn:选择文件控件ID;
 *DivShow:DIV控件ID;
 *ImgShow:图片控件ID;
 *Width:预览宽度;
 *Height:预览高度;
 *ImgType:支持文件类型 格式:["gif", "jpeg", "jpg", "bmp", "png"];
 *callback:选择文件后回调方法;

 *版本:v1.1
 1.实现每组最大上传限制为5张图片
 2.每个上传后的图片生成一个缩略图
 3.鼠标点击缩略图后，该图片删除，需要重新上传
 4.每个缩略图前面的那个input为上传的图片的文件域，与后台对接使用---这个是实现的思路。
 5.默认有一个[type=file]的input，最后也会有一个。这个是用来获取第一个上传的图片用的。---不要删除。
 */


var uploadPreview = function (setting) {
    var _this = this;
    console.log(this);

    _this.IsNull = function (value) {
        if (typeof (value) == "function") {
            return false;
        }
        if (value == undefined || value == null || value == "" || value.length == 0) {
            return true;
        }
        return false;
    };

    _this.DefautlSetting = {
        UpBtn: "",
        DivShow: "",
        ImgShow: "",
        Width: 100,
        Height: 100,
        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        ErrMsg: "选择文件错误,图片类型必须是(gif,jpeg,jpg,bmp,png)中的一种",
        callback: function () {
        }
    };

    _this.Setting = {
        UpBtn: _this.IsNull(setting.UpBtn) ? _this.DefautlSetting.UpBtn : setting.UpBtn,
        DivShow: _this.IsNull(setting.DivShow) ? _this.DefautlSetting.DivShow : setting.DivShow,
        ImgShow: _this.IsNull(setting.ImgShow) ? _this.DefautlSetting.ImgShow : setting.ImgShow,
        Width: _this.IsNull(setting.Width) ? _this.DefautlSetting.Width : setting.Width,
        Height: _this.IsNull(setting.Height) ? _this.DefautlSetting.Height : setting.Height,
        ImgType: _this.IsNull(setting.ImgType) ? _this.DefautlSetting.ImgType : setting.ImgType,
        ErrMsg: _this.IsNull(setting.ErrMsg) ? _this.DefautlSetting.ErrMsg : setting.ErrMsg,
        callback: _this.IsNull(setting.callback) ? _this.DefautlSetting.callback : setting.callback
    };
    //获取公共后缀
    var LPY = _this.Setting.DivShow;

    //获取图片样式
    var imgP = "." + _this.Setting.ImgShow;

//获取上传按钮
    var btn1 = document.getElementById("BtnInput" + LPY);

    $(btn1).on('click', function () {
//每个上传按钮点击事件为最后新增加的input的点击事件。
        $("input", $(this).prev()).last()[0].click();

    });


    _this.getObjectURL = function (file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        //console.log(url);  缩略图的url
        return url;
    };

    _this.Bind = function () {
        //给第一个input绑定onchange事件
        $("input", $(btn1).prev()).last()[0].onchange = fn;

        function fn() {
            //设置最大上传图片个数为5

            if ($("#"+LPY +" .imgShow"+LPY).length >= 5) {

                console.log(this);
                //替换掉最后一个input
                $input = '<input name="ImagePathUp0" class="UpSty1" type="file">';
                $("#"+LPY).append($input);

                alert("最多上传5张图片");
                //删除最后一个input
                $(this).remove();

                //这个新增加的input没有事件fn;
                $("#"+LPY+" input").last()[0].onchange = fn;

                return;
            }


            //上传的图片类型检测
            if (this.value) {
                if (!RegExp("\.(" + _this.Setting.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert(_this.Setting.ErrMsg);
                    this.value = "";
                    return false;
                }

                //缩略图的img标签jq对象
                var imgShowClass = _this.Setting.ImgShow;

                //动态创建图片
                var oImg = null;
                if (window.navigator.userAgent.indexOf('MSIE') > -1) {
                    //为处理IE下默认img的预览失败的小图标，用p标签方式解决。
                    oImg = document.createElement('p');
                } else {
                    //其他浏览器用img标签。
                    oImg = document.createElement('img');
                }
                //增加相同的样式
                oImg.className = imgShowClass;
                //添加图片到这一组的最后
                var oDiv = document.getElementById(LPY);
                oDiv.appendChild(oImg);

                //创建input，用于存放新增加图片的信息。
                var oInput1 = document.createElement('input');
                oInput1.type = "file";
                oInput1.className = "UpSty1";
                //oInput1.id = LPY + "-Input" + ($(imgP).length );
                oInput1.name = "ImagePath" + LPY;
                //新增加的input的修改上传内容之后，执行onchang事件，这样写的目的是为了处理新增加的标签没有事件。----这点很重要
                oInput1.onchange = fn;
                oDiv.appendChild(oInput1);

                //---------------下面的代码尽量不要进行修改，因为没有注释
                if (navigator.userAgent.indexOf("MSIE") > -1) {
                    try {
                        $(imgP)[parseInt($(imgP).length)].src = _this.getObjectURL(this.files[0]);

                        alert(1);
                        //document.getElementById(_this.Setting.ImgShow).src = _this.getObjectURL(this.files[0]);

                    } catch (e) {
                        //IE，目前缩略图展示有问题，需要和原始的比对来进行事先缩略图的显示
                        var div = $("." + imgShowClass).last()[0];

                        this.select();
                        top.parent.document.body.focus();
                        var src = document.selection.createRange().text;

                        document.selection.empty();

                        div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale)";
                        div.style.width = _this.Setting.Width + "px";
                        div.style.height = _this.Setting.Height + "px";
                        //div._imgShow( ImagePreview.TRANSPARENT, div.style.width, div.style.height );
                        try {
                            div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                        } catch (e) {
                            alert("该图片无法上传，请更换图片后上传");
                            //上传失败后，删除上传的内容，并提示用户重新上传
                            $(div).prev().remove();
                            $(div).remove();
                            return;
                        }
                    }
                } else {
                    //chrome/FF缩略图
                    $("." + imgShowClass)[($(imgP).length - 1)].src = _this.getObjectURL(this.files[0]);
                }
                //---------------上面的代码尽量不要进行修改，因为没有注释

                //如果有callback，执行，自行设置
                _this.Setting.callback();

                //下面是用来删除图片的代码
                oImg.onmouseover = function () {
                    //鼠标悬浮的元素的增加ID，记录鼠标现在在哪个图片的上面，等待点击图片删除的时候使用。
                    //目前没有什么用，为以后增加功能预留接口。
                    this.id = "1234";
                };

                oImg.onmouseout = function () {
                    //鼠标移动到图片外面的时候，删除图片备注ID
                    this.id = "";
                };


                oImg.onclick = function () {
                    //点击图片，图片删除，新增加input也进行删除
                    $(this).prev().remove();
                    $(this).remove();
                };


            }

        }
    };

    _this.Bind();
};