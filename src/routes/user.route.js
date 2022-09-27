const {Router}=require('express')
const {obtenerUsers,obtenerUserById, obtenerUsersAdmin}=require('../Middleware/getUser.middleware')
const {crearUser}=require('../Middleware/crearUser.middleware')

const {User, Role}=require("../db")


const router=Router();

router.get('/', async(req,res,next)=>{
    try{
        let users = await obtenerUsers()
        users.length>0?
        res.send(users):res.send({message:"No users"})
    }
    catch(error){next(error); console.log(error)}
})

router.get('/id/:id', async(req,res,next)=>{
    let {id}=req.params
    try{
        let user = await obtenerUserById(id)
        return res.send(user)
    }
    catch(error){next(error); console.log(error)}
})

router.post('/',async(req,res,next)=>{
    let {name, email, password, image, location, direction, role }=req.body
    try{
        let userCreado=await crearUser(name, email, password, image, location, direction, role)
        userCreado.flag? res.send(userCreado.message)
        :res.send(userCreado.message)
    }
    catch(error){next(error)}
})

router.put('/:id',async(req,res,next)=>{
    let {name, email, password, image, location, direction, role, disabled }=req.body
    let {id}=req.params;
      
      try{
          await User.update(
            {name, email, password, image, location, direction, role, disabled },
            {where: {id}}
          )
  
          if(role){
            let rol = await Role.findOne({where: {name:role}})
            let user = await User.findByPk(id)
            
            await user.setRole(rol)
            user.save();
          }
  
          return res.status(200).json("User updated")
  
      }
      catch(error){next(error)}
  })


  router.get('/admin', async(req,res,next)=>{
    try{
        let users = await obtenerUsersAdmin()
        users.length>0?
        res.send(users):res.send({message:"No users"})
    }
    catch(error){next(error); console.log(error)}
})





module.exports=router;