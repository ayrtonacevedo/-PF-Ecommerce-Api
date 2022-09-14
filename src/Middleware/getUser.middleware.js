const {User}=require('../db')

const obtenerUsers=async()=>{
    let users=await User.findAll();
    let toObj=[]
    users?.map((e)=>{
        toObj.push({
            id: e.id,
            name: e.name,
            email: e.email,
            password: e.password,
            image: e.image,
            location: e.location,
            direction: e.direction,
            rol: e.rol
        })
    })
    return toObj;
}
const obtenerUserById=async(id)=>{
    let e= await User.findByPk(id)
    const user={
        id: e.id,
        name: e.name,
        email: e.email,
        password: e.password,
        image: e.image,
        location: e.location,
        direction: e.direction,
        rol: e.rol
    }
    return user
}
module.exports={obtenerUsers,obtenerUserById}