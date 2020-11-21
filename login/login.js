// -------------------登录和注册页面切换
$("#goto-register").on("click", function () {
    $("#login").hide();
    $("#register").show();
})
$("#goto-login").on("click", function () {
    $("#login").show();
    $("#register").hide();
});

// 验证环节
// 验证：记录下来；提高开发效果；
var form = layui.form;
form.verify({
    // 规则名：函数，必须有return，不符合正则提醒信息
    changdu: [/^\S{6,12}$/, '长度为6-12位，不能有空格'],
    // 规则名：[正则、不符合正则提醒信息]
    same: function (val) {
        // 再次输入：val
        // 第一次输入：直接获取
        if ($('.pwd').val() != val) {
            return "两次输入的密码不一致";
        }
    }


})

// ----------------注册--------
// 注册事件
$('#register .layui-form').on("submit", function (e) {
    // 1.阻止默认行为
    e.preventDefault();
    // 2.收集信息
    var data = $(this).serialize();
    // 3.提交信息
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {

                $("#register").stop().hide();
                $("#login").stop().show();

                // 清空表单 ：原生方法；重置
                $('#register .layui-form')[0].reset();
            }


        }
    });
})

// ----------------登录--------
$('#login form').on("submit", function (e) {
    // 1.阻止默认行为
    e.preventDefault();
    // 2.收集账号、密码信息
    var data = $(this).serialize();
    // 3.提交信息
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {

                // 把token保存到本地存储
                localStorage.setItem('token', res.token)
                // 登陆成功，页面跳转到首页
                location.href = '/index.html';
            }
        }
    });
})





