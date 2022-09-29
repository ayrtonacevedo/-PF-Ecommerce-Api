const { Router } = require('express')
const { Rating, Cell, User, Role } = require('../db.js');
const router = Router();

router.get('/:cellId', async (req, res, next) => {
   let { cellId } = req.params;
   try {
      let ratings = await Rating.findAll({ include: [{ model: Cell, where: { id: cellId } }] })
      let toObj = [];

      ratings?.map(e => {
         toObj.push({
            id: e.id,
            rating: e.rating,
            emailUser: e.emailUser,
            comment: e.comment,
            date: e.date
         })
      })

      toObj.length === 0 ? res.send("not rating") : res.send(toObj)

   } catch (error) {
      next(error);
      console.log(error)
   }
})

router.get('/role/:email', async (req, res, next) => {
   let { email } = req.params
   try {
      let user = await User.findOne({ where: { email: email }, include: [{ model: Role }] })

      let admin = false;

      if (user) {
         if (!(user.role.name === "Cliente")) {
            admin = true;
         }
      }

      res.send(admin);
   }
   catch (error) { next(error); console.log(error) }
})

router.post('/:cellId', async (req, res, next) => {
   let { emailUser, rating } = req.body
   let { cellId } = req.params
   try {
      let date = new Date();
      let r = await Rating.create({ emailUser, rating, date });

      await r.setCell(cellId);
      r.save();

      res.send("Rating sent!")
   }
   catch (error) { next(error) }
})


module.exports = router;