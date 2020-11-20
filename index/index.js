// -------------请求个人信息-----
$.ajax({
    url:"http://ajax.frontend.itheima.net/my/userinfo",
    headers:{
        Authorization:localStorage.getItem("token"),
    },
    success:function(res){
        // console.log(res);
        // 名称：有昵称就昵称、不然就是用户名；
        if(res.status == 0 ){
            var name = res.data.nickname || res.data.username;
            $(".username").text(name);
            // 头像：如果有头像数据
            if(res.data.uaer_pic){
                $(".layui-nav-img").show().prop("src", res.data.uaer_pic);
                $('.avatar').hide();
            }
            // 测试：没有头像数据的时候
            else{
                // 截取name名字上第一个字符；
                var t = name.substr(0,1);
                // 英文字符：小写变为大写：字符串.toUpperCase()
                t = t.toUpperCase();

                // show:会让元素变为行内元素；
                $('.avatar').show().css("display", "inline-block").text(t);
                $(".layui-nav-img").hide();
            }
        }
    }
})
