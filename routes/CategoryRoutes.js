const express=require('express');
const router=express.Router();
const categoryController=require('../controller/CategoryController');


router.get('/getCategories',categoryController.getCategories)
router.post('/addCategory',categoryController.addCategory)
router.post('/updateCategory/:id',categoryController.updateCategory)
router.post('/deleteCategories',categoryController.deleteCategories)

module.exports=router;