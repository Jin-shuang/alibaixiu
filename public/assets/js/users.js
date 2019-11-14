//当表单发表提交行为的时候
$("#userForm").on('submit', function () {
    //获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize(); 
    //向服务器端发送添加用户的请求
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success: function () {
            //刷新页面  
            location.reload();
        },
        error: function () {  
            alert('用户添加失败！');
        }
    })
    //阻止表单的默认提交行为 
    return false;
})