const {Router}=require('express')
const {obtenerUsers,obtenerUserById}=require('../Middleware/getUser.middleware')
const {crearUser}=require('../Middleware/crearUser.middleware')


const router=Router();

router.get('/', async(req,res,next)=>{
    try{
        let users = await obtenerUsers()
        users.length>0?
        res.send(users):res.send({message:"No users"})
    }
    catch(error){next(error); console.log(error)}
})

router.get('/:id', async(req,res,next)=>{
    let {id}=req.params
    try{
        let user = await obtenerUserById(id)
        return res.send(user)
    }
    catch(error){next(error); console.log(error)}
})

router.post('/',async(req,res,next)=>{
    let {name, email, password, image, location, direction, rol}=req.body
    try{
        let userCreado=await crearUser(name, email, password, image, location, direction, rol)
        userCreado.flag? res.send(userCreado.message)
        :res.send(userCreado.message)
    }
    catch(error){next(error)}
})





module.exports=router;