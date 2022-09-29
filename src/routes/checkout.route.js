const {Router} = require('express');
const { default: Stripe } = require('stripe');
const { Cell, Order } = require('../db');
const transportator = require("../nodemailer/configurations")

const {KEY_CHECK}= process.env;

const stripe= new Stripe(KEY_CHECK);

const router = Router();

router.post("/",async(req,res)=>{
    try{
        const {id,amount, mail, arr, userIdName}=req.body;
        
        // Line
        const line=arr.map(c=>c.line);
        const brand=arr.map(c=>c.brand)

        const email = `
        <!DOCTYPE html>
        <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;900&family=Righteous&display=swap" rel="stylesheet">
                <style>
                    .img {
                        max-width: 100px;
                        border-radius: 25%;
                    }
    
                    h1, h2, h3, p {
                        text-align: center;
                        font-family: 'Lato', sans-serif;
                        font-family: 'Righteous', cursive;
                    }
                    .image {
                        background-color: rgb(31, 31, 31);
                        text-align: center;
                    }
    
                    .information {

                        background-color: rgb(211, 211, 211);
                        height: 50px;
                        text-align: center;
                        justify-content: center;
                    }
    
                    .refound {
                        display: flex;
                        align-items: center;
                        background-color: aliceblue;
                        height: 100PX;
                        color: rgb(141, 141, 141);
                    }
                </style>
            </head>
            <body>
                <div>
                    <div class="image">
                        <h2>CELL STORE</h2>
                    </div>
                    <h1>Thanks!</h1>
                    <h3>Hi ${mail} 👋</h3>
                    <p>Thanks for your purchase from Cell Store</p>
                    <h1>Invoice ID: ${id}</h1>
                    <hr></hr>
                    <div class="information">
                        <h2>INFORMATION ABOUT YOUR ORDER:</h2>
                    </div>
                    <hr></hr>
                    <h3>Billed to: ${mail}</h3>
                    <h3>Font: Cell Store</h3>
                    <h3>Products: </h3>
                    <div>
                    <p>${brand}</p>
                    </div>
                    <hr></hr>
                    <h3>Total [USD]: $${amount}</h3>
                    <hr></hr>
                    <div class="refound">
                        <p>
                            Unless otherwise stated by the product or offer, any cell purchased from the Cell Store is eligible for a refund within 14 days of purchase (or, for pre-orders, upon release) if you played less than 2 hours. See more information in our <a href="">refund policy</a>.
                        </p>
    
                    </div>
                </div>
            </body>
        </html>
        `;
            await stripe.paymentIntents.create({
            amount: parseInt(amount),
            receipt_email: mail,
            currency: "USD", //la moneda
            description: "Cell", //descripcion de producto
            payment_method: id, //id del fronted
            confirm: true, //confirm the payment at the same time
            receipt_email:"f.s.b.rojas@gmail.com"
            });
            
            try {
                let order =  await Order.create({
                    id_Orders: id,
                    payment: 'card',
                    subTotal: amount,
                    paid: true,
                    userMail: mail,
                    userId: userIdName
                })
                  let cell = await Cell.findAll({where: {line: line}})
                  await order.addCell(cell);
            } catch(err) {
                console.log(err)
            }

            
            transportator.sendMail({
                from: '"Thanks For Buy In  Cell Store 👻"<phonesecommerce@gmail.com>',
                to: mail,
                subject: `Your receipt of Cell Store ${userIdName} 🧾`,
                html: email
            })
            
            res.status(200).json({message: "Successful Payment"});

    }catch(error){
         res.status(404).json(error.raw.message);
    }
})

module.exports = router