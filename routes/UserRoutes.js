const express=require('express');
const router=express.Router();
const userController=require('../controller/UserController')

router.get('/getUsers',userController.getUsers)
// router.post('/addUser',userController.addUser)
router.post('/getRegisteredUsers',userController.getRegisteredUsers)
router.post('/addNewUser',userController.addNewUser)
router.put('/updateUser/:id',userController.updateUser)
router.delete('/deleteUser/:id',userController.deleteUser)

module.exports=router;