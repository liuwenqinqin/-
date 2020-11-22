// 需求：
// 1、配置根路径
// 2、设置请求头
// 3、complete：验证token在后台的有效性：

// ajax提前过滤

$.ajaxPrefilter(function (data) {
    // 配置根路径
    var base = 'http://ajax.frontend.itheima.net';
    data.url = base + data.url;

    // 配置请求头
    if (data.url.indexOf("/my/") != -1) {
        data.headers = {
            "Authorization":localStorage.getItem("token"),
        } 

    // 验证token是否有效的回调
    data.complete = function (xhr) {
            // xhr:经过JQ封装后，xhr对象
            // 原生xhr找到返回数据，xhr.responseText；
            // xhr.responseJSON
    // 后台接口设计，token过期无效，返回都是这些数据！
            if(xhr.responseJSON.status == 1 || xhr.responseJSON.message == "身份认证失败！"){
                localStorage.removeItem("token");
                location.href = "/login.html";
            }
    }

    }

    
});