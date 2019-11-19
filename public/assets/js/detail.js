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
//从地址栏中获取文章id
let postId = getUrlParams('id');
// 评论是否经过人工审核
let review;
//向服务器端发送请求 根据文章id获取文章详细信息
$.ajax({
    type:'get',
    url:`/posts/${postId}`,
    success: function (response) {  
        let html = template('postTpl',response);
        $('#article').html(html);
    }
})
//当点赞按钮发生点击事件时
$('#article').on('click','#like', function () {  
    $.ajax({
        type:'post',
        url:`/posts/fabulous/${postId}`,
        success: function () {  
            alert('点赞成功，感谢您的支持😊')
        }
    })
})
//获取网站的配置信息
$.ajax({
    type:'get',
    url:'/settings',
    success: function (response) {  
        review = response.review
		// 判断管理员是否开启的评论功能
        if(response.comment){
			// 管理员开启了评论功能 渲染评论模板
            let html = template('commentTpl');
			// 渲染评论模板
            $('#comment').html(html);
        }
    }
})
// 当评论表单发生提交行为的时候
$('#comment').on('submit','form', function () {  
    //获取用户输入的评论内容
    let content = $(this).find('textarea').val();
    //代表评论的状态
    let state;
    if(review){
		// 要经过人工审核
        state = 0;
    } else {
		// 不需要经过人工审核
        state = 1;
    }
	// 向服务器端发送请求 执行添加评论操作
    $.ajax({
        type:'post',
        url:'/comments',
        data:{
            content,
            post:postId,
            state,
        },
        success: function () {  
            alert('评论成功')
            location.reload();
        },
        error: function () {  
            alert('评论失败～')
        }
    })
    return false;
})