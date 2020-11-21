// ---------------  创建剪裁区
// - 调用cropper方法，创建剪裁区
$('#image').cropper({
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（选择器）
});

$(".select").click(function () {
    $("#file").click();
});

// 选择图片
// 1.事件：change 文件被选择的时候
// 2.选择某个图片后，确实可以得到文件信息的对象，需要图片src地址
//    URL内置对象  URL.createObjectURL(文件信息对象) ---》临时文件地址
// 3.
$("#file").change(function () {
    // 文件对象
    var obj = this.files[0];
    // 创建临时地址
    var src = URL.createObjectURL(obj);
    // 替换
    $("#image").cropper("replace", src);
})

$(".sure").click(function(){
    var canvas = $("#image").cropper("getCroppedCanvas", {
        width:100,
        height:100
    });
    var base64 = canvas.toDataURL("image/png");
    $.ajax({
        type:'POST',
        url:'/my/update/avatar',
        data:{avatar: base64},
        success:function(res){
            layer.msg(res.message);
            if(res.status === 0){
                window.parent.get();
            }
        }
    })
})