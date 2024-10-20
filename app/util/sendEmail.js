const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        secure: false,
        ignoreTLS: true,
        rejectUnauthorized: false
    }
});

function enviarEmail(to, subject, content, cb) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject
    }
    mailOptions.html = content

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('E-mail enviado');
            if (cb && typeof cb === 'function') {
                cb();
            }
        }
    })
}



module.exports = { enviarEmail }