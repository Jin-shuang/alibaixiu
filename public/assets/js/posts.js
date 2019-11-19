//向服务器端发送请求获取文章列表数据
$.ajax({
    type:'get',
    url:'/posts',
    success: function (response) { 
        // console.log(response); 
        let html = template('postsTpl',response);
        $('#postsBox').html(html);
        let page = template('pageTpl',response);
        $('#page').html(page);
    },
})

//分页
function changePage(page) {  
    //向服务器端发送请求获取文章列表数据
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page
        },
        success: function (response) {  
            console.log(response);
            let html = template('postsTpl',response);
            $('#postsBox').html(html);
            let page = template('pageTpl',response);
            // $('#page').html(page);
        }
    })
}
//向服务器端发送请求索要分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success: function (response) {  
        // console.log(response);
        let html = template('categoryTpl',{data:response});
        $('#categoryBox').html(html);
    }
})
//当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function () {  
    //获取到管理员选择的过滤条件
    let formData = $(this).serialize();
    //向服务器端发送请求根据条件索要文章列表数据
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success: function (response) {  
            let html = template('postsTpl',response);
            $('#postsBox').html(html);
            let page = template('pageTpl',response);
            $('#page').html(page);
        }
    });
    return false;
})

//当删除按钮被点击的时候
$('#postsBox').on('click','.delete', function () {  
    //弹出删除确认框和管理员确认是否真的要进行删除操作
    if(confirm('您真的要进行删除操作吗')) {
        //获取到管理员要删除的文章的id
        let id = $(this).attr('data-id');
        //向服务器端发送请求执行删除操作
        $.ajax({
            type:'delete',
            url:`/posts/${id}`,
            success: function () {  
                location.reload();
            }
        })
    }
})
//模态框
var id, userId;
$('#postsBox').on('click','.postCom', function () {  
    $('#exampleModal').modal('show')
    id = $(this).data('id')
    console.log(id, 678);
    userId = JSON.parse(localStorage.getItem('user'))._id
    console.log(userId, 444);
})

$('.addCom').on('click', function () {  
    var content = $('#message-text').val()
    console.log(content);
    $.ajax({
        type:'post',
        url:'/comments',
        data:{
            author:userId,
            content:content,
            post:id,
        },
        success: function (res) {  
            console.log('发布成功');
            $('#exampleModal').modal('hide')
        },
        error: function (err) {  
            alert('添加失败')
        }
    })
})