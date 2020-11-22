// -----------------------------------------------加载分类
var form = layui.form;
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        if (res.status == 0) {
            var str = `<option value="">所有分类</option>`;
            $.each(res.data, function (index, ele) {
                str += `<option value="${ele.Id}">${ele.name}</option>`;
            });
            $("select").eq(0).html(str);
            // form：更新渲染；
            form.render('select');
        }
    }
});

// ----------------------------------------------------加载文章列表

// 分页：单独来个功能；
// ----------------------------------------------------加载文章列表
var laypage = layui.laypage;
var data = {
    pagenum: 1,
    pagesize: 2,
    // 后面的参数，不传，不查这些状态的话，所有状态 分类的文章全部返回！
};
getList();

function getList() {
    $.ajax({
        url: "/my/article/list",
        data: data,
        success: function (res) {
            if (res.status == 0) {
                var str = "";
                $.each(res.data, function (index, ele) {
                    str += `<tr>
                  <td>${ele.title}</td>
                  <td>${ele.cate_name}</td>
                  <td>${ele.pub_date.slice(0, ele.pub_date.length - 4)}</td>
                  <td>${ele.state}</td>
                  <th>
                    <a href="/article/edit/edit.html?id=${ele.Id}" class="layui-btn layui-btn-xs">编辑</a>
                    <button myid="${ele.Id}" type="button" class="layui-btn layui-btn-xs layui-btn-danger del">删除</button>
                  </th>
                </tr>`;
                });
                $('tbody').html(str);
                // 初始化分页；
                getPage(res.total);
            }
        }
    });
}

// ----------------------------------------------------分页
// 分页功能：
//    1.div  id="xxx"
//    2.render初始化函数  配置项：有些数据需要服务器返回的数据才能使用；
function getPage(total) {
    laypage.render({
        // 容器的id值；
        elem: 'page',
        // 数据总数，服务器返回数据
        count: total,
        // 每页要显示条数
        limit: data.pagesize,
        // 当前是第几页
        curr: data.pagenum,
        // 下拉框的值，表示每页多少条，下拉框用于更换
        limits: [2, 5, 10],
        // 布局：出现什么功能
        layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],

        // 页码切换、页显示数量 值发生改变的时候
        jump: function (obj, first) {
            // console.log(first); // true 模块第一次加载  undefined这是后面的一些操作！

            // first的值 undefined 判断 必须加！
            // 代表：这是后面的一些人为操作
            if (first == undefined) {
                // obj.curr   当前选择页码
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                getList();
            }
        }
    });
}

// 目标：点击筛选功能-------------------------------------------------------
//       拿到两个数据值：分类值  发布状态值；
//       细致查询：以前data{页码和容量}  现在data:{页码、容量、分类、发布状态}
//       发出细致参数，请求，回来的数据，查询后结果！
$("form").on("submit", function (e) {
    e.preventDefault();

    // 1.收集数据  分类和状态
    // var params = $(this).serialize(); // 需要自己从字符串出找出需要值！
    var arr = $(this).serializeArray(); // 返回不是个字符串  数组对象！不能直接用于提交数据！找自己需要数据！

    // 2.设置给全局的data;  
    data.cate_id = arr[0].value;
    data.state = arr[1].value;
    //   产品设计：如果用户要查询分类，默认从第一页开始看
    data.pagenum = 1;

    // 3.调用
    getList();
});


// --------------删除----------------
$("tbody").on("click",".del", function(e) {
    var id = $(e.target).attr("myid");
    $.ajax({
        url:"/my/article/delete/" + id,
        success: function () {
          getList();
        
    }
    })
})