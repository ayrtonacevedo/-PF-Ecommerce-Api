const { Router } = require('express');

const brand=require('./marca.route')
const cell=require('./celular.route')
const user = require('./user.route')




const router = Router();

router.use('/celulares',cell)
router.use('/marcas',brand)
router.use('/users', user)





module.exports = router;
