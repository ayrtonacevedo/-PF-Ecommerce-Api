const { Router } = require('express');

const marca=require('./marca.route')
const celular=require('./celular.route')
const user = require('./user.route')




const router = Router();

router.use('/celulares',celular)
router.use('/marcas',marca)
router.use('/users', user)





module.exports = router;
