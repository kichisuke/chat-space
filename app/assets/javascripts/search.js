$(function(){

  var search_list = $('#user-search-result');
  var member_list = $('.chat-group-users_js-add-user');

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
    </div>`
    search_list.append(html);
  }

  function addUser(id,username){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value=${id}>
    <p class='chat-group-user__name'>${username}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>`
    member_list.append(html);
  }  
 
  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0){ 
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })
    .fail(function() { 
        window.alert("ユーザー検索に失敗しました");
    })
  });

  //追加ボタンを押したときに発火するイベント
  $(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function(){
    var id = $(this).attr("data-user-id");
    var username = $(this).attr("data-user-name");
    addUser(id,username);
    $(this).parent().remove();
  }); 

  //削除ボタンを押したときに発火するイベント
  $(document).on("click",".user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn", function(){
    $(this).parent().remove();
  });
});
