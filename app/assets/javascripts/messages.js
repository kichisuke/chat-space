$(function(){
  var reloadMessages = function(){
    last_message_id = $('.message').last().attr('data-message-id');
    $.ajax({
      url:"api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      messages.forEach(function(messages){
        var height = jQuery($('.messages')).get(0).scrollHeight;
        var inserthtml = insertHTML(messages);
        $('.messages').append(inserthtml);
        $('.messages').animate({scrollTop: height}, 50);   
      });
      })
    .fail(function(){
      console.log('error');
    });
    };

    var insertHTML = function(messages) {
      var content = '<div class="message" data-message-id=' + messages.id + '>' +
          '<div class="upper-info">' +
            '<div class="upper-info__user">' +
              messages.user_name +
            '</div>' +
            '<div class="upper-info__date">' +
              messages.created_at +
            '</div>' +
          '</div>'

      if (messages.content && messages.image.url) {
        var html = content +
            '<p class="message__text">' +
              messages.content +
            '</p>' +
            '<img src="' + messages.image.url + '" class="lower-message__image" >' +
          '</div>'
      } else if (messages.content) { 
        var html = content +
          '<p class="message__text">' +
              messages.content +
            '</p>' +
          '</div>'
      } else if (messages.image.url) {
        var html = content +
          '<div class="message__text">' +
            '<img src="' + messages.image.url + '" class="lower-message__image" >' +
          '</div>'
      };
      return html;
    };

    var buildMessageHTML = function(message) {

      var content = '<div class="message" data-message-id=' + message.id + '>' +
      '<div class="upper-info">' +
        '<div class="upper-info__user">' +
          message.user_name +
        '</div>' +
        '<div class="upper-info__date">' +
          message.created_at +
        '</div>' +
      '</div>';

      if (message.content && message.image.url) {
        var html = content +
            '<p class="message__text">' +
              message.content +
            '</p>' +
            '<img src="' + message.image.url + '" class="lower-message__image" >' +
          '</div>'
      } else if (message.content) { 
        var html = content +
          '<p class="message__text">' +
              message.content +
            '</p>' +
          '</div>'
      } else if (message.image.url) {
        var html = content +
          '<div class="message__text">' +
            '<img src="' + message.image.url + '" class="lower-message__image" >' +
          '</div>'
      };
      return html;
    };
  $("#new_message").on('submit', function(e){

    var txt = $('.input-box__text').val()
    var img = $('.image-label__input').val()

    if(txt == "" & img == ""){
      window.alert("メッセージを入力してください")
      exit;
    }

    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json', 
      processData: false,
      contentType: false
    })
    .done(function(data){
      var height = jQuery($('.messages')).get(0).scrollHeight;
      var html = buildMessageHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: height}, 50);
      $('.new_message__submit-btn').attr('disabled', false);
    })  
    .fail(function(){
      alert('error');
    })
  })
  setInterval(reloadMessages, 5000);
});
