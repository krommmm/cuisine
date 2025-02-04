/*const nodemailer = require('nodemailer');  
  
let transporter = nodemailer.createTransport({  
  host: 'smtp.gmail.com',
  port: 587, // 587 -> TLS & 465 -> SSL
  auth: {  
    user: 'titi333cool@gmail.com', // email de votre votre compte google
    pass: '1@Aaaaaaaa' // password de votre compte google
  }  
});

let mail = {  
    from: 'titi333cool@gmail.com',  
    to: 'titi333cooloriginal@gmail.com',  
    subject: 'My first email !',  
    text: 'This email was sent with Nodejs and nodemailer using gmail SMTP server' 
    // on peut remplacer l'attribut `text`par `html`si on veut que le cors de notre email supporte le HTML
    // html:  '<h1>This email use html</h1>'
  };

  transporter.sendMail(mail, (error, info) => {  
    if (error) {  
      console.log(error);  
    } else {  
      console.log('Email: ' + info.response);  
    }  
  });
  */
  const nodemailer = require('nodemailer');

  // Configuration du transporteur SMTP
  const transporter = nodemailer.createTransport({
    host: 'mail.gmx.com',
    port: 587,
    secure: false,
    auth: {
      user: 'kromcool1@gmx.fr',
      pass: '1@Aaaaaaaa123'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  // Options de l'e-mail à envoyer
  const mailOptions = {
    from: 'kromcool1@gmx.fr',
    to: 'krom@gmx.fr',
    subject: 'Sujet de l\'email',
    text: 'Contenu de l\'email'
  };
  
  // Envoi de l'e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('E-mail envoyé : ' + info.response);
    }
  });
  