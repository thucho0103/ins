const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
//const client = require('twilio')(accountSid, authToken);


const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "d390affa",
  apiSecret: "VtX54Qs1nyo9zyRN"
})

const from = "Vonage APIs"
const to = "84702588767"
const text = 'A text message sent using the Vonage SMS API'

module.exports.sendSMS = function(req,res){
	console.log(accountSid,authToken);


	vonage.message.sendSms(from, to, text, (err, responseData) => {
    	if (err) {
        console.log(err);
    	} else {
        	if(responseData.messages[0]['status'] === "0") {
        	return res.status(200).send("200");
            console.log("Message sent successfully.");
        	} else {
        	return res.status(200).send("500");
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        	}
    	}
	})

    // client.messages 
    //   .create({ 
    //      body: 'tin nhan test',  
    //      messagingServiceSid: 'MGbc01673424813de617b019b387f18da7',      
    //      to: '+84702588767' 
    //    }) 
    //   .then(message => {
    //   	return res.status(200).send("200");
    //   	console.log(message.sid)
    //   }) 
    //   .done();
}

