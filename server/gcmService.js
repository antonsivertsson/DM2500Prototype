let gcm = require('node-gcm');
import PubNub from 'pubnub';

// Setup GCM
let apiKey = "AAAAE3R06UI:APA91bF-ADuDIo9dunWg6psB7r7itRIsSVJe8ft18ybyM7N11rEJ9vUN-ec1xW7SQ1FBXZVlWJGT6Opu57WBBH1RwOBWG35oqTRTP2NzK0JxCWGk2HRMZRqeRBVoNo4X0PAbP-ZHMMORvbvzN7j10xdpP3ZIxXzIww";
let deviceID = "";

// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
let sender = new gcm.Sender(apiKey);

// Prepare a message to be sent
let message = new gcm.Message({
    data: {
    	title: 'Hello, World',
    	message: 'abcdefghijklmno',
    	style: "picture",
        picture: "http://7-themes.com/data_images/out/36/6891277-cat-wallpaper.jpg",
        summaryText: "CATS! :D",
    	priority: 1
    }
});

// Specify which registration IDs to deliver the message to
// var regTokens = ['YOUR_REG_TOKEN_HERE'];

// Setup PubNub
var pubnub = new PubNub({
    subscribeKey: "mySubscribeKey",
    publishKey: "myPublishKey",
    secretKey: "secretKey",
    ssl: true
})

// Send Google Cloud Message
sender.send(message, { topic: '/topics/all' }, function (err, response) {
    if (err) console.error(err);
    else console.log(response);
});