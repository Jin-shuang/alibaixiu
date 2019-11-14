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