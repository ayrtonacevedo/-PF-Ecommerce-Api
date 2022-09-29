const {Router} =require('express');
const { getOrders, userOrders } = require('../Middleware/getOrders');
const {Order}=require("../db")

const router = Router();

router.get("/",async(req,res)=>{
    return res.status(200).json(await getOrders());
})
router.get('/:userIdName', userOrders);

router.put('/:id',async(req,res,next)=>{
    let { userMail, date, payment, subTotal, paid, status }=req.body
    let {id}=req.params;

      try{
          await Order.update(
            { userMail, date, payment, subTotal, paid, status },
            {where: {id}}
          )
  
          return res.status(200).json("Order updated")
  
      }
      catch(error){next(error)}
  })
module.exports = router;