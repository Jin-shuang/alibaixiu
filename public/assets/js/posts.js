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
//处理日期时间格式
function formateDate(date) {  
  // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
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
            $('#page').html(page);
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