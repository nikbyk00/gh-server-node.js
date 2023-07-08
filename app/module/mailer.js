const nodemailer = require('nodemailer')

/*
Документация по nodemailer: https://nodejsdev.ru/doc/email/ 
*/

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'nb85294@mail.ru',
      pass: 'dQDqL0rzzKg4U04EFKki',
    },
  },
  {
    from: 'Mailer Test <nb85294@mail.ru>'
  }
  )

module.exports = { transporter }
