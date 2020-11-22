// 1.获取传入id值；
var str = window.location.search;
var id = str.slice(4);



// 2.---------------------------初始化工作：富文本  图片区  下拉选择框
var form = layui.form;
$.ajax({
  url: '/my/article/cates',
  success: function(res) {

    if (res.status == 0) {
      var str = `<option value="">所有分类</option>`;
      $.each(res.data, function(index, ele) {
        str += `<option value="${ele.Id}">${ele.name}</option>`;
      });
      $("select").html(str);

      // form：更新渲染；
      form.render('select');

      // 内容加载
      get();
    }
  }
});


// --初始化富文本
initEditor();


// --图片裁剪
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



// 3.------------------------------获取这篇文章 内容，展示！
function get() {
  $.ajax({
    url: "/my/article/" + id,
    success: function(res) {
      console.log(res);
      if (res.status == 0) {
        // 快速填入
        form.val("edit", res.data);

        // 图片需要单独设置
        $('#image').cropper("replace", 'http://ajax.frontend.itheima.net' + res.data.cover_img);
      }
    }
  })
}



// ---------------------------------更新文章
$('form').on('submit', function(e) {
  // 设置加载loading;
  var index = layer.load(2, { shade: [0.8, '#393D49'] });

  e.preventDefault();

  // 收集表单数据
  var fd = new FormData(this);


  // 替换FormData对象里面的一项
  fd.set('content', tinyMCE.activeEditor.getContent());
  fd.append('Id', id);

  // 剪裁图片
  var canvas = $('#image').cropper('getCroppedCanvas', {
    width: 400,
    height: 280
  });
  // 
  canvas.toBlob(function(file) {
    fd.append('cover_img', file);

    // ajax提交给接口，从而完成添加
    $.ajax({
      type: 'POST',
      url: '/my/article/edit',
      data: fd,
      // 提交formdata数据，必须加下面两个选项
      processData: false,
      contentType: false,
      success: function(res) {
        layer.msg(res.message);
        if (res.status === 0) {
          location.href = '/article/list/list.html';

          // 关闭层
          layer.close(index);
        }
      }
    });
  });

});