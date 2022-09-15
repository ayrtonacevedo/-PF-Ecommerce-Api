const {User}=require("../db")

const crearUser= async (name, email, password, image, location, direction, rol)=>{

    let existe=await User.findOne({where:{email:email}})
    if (existe){console.log(email+" ya existe!");return {flag: false, message:"ya existe el usuario"}}
    let user =await User.create({
        name: name,
        email: email,
        password: password,
        image: image,
        location: location,
        direction: direction,
        rol: rol
    })
    user.save();
    return{flag:true,message:"Usuario creado"}
}
module.exports={crearUser}