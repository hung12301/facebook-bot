
var login = require("facebook-chat-api");
const Simsimi = require('simsimi');

const simsimi = new Simsimi({
    key: 'de27e23a-d01c-4c14-9de2-4f784f2023aa'
});

// Create simple echo bot
login({email: "ongtuong2308", password: "phuongminh12"}, function callback (err, api) {
    if(err) return console.error(err);
    api.listen(function callback(error, message) {
    	
    	console.log(message.body);
		
    	var senderID = message.senderID;

        simsimi.listen(message.body, function(err, msg){
		    if(err || message.isGroup) return console.error(err);

		    var sendMsg = new Object();
		    
		    msg = msg.replace("Sim", "Minh");
		    msg = msg.replace("sim", "Minh");
		    msg = msg.replace("simsimi", "Minh");
		    
		    sendMsg.body = msg;
		    console.log(msg);

			api.sendMessage(sendMsg,senderID);
		});
    });
});