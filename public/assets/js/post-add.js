//向服务器端发送请求,获取文章分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success: function (response) {  
        console.log(response);
        let html = template('categoryTpl',{data:response});
        $('#category').html(html);
    }
})
//当管理员选择文件的时候触发事件
$('#feature').on('change', function () {  
    //获取到管理员选择到的文件
    let file = this.files[0];
    //创建formData对象实现二进制文件上传
    let formData = new FormData();
    //将管理员选择到的文件追加到formData对象中
    formData.append('cover',file);
    //实现文章封面图片上传
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        //告诉$.ajax方法不要处理data属性对应的参数
        processData:false,
        // 告诉$.ajax方法不要设置参数类型
        contentType:false,
        success: function (response) {  
            // console.log(response);
            $('#thumbnail').val(response[0].cover);
        }
    })
})
//当添加文章表单提交的时候
$('#addForm').on('submit', function () {  
    //获取管理员在表单中输入的内容
    let formData = $(this).serialize();
    //向服务器端发送请求实现文章添加功能
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success: function () {  
            //文章添加成功跳转到文章列表页面
            location.href = '/admin/posts.html'
        }
    });
    return false;
})
//获取浏览器地址栏中的id参数
let id = getUrlParams('id');
//当前管理员是在做修改文章操作
if(id != -1){
    //根据id获取文章的详细信息
    $.ajax({
        type:'get',
        url:`/posts/${id}`,
        success: function (response) { 
            $.ajax({
                type:'get',
                url:'/categories',
                success: function (categories) { 
                    response.categories = categories;
                    console.log(response);
                    let html = template('modifyTpl',response);
                    $('#parentBox').html(html);
                }
            })
        }
    })
}
//封装一个获取url后面id的函数
//从浏览器的地址栏中获取查询参数
function getUrlParams(name) {  
    let paramsAry = location.search.substr(1).split('&');
    //循环数据
    for(let i = 0;i < paramsAry.length; i++){
        let tmp = paramsAry[i].split('=');
        if(tmp[0] == name){
            return tmp[1];
        }
    }
    return -1;
}
//当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit','#modifyForm',function () {  
    //获取管理员在表单中输入的内容
    let formData = $(this).serialize();
    //
    let id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:`/posts/${id}`,
        data:formData,
        success: function () {  
            location.href = '/admin/posts.html'
        }
    })
    return false;
})