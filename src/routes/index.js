const { Router } = require('express');

const brand=require('./marca.route')
const cell=require('./celular.route')
const user = require('./user.route')
const checkout=require("./checkout.route")
const question = require('./question.route')
const sendClaimMail=require('./sendClaimMail')

const router = Router();
router.use('/celulares',cell)
router.use('/marcas',brand)
router.use('/users', user)
router.use('/checkout', checkout)
router.use('/questions', question)
router.use('/send-claim',sendClaimMail)


module.exports = router;
