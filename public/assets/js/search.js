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
//获取到浏览器地址栏中的搜索关键字
let key = getUrlParams('key');
// 根据搜索关键字调用搜索接口 获取搜索结果
$.ajax({
    type:'get',
    url:`/posts/search/${key}`,
    success:function (response) {  
        let html = template('searchTpl',{data:response});
        $('#listBox').html(html);
    }
})