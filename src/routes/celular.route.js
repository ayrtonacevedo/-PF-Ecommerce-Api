const { Router } = require('express')
const { obtenerProductos, obtenerProductosById, obtenerProductosByMarca, obtenerProductosByCapacidad, obtenerProductosByLinea, filtrarProductosMarcaAndLinea, obtenerProductosByStock, obtenerProductosByPrecio } = require('../Middleware/getProducto.middleware')
const { crearProducto } = require('../Middleware/crearProducto.middleware')
const { modificarProducto } = require('../Middleware/modificarProducto.middleware');


const router = Router();

router.get('/', async (req, res, next) => {
    let { brand, line, stockmin, stockmax, price, capacity } = req.query;
    try {
        if (brand && line) {
            return res.status(200).json(await filtrarProductosMarcaAndLinea(brand, line));
        } else if (stockmin && stockmax) {
            return res.status(200).json(await obtenerProductosByStock(stockmin, stockmax));
        } else if (price) {
            return res.status(200).json(await obtenerProductosByPrecio(price));
        } else if (capacity) {
            return res.status(200).json(await obtenerProductosByCapacidad(capacity));
        } else if (brand) {
            return res.status(200).json(await obtenerProductosByMarca(brand));
        } else if (line) {
            return res.status(200).json(await obtenerProductosByLinea(line));
        } else {
            let products = await obtenerProductos()
            products.length > 0 ?
                res.send(products) : res.send({ message: "No products" })
        }
    }
    catch (error) { next(error.message); console.log(error.message) }
})

router.get('/:id', async (req, res, next) => {
    let { id } = req.params
    try {
        let product = await obtenerProductosById(id)
        return res.send(product)
    }
    catch (error) { next(error); console.log(error) }
})

router.post('/', async (req, res, next) => {
    let { line, model, capacity, price, stock, image, spec, memoryRAM, description, disabled, brand } = req.body
    console.log(req.body, 'soy lo que le llega al back')
    try {
        let productoCreado = await crearProducto(line, model, capacity, price, stock, image, spec, memoryRAM, description, brand, disabled)
        productoCreado.flag ? res.send(productoCreado.message)
            : res.send(productoCreado.message)
    }
    catch (error) { next(error) }
})

router.put('/:id', async (req, res, next) => {
    let { linea, modelo, capacidad, precio, stock, image, especificaciones, descripcion, marca } = req.body
    let { id } = req.params
    try {
        let productoModificado = await modificarProducto(linea, modelo, capacidad, precio, stock, image, especificaciones, descripcion, marca)
        productoModificado.flag ? res.send(productoModificado.message)
            : res.send(productoModificado.message)
    }
    catch (error) { next(error) }
})






module.exports = router