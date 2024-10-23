const nodemailer = require('nodemailer');
require('dotenv').config();
const ativarContaTemplate = require('./emails/ativar-conta');
const recuperarSenhaTemplate = require('./emails/recuperarSenha');

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

const enviarEmailAtivacao = async (emailDestino, assunto, urlBase, token, callback) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailDestino,
        subject: assunto,
        html: ativarContaTemplate(urlBase, token)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('E-mail enviado');
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    });

};

const enviarEmail = async (emailDestino, assunto, html, callback) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailDestino,
        subject: assunto,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('E-mail enviado');
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    });

};
const enviarEmailRecuperarSenha = async (emailDestino, assunto, urlBase, token, callback) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailDestino,
        subject: assunto,
        html: recuperarSenhaTemplate(urlBase, token)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('E-mail enviado');
            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    });

};




module.exports = { enviarEmail, enviarEmailAtivacao, enviarEmailRecuperarSenha }