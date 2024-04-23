const express=require('express');
const router=express.Router();
const pageController=require('../controller/PageController')

router.get('/getPages',pageController.getPages)
router.post('/addPage',pageController.addPage)
router.post('/updatePage/:id',pageController.updatePage)
router.post('/deletePages',pageController.deletePages)

module.exports=router;