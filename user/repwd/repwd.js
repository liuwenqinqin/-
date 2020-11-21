// 新密码 长度要求6-12， 新密码不能和旧密码一样， 输入两次新密码得一样
var form = layui.form;
form.verify({
    // 规则名：函数，必须有return，不符合正则提醒信息
    changdu: [/^\S{6,12}$/, '长度为6-12位，不能有空格'],
    // 规则名：[正则、不符合正则提醒信息]
    same: function (val) {
        // 第一次输入新密码：直接获取
        if ($('.newPwd').val() != val) {
            return "两次输入的密码不一致";
        }
    },
    diff:function(val){
    if($(".oldPwd").val() == val){
       return "新旧密码不能一样";
    }
    }

})

$("form").on("submit", function(e){
    e.preventDefault();
    // 1、收集数据 不被收集
      var data = $(this).serialize();
      $.post("/my/updatepwd",data, function(res){
          layer.msg(res.message);
          if(res.status === 0){
            // 业务设计
            // 
           $('form')[0].reset();
        }
      })
})