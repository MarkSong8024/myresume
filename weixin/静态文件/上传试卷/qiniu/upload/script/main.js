/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */


$(function () {
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'container',
        drop_element: 'container',
        max_file_size: '1000mb',
        flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        multi_selection: !(mOxie.Env.OS.toLowerCase() === "ios"),
        //uptoken_url: $('#uptoken_url').val(),
        uptoken_func: function () {
            /* var ajax = new XMLHttpRequest();
             ajax.open('GET', '/exam/baseItem!queryQiNiuToken.action?key=', false);
             ajax.setRequestHeader("If-Modified-Since", "0");
             ajax.send();
             if (ajax.status === 200) {
             var res = JSON.parse(ajax.responseText);
             console.log('custom uptoken_func:' + res.uptoken);
             return res.uptoken;
             } else {
             console.log('custom uptoken_func err');
             return '';
             }*/
            return 'm09JjXIMS9DQNynZitAF-NU1z3n1vpyoD7xaG64G:UpqJ5sk0iluFQIRAdxxq3IZCRvw=:eyJzY29wZSI6InRpa3UiLCJpbnNlcnRPbmx5IjowLCJyZXR1cm5Cb2R5Ijoie1wiYnVja2V0XCI6JChidWNrZXQpLFwia2V5XCI6JChrZXkpLFwiZm5hbWVcIjokKGZuYW1lKSxcImZzaXplXCI6JChmc2l6ZSl9IiwibWltZUxpbWl0IjoiaW1hZ2UvKiIsImRlYWRsaW5lIjozMjQwODcwMjYyfQ=='
        },
        //domain: $('#domain').val(),
        //查看地址
        domain: 'http://file.aibeike.com/',

        get_new_uptoken: false,
        // downtoken_url: '/downtoken',
        unique_names: false,
        // save_key: true,
        // x_vars: {
        //     'id': '1234',

        //     'time': function(up, file) {
        //         var time = (new Date()).getTime();
        //         // do something with 'time'
        //         return time;
        //     },
        // },
        //自动上传 true为自动上传,false为取消自动上传
        auto_start: false,

        log_level: 5,
        init: {
            'FilesAdded': function (up, files) {
                //隐藏选择图片
                //$(".exam_SelectImg").hide();
                //隐藏文案
                $("#android").hide();
                $('table').show();

                $('#success').hide();
                plupload.each(files, function (file) {
                    var progress = new FileProgress(file, 'fsUploadProgress');
                    //progress.setStatus("等待...");
                    //progress.setStatus("上传中...");
                    progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function (up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function (up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                progress.setProgress(file.percent + "%", file.speed, chunk_size);
            },
            'UploadComplete': function () {
                //展示图片
                $('.exam_Info').show();
                //隐藏进度条
                $('.exam_progress').hide();
                //显示成功
                //$("#success").show();


            },
            'FileUploaded': function (up, file, info) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                progress.setComplete(up, info);
                console.log(info);
            },
            'Error': function (up, err, errTip) {
                $('table').hide();
                if (err.status == 403) {
                    $('.exam_SelectImg').show();
                    $('#android').show();
                } else {
                    $('.exam_SelectImg').show();
                    $('#android').show();
                }

                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            },
            //图片名称
            'Key': function (up, file) {
                //获取文件类型
                var typeImg = file.name.substr(file.name.lastIndexOf('.'));
                key = "paper/" + new Date().getTime();
                return key + typeImg;
            }
        }
    });


    //截取url地址获取参数
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }

    var num_qiniu = getQueryString("num");
    var id_qiniu = getQueryString("id");
    var key_qinniu = getQueryString("key");
    if (num_qiniu) {
        $("#que_num").html("第" + num_qiniu + "题答案");
    }

    uploader.bind('FileUploaded', function () {
        console.log('hello man,a file is uploaded');
    });
    $('#container').on(
        'dragenter',
        function (e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        }
    ).on('drop', function (e) {
            e.preventDefault();
            $('#container').removeClass('draging');
            e.stopPropagation();
        }).on('dragleave', function (e) {
            e.preventDefault();
            $('#container').removeClass('draging');
            e.stopPropagation();
        }).on('dragover', function (e) {
            e.preventDefault();
            $('#container').addClass('draging');
            e.stopPropagation();
        });


    $('#show_code').on('click', function () {
        $('#myModal-code').modal();
        $('pre code').each(function (i, e) {
            hljs.highlightBlock(e);
        });
    });


    $('body').on('click', 'table button.btn', function () {
        $(this).parents('tr').next().toggle();
    });


    var getRotate = function (url) {
        if (!url) {
            return 0;
        }
        var arr = url.split('/');
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === 'rotate') {
                return parseInt(arr[i + 1], 10);
            }
        }
        return 0;
    };

    $('#myModal-img .modal-body-footer').find('a').on('click', function () {
        var img = $('#myModal-img').find('.modal-body img');
        var key = img.data('key');

        var oldUrl = img.attr('src');
        var originHeight = parseInt(img.data('h'), 10);
        var fopArr = [];
        var rotate = getRotate(oldUrl);
        if (!$(this).hasClass('no-disable-click')) {
            $(this).addClass('disabled').siblings().removeClass('disabled');
            if ($(this).data('imagemogr') !== 'no-rotate') {
                fopArr.push({
                    'fop': 'imageMogr2',
                    'auto-orient': true,
                    'strip': true,
                    'rotate': rotate,
                    'format': 'png'
                });
            }
        } else {
            $(this).siblings().removeClass('disabled');
            var imageMogr = $(this).data('imagemogr');
            if (imageMogr === 'left') {
                rotate = rotate - 90 < 0 ? rotate + 270 : rotate - 90;
            } else if (imageMogr === 'right') {
                rotate = rotate + 90 > 360 ? rotate - 270 : rotate + 90;
            }
            fopArr.push({
                'fop': 'imageMogr2',
                'auto-orient': true,
                'strip': true,
                'rotate': rotate,
                'format': 'png'
            });
        }

        $('#myModal-img .modal-body-footer').find('a.disabled').each(function () {

            var watermark = $(this).data('watermark');
            var imageView = $(this).data('imageview');
            var imageMogr = $(this).data('imagemogr');

            if (watermark) {
                fopArr.push({
                    fop: 'watermark',
                    mode: 1,
                    image: 'http://www.b1.qiniudn.com/images/logo-2.png',
                    dissolve: 100,
                    gravity: watermark,
                    dx: 100,
                    dy: 100
                });
            }

            if (imageView) {
                var height;
                switch (imageView) {
                    case 'large':
                        height = originHeight;
                        break;
                    case 'middle':
                        height = originHeight * 0.5;
                        break;
                    case 'small':
                        height = originHeight * 0.1;
                        break;
                    default:
                        height = originHeight;
                        break;
                }
                fopArr.push({
                    fop: 'imageView2',
                    mode: 3,
                    h: parseInt(height, 10),
                    q: 100,
                    format: 'png'
                });
            }

            if (imageMogr === 'no-rotate') {
                fopArr.push({
                    'fop': 'imageMogr2',
                    'auto-orient': true,
                    'strip': true,
                    'rotate': 0,
                    'format': 'png'
                });
            }
        });

        var newUrl = Qiniu.pipeline(fopArr, key);

        var newImg = new Image();
        img.attr('src', 'images/loading.gif');
        newImg.onload = function () {
            img.attr('src', newUrl);
            img.parent('a').attr('href', newUrl);
        };
        newImg.src = newUrl;
        return false;
    });

    $('#up_load').on('click', function () {
        uploader.start();
    });
    $('#stop_load').on('click', function () {
        uploader.stop();
    });


});
