
var app = {
  //resturcture for clarity
  //additional blank or defualt properties that are not methods?
  storage: [], //data structure? Queue? 
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', // info
  rooms: new Set(),
  currRoom: ''
  //etc.? 
}; 
app.init = function() {
  //not sure yet what this is supposed to do?
  //suspect this is called when the app 'opens/page load
  //based on spec runner tests, it might also be ther server comminication handler
  //fetch roomnames and append to room selector
  app.fetch();
};

app.send = function(message) { 
  //initiates the AJAX request to send message to the server
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server, //app.server?
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      app.renderRoom(app.currRoom);
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
    url: app.server,
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'json',
    success: function (data) {
      console.log('chatterbox: Fetch successful');
      //send data from fetch to storage
      app.storage = data.results;
      //creat list of room names on fetch
      for (var i = 0; i < app.storage.length; i++) {
        //var cleanRoom = bleach.sanitize(app.storage[i]);
        if (!app.rooms.has(app.storage[i].roomname)) {
          
          $('#roomSelect').append(`<option> ${app.storage[i].roomname} </option>`);
        }
        app.rooms.add(app.storage[i].roomname);
      }
      app.renderRoom(app.currRoom);
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch messages', data);
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
  //var cleanUser = bleach.sanitize(message.username);
  //var cleanMessage = bleach.sanitize(message.text);
  
  $('#chats').append(`
    <div class="chat">
      <span class="chat username">${message.username}: </span>
      <span>${message.text}</span>
    </div>`); 
};
  
app.renderRoom = function(thisRoom) {
  // call on room change
  //input room name
  //output message object to renderMesage method
  //to add:  
    // 
  //for each message check if mesage is in target room
    //if true pass message object to renderMessage
  if (app.rooms.has(thisRoom)) {
    //loop through storage 
      //call renderMessage on each message with a matching room value\
    app.clearMessages();
    app.currRoom = thisRoom;
    app.storage.filter(message => message.roomname === thisRoom)
               .forEach(message => app.renderMessage(message));
               //animate message add
  } else {
    app.currRoom = thisRoom;
    app.rooms.add(thisRoom);
    $('#roomSelect').append(`<option> ${thisRoom} </option>`);
  } 
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
  var message = {};
  //debugger
  // capture username room and message
  // var message = {
  // username: 'shawndrost',
  // text: 'trololo',
  // roomname: '4chan'
  message.text = $('#message').val();
  message.username = window.location.search.slice(10);
  message.roomname = app.currRoom;
  // bluid message object
  
  // call post
  app.send(message);
  
};
//timeout loop for pulling messages from server
app.refreshFeed = function() {
  app.fetch();
  setTimeout(app.refreshFeed, 3000);
};

$('document').ready(function() {
  //start up on click handlers
  $('#main').on('click', '.username', function(event) {
    app.handleUsernameClick();
  });
  //click handler for 'add room' 
  $('#roomSelect').change(function() {
    if ($(this).val() === '...add room') {
      var newRoom = prompt('What would you like to name your room?');
      if (newRoom !== null && newRoom.length > 0) {
        app.renderRoom(newRoom);
      } else {
        alert('woops, didn\'t catch that!  try again!');
      }
    } else {
      app.renderRoom($(this).val());
      
    }

  });
  //handler for sending messages
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    app.handleSubmit();
    console.log('that worked!');
  });
  //app.init();
  
  app.refreshFeed();
});
