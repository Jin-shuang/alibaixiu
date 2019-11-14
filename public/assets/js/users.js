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
//当用户选择文件的时候
$('#modifyBox').on('change','#avatar', function () {  
    //用户选择到的文件this.files[0]
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        //告诉$.ajax方法不要解析请求参数
        processData:false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType:false,
        success: function (response) { 
            console.log(response); 
            //实现头像预览功能
            $('#preview').attr('src',response[0].avatar);
            //设置隐藏域的值，到时候点击提交时需要发送给服务器
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
})