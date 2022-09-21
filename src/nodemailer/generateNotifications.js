const transportator = require('./configurations')

async function sendEmailSale(usernameSeller,emailSeller,usernameBuyer,nameProducts){
    transportator.sendMail({
        from: 'phonesecommerce@gmail.com',
        to: emailSeller,
        subject: "NEW SALE!",
        text: `Hi! ${usernameSeller}, we inform you that ${usernameBuyer} has made a purchase of the following products: ${nameProducts}`
    }) 
}
async function sendClaimMail(msg,service,email){
    transportator.sendMail({
        from: email,
        to: 'phonesecommerce@gmail.com',
        subject: service,
        text: `${msg} \n ${email}`
    })
}
async function autoClaimRes(username,email,service){
    transportator.sendMail({
        from: 'phonesecommerce@gmail.com',
        to: email,
        subject: service,
        text: `Hello ${username}! Your claim will be answered shortly, thank you for informing us of your problem.`
    })
}

module.exports = { sendEmailSale, sendClaimMail, autoClaimRes }


