var express = require("express");
var request = require("request");
var bodyParser = require('body-parser');
var Simsimi = require("simsimi");
var app = express();


// init app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// init simsimi
var simsimi = new Simsimi({
	key: '0da76951-3f0d-49be-9be3-e014f658644b'
});
 
// index express
app.get ('/', function (request, response) {
	response.writeHead(200);
	response.end("Server is now runing");
});

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'xac-minh') {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Error, wrong validation token');    
    }
});

// Xử lý khi có người nhắn tin cho bot
app.post('/webhook', function(req, res) {
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        // If user send text
        if (message.message.text) {
          var text = message.message.text;
          
          console.log(text);
          
          getReply(senderId,text);
        }
      }
    }
  }

  res.status(200).send("OK");
});

// Lấy câu trả lời tự động
function getReply (senderId , message) {
  
   simsimi.listen(message, function(err, msg){
      if(err) return console.error(err);
      sendMessage(senderId,msg);
  });
  
}

// Gửi thông tin tới REST API để trả lời
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: "EAAP6uHATKV4BAGtiivGZARqrmkU3hHC4ACbAe34K2tDTkLbWQXCrkSvSCYh80x9sQMtxhs1drJzZBuB5JB4XlPk88Gkfk5zIT1TKFheIZBMNXWG9B8vUvZBYfyNw0I3wlRnWYNRe9EBw8u8kAWq9HesBAlZCHpZC1rfc7yM9RzzwZDZD",
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}

module.exports = app;