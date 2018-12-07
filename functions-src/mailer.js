const nodemailer = require('nodemailer');
const secret = require('../keys');

const clientID = '498159137665-5ks1u7vnpda86gvciltd97j0jp3hut4e.apps.googleusercontent.com';
const refreshToken = '1/5teXWRxE1x-ZO3LF7-lzcmTTXJ3eRCwwfPmqy3B8W-g';

exports.handler = function(event, context, callbackl) {
    const transporter = nodemailer.createTransport({
        service: 'google',
        auth: {
            type: 'OAuth2',
            user: 'outgoingserver123456',
            clietnID: clientID,
            clientSecret: secret.clientSecret,
            refreshToken: refreshToken
        }
    })

    const body = JSON.parse(event.body);
    const mailOptions = {
        to: 'contactjacobtay@gmail.com',
        subject: `New Website Message from ${body.name}`,
        text: `sender name: ${body.name}, email ${body.email} ${body.message}`
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(error)
            });
        } else {
            callback(null, {
                errorCode: 200,
                body: JSON.stringify(info.message)
            })
        }
    })
}