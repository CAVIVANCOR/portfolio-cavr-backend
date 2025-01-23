const nodemailer = require('nodemailer');
require('dotenv').config()
const userCorreo = process.env.USER_EMAIL;
const accesoCorreo = process.env.ACCEDER_EMAIL;

const emailEnvio = async (name,from,subject,phone,text) => {

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: userCorreo,
        pass: accesoCorreo
    }
})
let mailoptions={
    name:name,
    from:from,
    to:userCorreo,
    subject:subject,
    phone:phone,
    html:text
}

try {
    let data = await transporter.sendMail(mailoptions);
    console.log('Email enviado:'+data.response);
    return data;
} catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
};
};

module.exports = emailEnvio;