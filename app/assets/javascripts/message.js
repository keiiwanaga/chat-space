$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="messages__top-box">
                    <div class="messages__top-box__username">${message.user_name}</div>
                    <div class="messages__top-box__datetime">${message.created_at}</div>
                  </div>
                  <div class="messages__message">
                    <p class="messages__message__content">${message.content}</p>
                    <img class="messages__message__image" src="${message.image}"></img> 
                  </div>`
    } else {
      var html = `<div class="messages__top-box">
                    <div class="messages__top-box__username">${message.user_name}</div>
                    <div class="messages__top-box__datetime">${message.created_at}</div>
                  </div>
                  <div class="messages__message">
                  <p class="messages__message__content">${message.content}</p>
                  </div>`
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message__message').val('');
      $('.new_message__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
     });
  })
})



