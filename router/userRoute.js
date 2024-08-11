const express = require('express')
const router = express.Router()
    const {signUpUser,verifyUser, resendVerification,login,getOneUser,getAllUsers,deleteUser} = require('../controller/userController')
    const validateObjectId=require('../middleware/objectId')
    const {authenticator,makeAdmin,checkAdmin}=require('../middleware/userAuthentication')
    const {validateSignUp}=require('../middleware/signUpValidation')
 const {changePassword,forgotPassword,resetPassword} = require('../controller/userPassword')
 const {validateEmailAndPassword,validateEmail,validatePassword}=require('../middleware/validation')


router.route("/registerUser").post(validateSignUp,signUpUser)
router.route("/verifyUser/:token").get(verifyUser)
// router.route("/resendVerification").post(resendVerification)
router.route("/login").post(login)
router.route("/user/:id").get(authenticator,validateObjectId,getOneUser)
router.route("/user").get(authenticator,checkAdmin,getAllUsers)
router.route("/user/:id").delete(authenticator,checkAdmin,validateObjectId,deleteUser)
router.route("/changepassword/:token").put(authenticator,changePassword)
router.route("/forgotPassword/:token").put(validateEmail,forgotPassword)
router.route("/resetPassword/:token").put(resetPassword) 
router.route("/makeAdmin/").put(authenticator,checkAdmin,makeAdmin)  

module.exports = router     