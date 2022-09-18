const { Router } = require('express');

const brand=require('./marca.route')
const cell=require('./celular.route')
const user = require('./user.route')
const question = require('./question.route')

const router = Router();

router.use('/celulares',cell)
router.use('/marcas',brand)
router.use('/users', user)
router.use('/questions', question)




module.exports = router;
