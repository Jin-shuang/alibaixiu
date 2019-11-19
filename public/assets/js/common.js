$('#logout').on('click', function () {  
  var isConfirm = confirm('确定要退出吗？');
  if(isConfirm){
    $.ajax({
      type:'post',
      url:'/logout',
      success: function () {  
        location.href = 'login.html';
      },
      error: function () {  
        alert('已取消退出');
      }
    })
  }
})
//处理日期时间格式
function formateDate(date) {  
  // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
let user = JSON.parse(localStorage.getItem('user'));
// console.log(user);
$.ajax({
  type:'get',
  url:`/users/${user._id}`,
  success: function (response) {  
    //获取到相应信息后，展示在页面
    $('.avatar').attr('src',response.avatar);
    $('.profile .name').html(response.nickName);
  }
})