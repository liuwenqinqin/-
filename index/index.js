// --------------设计的第一层意思
if(!localStorage.getItem("token")){
    location.href = '../login.html';
}

// -------------请求个人信息-----
get();

function get() {
    $.ajax({
        url:"/my/userinfo",
        
        // 请求成功后调用
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
        },
        
    })
    
}

// -----------------退出-----------
// 1.点击退出
// 2.优化，弹窗，询问是否退出？
$("#logout").on("click", function(){
    layer.confirm("确定退出嘛？", {
        icon:3,
        title:"提示退出"
    }, function(index){
        localStorage.removeItem("token");
        location.href = "../login.html";
        layer.close(index);
    }
    )
})