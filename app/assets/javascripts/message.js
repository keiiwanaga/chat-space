$(function(){
  var reloadMessages = function() {
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
  last_message_id = $(".messages__message__content").last().data("messageId");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
    })
    .done(function(messages) {
    var insertHTML = '';
    $.each(messages, function(i, message) {
      insertHTML += buildHTML(message)
    });
    $('.messages').append(insertHTML);
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    });
    }
  };
  var buildHTML = function(message) {
    if (message.content && message.image) {
      var html = `<div class="messages__top-box">
                    <div class="messages__top-box__username">${message.user_name}</div>
                    <div class="messages__top-box__datetime" >${message.created_at}</div>
                  </div>
                  <div class="messages__message">
                    <p class="messages__message__content" data-message-id=${message.id}>${message.content}</p>
                    <img class="messages__message__image" src="${message.image}"></img> 
                  </div>`
    } else if (message.content) {
      var html = `<div class="messages__top-box">
                    <div class="messages__top-box__username">${message.user_name}</div>
                    <div class="messages__top-box__datetime">${message.created_at}</div>
                  </div>
                  <div class="messages__message">
                  <p class="messages__message__content" data-message-id=${message.id}>${message.content}</p>
                  </div>`
    } else if (message.image) {
      var html = `<div class="messages__top-box">
                    <div class="messages__top-box__username">${message.user_name}</div>
                    <div class="messages__top-box__datetime" >${message.created_at}</div>
                  </div>
                  <div class="messages__message">
                    <p class="messages__message__content" data-message-id=${message.id}></p>
                    <img class="messages__message__image" src="${message.image}"></img> 
                  </div>`
                };             
    return html
  };
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
      $('form')[0].reset();
      $('.new_message__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
     });
  });
  setInterval(reloadMessages, 7000);
});