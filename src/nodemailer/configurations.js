const { createTransport } = require('nodemailer')

const transportator = {
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
        user: 'phonesecommerce@gmail.com',
        pass: 'spznmgxmycfmjwfk'
    },
    tls: {
        rejectUnauthorized: false
    }
}
module.exports = createTransport(transportator)
