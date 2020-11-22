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
        success: function (layero, index) {
            add_sub(index);
        }
    })
})


function add_sub(numb) {
    $("#add_form").on("submit", function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    getList();
                    layer.close(numb);
                }
            }
        })
    })
}

// --------------删除-----------------
// /my/article/deletecate/:id  为了获取id值！
// 1.事件委托
$("tbody").on("click", ".delete", function(e) {
    var mytoken = localStorage.getItem("token");
    // 2.获取id；初始化的时候，需要把id和删除按钮绑定在一起；
    var id = $(e.target).attr("myid");
  
    // 3.发送删除请求
    $.ajax({
      url: "/my/article/deletecate/"+ id,
      success: function(res) {
        // 4.成功后：重新加载列表
        layer.msg(res.message);
        if (res.status === 0) {
            localStorage.setItem("token", mytoken);
          // 删除成功，重新渲染
          getList();
        }
      }
    })
  });
  
// -----------------编辑---------------

var edit_str = `
<form class="layui-form add-form" action="" style="margin: 30px; margin-left: 0px;" id="edit_form" lay-filter="edit">
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
  <input type="hidden" name="Id">
  <div class="layui-form-item">
    <div class="layui-input-block">
      <button class="layui-btn" lay-submit >确认修改</button>
    </div>
  </div>
</form>`;

// 1.事件委托
var form = layui.form;
$("tbody").on("click", ".edit", function(e){
    var id = $(e.target).attr("myid");
    $.ajax({
        url:'/my/article/cates/' + id,
        success:function(res){
            if(res.status === 0){
                layer.open({
                    type: 1,
                    title: '编辑类别',
                    content: edit_str,
                    area: ['500px', '250px'],
                    // 层创建完毕时,里面有显示获取到数据
                    success: function (layero, index) {
                        // 5. layui.form
                        //  5.1 去模板字符串里面新添加 type=hidden input;
                        //  5.2 layui.form;  form表单上 lay-filter="edit"
                        form.val("edit", res.data);

                        // 6.注册提交事件
                        edit_sub(index);
                    }
                })
            }
        }
    })
})


// 6.给form注册提交事件
function edit_sub(numb) {
    $("#edit_form").on("submit", function (e) {
        e.preventDefault();

        // 6.1 获取数据
        var data = $(this).serialize();

        // 6.2 提交
        $.ajax({
            url: "/my/article/updatecate",
            type: "post",
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    // 添加成功，重新渲染列表
                    getList();
                    // 关闭弹出层
                    layer.close(numb);
                }
            }
        })
    })
}
