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
//获取地址栏中的categoryId参数
let categoryId = getUrlParams('categoryId');
//根据分类id获取文章列表
$.ajax({
    type:'get',
    url:`/posts/category/${categoryId}`,
    success: function (response) {  
        let html = template('listTpl',{data:response});
        $('#listBox').html(html);
    }
});
//根据分类id获取分类信息
$.ajax({
    type:'get',
    url:`/categories/${categoryId}`,
    success: function (response) {  
        $('#categoryTitle').html(response.title);
    }
})