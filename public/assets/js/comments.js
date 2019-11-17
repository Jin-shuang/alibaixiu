//向服务器端发送请求获取评论列表数据
$.ajax({
    type:'get',
    url:'/comments',
    success: function (response) {  
        console.log(response);
        let html = template('commentsTpl', response);
        $('#commentsBox').html(html);
        let pageHtml = template('pageTpl', response);
        $('#pageBox').html(pageHtml); 
    }
})
//实现分页
function changePage(page) {  
    $.ajax({
        type:'get',
        url:'/comments',
        data:{page},
        success: function (response) {  
            console.log(response);
            let html = template('commentsTpl', response);
            $('#commentsBox').html(html);
			var pageHTML = template('pageTpl', response);
			$('#pageBox').html(pageHTML)
        }
    })
}
//当审核按钮被点击的时候
$('#commentsBox').on('click','.status', function () {  
    //获取当前评论的状态
    let status = $(this).attr('data-status');
    //获取当前要修改的评论id
    let id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:`/comments/${id}`,
        data:{
            state: status == 0 ? 1 : 0
        },
        success: function () {  
            location.reload();
        }
    })
})
//当删除按钮被点击时
$('#commentsBox').on('click','.delete', function () {  
    if(confirm('您真的要执行删除操作吗')){
        //获取管理员要删除的评论的id
        let id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:`/comments/${id}`,
            success: function () {  
                location.reload();
            }
        })
    }
})