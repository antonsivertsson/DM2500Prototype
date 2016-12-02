let gcm = require('node-gcm');
let PubNub = require('pubnub')

// Setup GCM
let apiKey = "AAAAE3R06UI:APA91bF-ADuDIo9dunWg6psB7r7itRIsSVJe8ft18ybyM7N11rEJ9vUN-ec1xW7SQ1FBXZVlWJGT6Opu57WBBH1RwOBWG35oqTRTP2NzK0JxCWGk2HRMZRqeRBVoNo4X0PAbP-ZHMMORvbvzN7j10xdpP3ZIxXzIww";
let deviceID = "";

// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
let sender = new gcm.Sender(apiKey);

// Prepare a message to be sent
let message = new gcm.Message({
    notification: {
    	title: 'Treat your plants right!',  
    	body: 'Plants, like all living things, need food to survive. Plants make their food using a process called photosynthesis, which means “putting together through light”. During photosynthesis, a plant traps energy from sunlight with its leaves. It also takes up water from its roots and carbon dioxide gas from the air. The plant uses the Sun’s energy to convert water and carbon dioxide into a sugary substance called glucose. The plant uses the glucose as a food to help it stay alive and grow.',
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY", //Must be present for Android 
        icon: "fcm_push_icon" //White icon Android resource 
    },
    data: {
    	title: 'Treat your plants right!',  
    	body: 'Plants, like all living things, need food to survive. Plants make their food using a process called photosynthesis, which means “putting together through light”. During photosynthesis, a plant traps energy from sunlight with its leaves. It also takes up water from its roots and carbon dioxide gas from the air. The plant uses the Sun’s energy to convert water and carbon dioxide into a sugary substance called glucose. The plant uses the glucose as a food to help it stay alive and grow.',
    	style: "picture",
        picture: "http://7-themes.com/data_images/out/36/6891277-cat-wallpaper.jpg",
        summaryText: "CATS! :D"
    }
});

// Specify which registration IDs to deliver the message to (not needed for topics)
// var regTokens = ['YOUR_REG_TOKEN_HERE'];

// Setup PubNub
let pubnub = new PubNub({
    subscribeKey: "mySubscribeKey",
    publishKey: "myPublishKey",
    ssl: true
})

// Send Google Cloud Message
sender.send(message, { topic: '/topics/all' }, function (err, response) {
    if (err) console.error(err);
    else console.log(response);
});