const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

const sendMail = (name, email, description, url, filename) => {
    let mailOptions = {
        from: 'createdfrombits@gmail.com',
        to: 'createdfrombits@gmail.com',
        subject: 'lovebird quote request',
        html: `name: ${name}<br>email: ${email}<br>Description: ${description}<br><img src="${url}" alt="${filename}">`,
     
      };
    transporter.sendMail(mailOptions, function(err, data, req) {
        if (err) {
          console.log("Error " + err);
        } else {
            
        }
      });
}

module.exports.transporter = transporter;
module.exports.sendMail = sendMail;