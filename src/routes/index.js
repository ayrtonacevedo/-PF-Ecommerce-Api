const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const celularesRouter = require("./celulares");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/celulares', celularesRouter);


module.exports = router;
