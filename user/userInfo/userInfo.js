var form = layui.form;



function getinfo(){
    $.ajax({
        url:"/my/userinfo",
        success:function(res){
            // console.log(res);
            layer.msg(res.message);
            // console.log(res);
            if(res.status == 0) {
                // var data = res.data;
                // $("input[name = 'username']").val(data.username);
                // $("input[name = 'nickname']").val(data.nickname);
                // $("input[name = 'email']").val(data.email);
                // 快速赋值，layUI
                form.val("user",res.data);
                // console.log(res);
            }
        }
    })
    
}


getinfo();
// ---------------更新数据-----------
// 1、初始化赋值id
// 2、收集不会收集disabled
$("form").on("submit", function(e){
    e.preventDefault();

    // 收集数据
    var data = $(this).serialize();
    // 发送请求
    $.ajax({
        type:"post",
        url:"/my/userinfo",
        data:data,
        success:function(res){
            layer.msg(res.message);
            if(res.status == 0){
                // 业务设计
                // 
               window.parent.get();
            }
        }
    })
})


$(".my-reset").click(function(e){
    e.preventDefault();
    getinfo();
})