$(function(){
  function buildHTML(message){

    var image = ""
    message.image ? image = `<img src="${message.image}">` : image = ""
    
    var html = `<div class="message">
                  <div class="upper-info">
                    <p class="upper-info__user">
                    ${message.user_name}
                    </p>
                    <p class="upper-info__date">
                    ${message.date}
                    </p>
                  </div>
                  <p class="message__text">
                    ${message.text}
                  </p>
                    ${image}
                  </img>
                  </div>
                </div>`
    return html;
  }
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
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $(window).height()*1000}, 50);
      $('.new_message__submit-btn').attr('disabled', false);
    })  
    .fail(function(){
      alert('error');
    })
  })
});
