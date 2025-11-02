const express = require('express');
const router = express.Router();
const {handleGetAllUsers, getUserById, handleUpdateUserById, handleDeleteUserById, createUserById} = require("../controllers/user");

//Routes 
// router.get("/", async (req,res) => {
//     const allDbusers = await User.find({});
//     const html = `
//     <ul>
//     ${allDbusers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join('')}
//     </ul>`
//     return res.send(html);
// })

//REST API ROUTES

router.get("/", handleGetAllUsers)

router
  .route("/:id")
  .get(getUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById)
  .post(createUserById)


module.exports = router;