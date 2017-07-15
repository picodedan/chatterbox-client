var app = {
  //resturcture for clarity
  //additional blank or defualt properties that are not methods?
  storage: [], //data structure? Queue? 
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages' // info
  //etc.? 
}; 
app.init = function() {
  //not sure yet what this is supposed to do?
  //suspect this is called when the app 'opens/page load
  //based on spec runner tests, it might also be ther server comminication handler
};
app.send = function(message) { 
  //initiates the AJAX request to send message to the server
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server, //app.server?
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed  to send message', data);
    }
  });
};
  
app.fetch = function() { 
  //initiates the AJAX request to pull new messages from the server. 
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: null,
    contentType: 'json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      //send data from fetch to storage
      this.storage = data;
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
  
app.clearMessages = function() {
//clear all dom elements that are in the id 'chats' div
//clear all messages that are currently rendered
  $('#chats').html(''); 
};
  
app.renderMessage = function(message) { //input will be a reference to a specific object in storage
  //render the message to the page
  // make user name 'clickable'
    //upon click 'clicked' user should be added as a friend
  
  //escaping on data
  
  
  $('#chats').append(`
    <div>
      <p class="username">${message.username}: </p>
      <p>${message.text}</p>
    </div>`); 
};
  
app.renderRoom = function(room) {
  //adds room specified by input to the room list drop down
  $('#roomSelect').append(`<span> ${room} </span>`);
};
  
app.handleUsernameClick = function () {
  //user name click function body
  // on click add user anme 'clicked' to 'friends'
    //this.addClass('friend')
  //has own property that reverses change? toggle? 
};

app.handleSubmit = function() {
  //creates message based on input text and user currently running app
  // sets to undefined(as yet) storage property?
  //has additional method that allows the recall/deletion of a message?
};

$('document').ready(function() {
  //start up on click handlers
  $('#main').on('click', '.username', function(event) {
    app.handleUsernameClick();
  });
  $('#send .submit').on('submit', function(event) {
    app.handleSubmit(event);
  });
  var refreshFeed = setTimeout(function () {
    app.fetch();
    refreshFeed();
  }, 500);
  
   
  
  
  
  function displayLastTweets(){
         var lastIndex = streams.home.length - 1;
         index = indexLastTweetDiplayed;
         //Update nbr of tweet received
         $('#nbrTweet').text(`${streams.home.length} tweetls received`);
         while(index <= lastIndex){
           if ((filterName !== undefined && streams.home[index].user === filterName) || filterName === undefined){
             var tweet = streams.home[index];
             var $tweet = $('<div class="tweet"></div>');
             var tweetDate = '<span class="dateTweet">' + tweet.created_at.toDateString() + ' ' + tweet.created_at.toLocaleTimeString() + '</span>';
             var user = '<span ><strong class="userName">' + tweet.user + '</strong></span>';
             $tweet.html( tweetDate + ' @' + user + ': ' + hashtag(tweet.message));
             $tweet.prependTo('#lastTweet');
           }
           index += 1;
         }
         indexLastTweetDiplayed = index;
         //filter on user name tweet displayed if user name is clicked

         setTimeout(displayLastTweets, 5000);
       };
  
  
  
});


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
