const { Router } = require('express');

const marca=require('./marca.route')
const celular=require('./celular.route')


const router = Router();

router.use('/celulares',celular)
router.use('/marcas',marca)



module.exports = router;
