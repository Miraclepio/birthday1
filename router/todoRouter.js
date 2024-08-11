const router=require('express').Router()
const {createContent,getOneContent,getAllContent,deleteContent,updateContent}=require('../controller/todoController')
const validateObjectId=require('../middleware/objectId')
const {authenticator}=require('../middleware/userAuthentication')

router.post('/content/:id',authenticator,validateObjectId,createContent)
router.get('/content/:id',authenticator,validateObjectId,getOneContent)
router.get('/content',authenticator,getAllContent)
router.delete('/content/:id',authenticator,validateObjectId,deleteContent)
router.patch('/content/:id',authenticator,validateObjectId,updateContent)


module.exports=router
 