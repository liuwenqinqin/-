// -----------------列表----------

function getList() {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            if (res.status == 0) {
                var str = "";
                $.each(res.data, function (index, ele) {
                    str += `<tr>
                            <td>${ele.name}</td>
                            <td>${ele.alias}</td>
                            <td>
                                <button myid="${ele.Id}" data-name="${ele.name}" data-alias="${ele.alias}" type="button" class="layui-btn layui-btn-xs edit">编辑</button>
                                <button myid="${ele.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>
                            </td>
                            </tr>`
                });
                $("tbody").html(str);
            }
        }
    })
}

getList();


// --------------新增-----------------
var add_str = `
  <form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="add_form">
    <div class="layui-form-item">
      <label class="layui-form-label">类别名称</label>
      <div class="layui-input-block">
        <input type="text" name="name" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">类别别名</label>
      <div class="layui-input-block">
        <input type="text" name="alias" required lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-block">
        <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
      </div>
    </div>
  </form>`;
$(".add").click(function () {
    layer.open({
        type: 1,
        title: '添加类别',
        content: add_str,
        area: ['500px', '250px'],
        success:function(layero, index){
            add_sub(index);
        }
    })
})


function add_sub(numb){
    $("#add_form").on("submit", function(e){
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data: data,
            success:function(res){
                layer.msg(res.message);
                if(res.status === 0){
                    getList();
                    layer.close(numb);
                }
            }
        })
    })
}