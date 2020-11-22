// --------------------------------------------------加载分类数据
var form = layui.form;
$.ajax({
  url: '/my/article/cates',
  success: function(res) {

    if (res.status == 0) {
      var str = `<option value="">所有分类</option>`;
      $.each(res.data, function(index, ele) {
        str += `<option value="${ele.Id}">${ele.name}</option>`;
      });
      $("select").eq(0).html(str);

      // form：更新渲染；
      form.render('select');
    }
  }
});

// -------------------------------------------------初始化富文本
initEditor();


// -------------------------------------------------图片裁剪
function initCropper() {
  $('#image').cropper({
    // 纵横比(宽高比)
    aspectRatio: 400 / 280,
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（选择器）
  });

  // 选择图片
  $(".select").click(function() {
    $("#file").click();
  });

  // 弹窗：选择某个文件 file状态发生改变 change
  $("#file").change(function() {

    // 1.文件对象；
    var obj = this.files[0];

    // 2.URL内置对象 文件对象----> 创建临时地址
    var src = URL.createObjectURL(obj);

    // 3.替换: 插件进行替换
    $('#image').cropper("replace", src);
  });
}
initCropper();


// ------------------------------------------------发布
$("form").on("submit", function(e) {
  e.preventDefault();

  // 提交数据 formData(); ajax配置！后台接口支持！必须有name属性配置；
  var fd = new FormData(this);
  // console.log(fd);

  // 遍历：可以看到内部已经添加什么数据？
  // fd.forEach(function (val, key) {
  //   console.log(val, key);
  // })

  // 
  // 原因：这个两个区域，已经被各自插件所加载了！
  // 解决：想办法把img 富文本内容 添加到fd；

  //   1.富文本有名，没有值；需要重新设置下！查文档找如何获取内容！
  fd.set("content", tinyMCE.activeEditor.getContent());
  //   2.添加 裁剪后的图片信息   cover_img：值 文件对象；
  //     借助 canvas 查文档 获取裁剪后的文件对象！
  var canvas = $('#image').cropper('getCroppedCanvas', {
    width: 400,
    height: 280
  });
  //    canvas 用户获取文件对象,不是前面用户 base64字符串
  canvas.toBlob(function(file) { // 文件对象
    // 添加img 参数值：
    fd.append("cover_img", file);

    // 
    // 完成添加
    $.ajax({
      type: 'POST',
      url: '/my/article/add',
      // fd:对象;
      data: fd,
      // 提交formdata数据，必须加下面两个选项
      processData: false,
      contentType: false,
      success: function(res) {
        layer.msg(res.message);
        // 设计：
        if (res.status == 0) {
          // 页面转跳到 文章列表 页面
          location.href = '/article/list/list.html';

          // 响应dom节点 类名添加
          var dom = window.parent.document.querySelector("#wzlist");
          $(dom).addClass("layui-this").next().removeClass("layui-this");
        }
      }
    });
  });










});