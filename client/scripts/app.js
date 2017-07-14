var app = {
  
  init: function() {
    
  },
  send: function(message) { 
    /*
    var message = {
      username: 'shawndrost',
      text: 'trololo',
      roomname: '4chan'
    };// YOUR CODE HERE:
    */

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() { 
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: undefined,
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: function() {
  //clear all dom elements that are in the id 'chats' div
    $('#chats').html(''); 
  },
  renderMessage: function(message) {
    //render the message to the page
    // make user name 'clickable'
      //upon click 'clicked' user should be added as a friend
    $('#chats').append(`
      <div>
        <p class="username">${message.username}: </p>
        <p>${message.text}</p>
      </div>`); 
  },
  renderRoom: function(room) {
    $('#roomSelect').append(`<span> ${room} </span>`);
  },
  handleUsernameClick: function () {
    //user name click function body
    // on click add user anme 'clicked' to 'friends'
    $('#main').on('click', '.username', function(event) {
      //this.addClass('friend');
    });
  },
  
};




/*
app.prototype.init = function() {
  return true;
};
*/

/*var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};// YOUR CODE HERE:

$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
*/
