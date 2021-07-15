require('dotenv').config()
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.Email,
        pass: process.env.Password
    }
})

const sendEmail = (name, subject,send, text, cb) => {
    let mailOptions = {
        sender: name,
        from: send,
        to: process.env.Email,
        subject,
        text,

    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            cb(err, null)
        } else {
            cb(null, data)
        }
    });
};
module.exports = sendEmail
