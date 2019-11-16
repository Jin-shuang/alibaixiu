//当表单发表提交行为的时候
$("#userForm").on('submit', function () {
    //获取到用户在表单中输入的内容并将内容格式化成参数字符串
    let formData = $(this).serialize(); 
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
    let formData = new FormData();
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
            // console.log(response); 
            //实现头像预览功能
            $('#preview').attr('src',response[0].avatar);
            //设置隐藏域的值，到时候点击提交时需要发送给服务器
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
});
//向服务器端发送请求，索要用户列表数据
$.ajax({
    type:'get',
    url:'/users',
    success: function (response) { 
        // console.log(response); 
        //使用模版引擎将数据和html字符串进行拼接
        let html = template('userTpl',{data: response});
        //将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
});
//通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click','.edit', function () {  
    //获取被点击用户的id值
    let id = $(this).attr('data-id');
    //根据id获取用户的详细信息
    $.ajax({
        type:'get',
        // url:'/users/' + id,下面👇是ES6的新语法
        url:`/users/${id}`,
        success: function(response) {  
            console.log(response);
            let html = template('modifyTpl',response);
            $('#modifyBox').html(html);
        }
    })
})
//为修改表单添加表单添加事件
$('#modifyBox').on('submit', '#modifyForm', function () {  
    //
    let id = $(this).attr('data-id');
    let formData = $(this).serialize();
    $.ajax({
        type:'put',
        url:`/users/${id}`,
        data:formData,
        success: function (response) {  
            location.reload();
        }
    })
})
//当删除按钮被点击的时候
$('#userBox').on('click','.delete', function () {  
    //如果管理员确认要删除用户
    if(confirm('你确定要删除用户吗？')){
        //获取到即将要删除的用户的id
        let id = $(this).attr('data-id');
        alert(id);
        //向服务器端发送请求，删除用户
        $.ajax({
            type:'delete',
            url:`/users/${id}`,
            success: function () {  
                location.reload();
            }
        })
    }
})
//获取全选按钮
let selectAll = $('#selectAll');
//获取批量删除按钮
let deleteMany = $('#deleteMany');
//当全选按钮状态发生改变时
selectAll.on('change', function () {  
    //获取到全选按钮当前的状态
    let status = $(this).prop('checked');
    if(status){
        //显示批量操作按钮
        deleteMany.show();
    } else {
        //隐藏批量操作按钮
        deleteMany.hide();
    }
    //获取到所有的用户并将用户的状态和全选按钮保持一致
    $("#userBox").find('input').prop('checked',status);
})
//当用户前面的复选框状态发生改变时
$('#userBox').on('change','.userStatus', function () { 
    // 获取到所有用户，在所有用户中过滤出选中的用户
    let inputs = $('#userBox').find('input');
    //判断所有用户的数量和选中用户的数量是否一致
    if(inputs.length == inputs.filter(':checked').length){
        selectAll.prop('checked',true);
    }else {
        selectAll.prop('checked',false);
    }
    //如果选中的复选框的数量大于0，就说明有选中的复选框
    if(inputs.filter(':checked').length > 0){
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
})
//
deleteMany.on('click', function () {  
    let ids = [];
    //获取选中的用户
    let checkedUser = $('#userBox').find('input').filter(':checked');
    //循环复选框，从复选框元素身上获取data-id属性的值
    checkedUser.each(function (index,element) {  
        ids.push($(element).attr('data-id'));
        //element.dataset.id;原生获取ID的方法
    })
    if(confirm('你确定要进行批量删除操作吗？')){
        $.ajax({
            type:'delete',
            url:`/users/${ids.join('-')}`,
            success: function () {  
                location.reload();
            }
        })
    }
})