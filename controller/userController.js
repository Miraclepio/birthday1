const UserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const sendEmail = require("../util/email");
const { generateWelcomeEmail } = require('../util/emailtemplates');

exports.signUpUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
      
        // const existingEmail = await UserModel.findOne({ email: email.toLowerCase() });
        // if (existingEmail) {
        //     return res.status(400).json({ message: 'User with this email already exists' });
        // }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);      

        // Create user
        const user = new UserModel({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            isVerified: false // User is not verified initially
        });

        const createdUser = await user.save();

        // Generate verification token
        const token = jwt.sign({ email: createdUser.email, userId: createdUser._id }, process.env.secret_key, { expiresIn: "3days" });

        // Send verification email 
        const verifyLink = `https://birthday1-ppfl.onrender.com/verifyUser/${token}`;
        const emailSubject = 'BIRTHDAY Mail';
        const html = generateWelcomeEmail(verifyLink,createdUser.fullName);

        const mailOptions = {
            from: process.env.user,
            to: email,
            subject: emailSubject,
            html: html
        };

        await sendEmail(mailOptions);

        return res.status(200).json({ message: "Successful, please check your email to verify your account", token, user });
    } catch (error) {
         res.status(500).json(error.message); 
    }
};






exports.resendVerification = async (req, res) => {
    try {
        const { email } = req.body;
      
        // Find the user by email
        const user = await UserModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is already verified
        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified' });
        }

        // Generate a new verification token
        const token = jwt.sign({ email: user.email, userId: user._id }, process.env.secret_key, { expiresIn: "3d" });

        // Send verification email
        const verificationLink = `https://birthday1-ppfl.onrender.com/verifyUser/${token}`;
        const emailSubject = 'Verification Mail';
        const html = generateWelcomeEmail(user.fullName, verificationLink); 

        const mailOptions = {
            from: process.env.user,
            to: email,
            subject: emailSubject,
            html: html
        };

        await sendEmail(mailOptions);

        return res.status(200).json({ message: "Verification email resent. Please check your email." });
    } catch (error) {
         res.status(500).json({ message: error.message }); 
    }
};





// exports.verifyUser = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { email, exp } = jwt.verify(token, process.env.secret_key);

//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             console.log('User not found during verification.');
//             return res.status(404).json({ message: "User not found" });
//         }
//         if (user.isVerified) {
//             console.log('User already verified.');
//             return res.status(400).json({ message: 'User already verified' });
//         }

//         const now = Math.floor(Date.now() / 1000);
//         if (exp < now) {
//             console.log('Verification token has expired. Resending verification email.');
//             const newToken = jwt.sign({ email: user.email, userId: user._id }, process.env.secret_key, { expiresIn: "1d" });
//             const verificationLink = `process.env.BASE_URL/verifyUser/${newToken}`;
//             const emailSubject = 'Resend Verification Mail';
//             const html = generateWelcomeEmail(user.fullName, verificationLink);

//             const mailOptions = {
//                 from: process.env.user,
//                 to: email,
//                 subject: emailSubject,
//                 html: html
//             };

//             await sendEmail(mailOptions);

//             return res.status(400).json({ message: 'Verification token has expired. A new verification email has been sent.' });
//         }

//         user.isVerified = true;
//         await user.save();

//         console.log(`User ${email} verified successfully.`);
//         return res.status(200).json({ message: 'User verified successfully' });
//     } catch (error) {
//         console.error('Error during verification:', error);
//         res.status(500).json(error.message);
//     }
// };

//create an end point to verify users email

exports.verifyUser = async (req, res) => {
    try {
        // Respond with a beautiful birthday message and image slideshow
        res.status(200).send(`
            <html>
                <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; text-align: center; color: #333;">
                    <div style="background-color: #ffcc99; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                        <h1 style="color: #ff6600;">🎉 Happy Birthday, Ella! 🎉</h1>
                        <p style="font-size: 18px; line-height: 1.6;">We’re so thrilled to celebrate your special day with you!</p>
                        <p style="font-size: 18px; line-height: 1.6;">May your year be filled with joy, love, and success.</p>
                        <p style="font-size: 18px; line-height: 1.6;">Thank you for being part of our community.</p>
                        <p style="font-size: 18px; line-height: 1.6;">We’re delighted to have you with us!</p>
                        <p style="font-size: 18px; line-height: 1.6;">Enjoy your birthday and the new journey ahead.</p>
                        <p style="font-size: 18px; line-height: 1.6;">You deserve all the happiness in the world!</p>
                        <p style="font-size: 16px; color: #666;">You will see some lovely images shortl...</p>
                        <div id="images" style="text-align: center; margin-top: 20px;">
                            <img src="https://res.cloudinary.com/dzjlqmjht/image/upload/v1722457530/xd23hsujfysmpmgkqadz.jpg" alt="Birthday Image 1" style="width: 300px; height: auto; display: none;" />
                            <img src="ella.jpg" alt="Birthday Image 2" style="width: 300px; height: auto; display: none;" />
                            <!-- Add more images as needed -->
                        </div>
                    </div>
                    <script>
                        let currentIndex = 0;
                        const images = document.querySelectorAll('#images img');
                        const totalImages = images.length;

                        function showImage(index) {
                            images.forEach((img, i) => {
                                img.style.display = i === index ? 'block' : 'none';
                            });
                        }

                        function startSlideshow() {
                            showImage(currentIndex);
                            setInterval(() => {
                                currentIndex = (currentIndex + 1) % totalImages;
                                showImage(currentIndex);
                            }, 3000); // Show each image for 3 seconds
                        }

                        setTimeout(() => {
                            startSlideshow();
                        }, 10000); // Start slideshow after 10 seconds
                    </script>
                </body>
            </html>
        `);

    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ message: error.message });
    }
};



// login function


exports.login = async (req, res)=>{
    try {
        const {email, password}= req.body
     
        if (!email  || !password) {
            return res.status(400).json({ message: "your email and password are required" });
          }
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
          }
        const findUser = await UserModel.findOne({email:email.toLowerCase()})
        if(!findUser){
            return res.status(404).json({message:'user with this email does not exist'})
        }
        const matchedPassword = await bcrypt.compare(password, findUser.password)
       if(!matchedPassword){
            return res.status(400).json({message:'invalid password'})
        }
        if(findUser.isVerified === false){
           return  res.status(400).json({message:'user with this email is not verified'})
        }
        findUser.isLoggedIn = true
        await findUser.save()
        const token = jwt.sign({ 
            name:findUser.fullName,
            email: findUser.email,
            isAdmim:findUser.isAdmin,
            userId: findUser._id }, 
            process.env.secret_key,
            { expiresIn: "1d" }); 

            return  res.status(200).json({message:'login successfully ',token,findUser}) 

        
    } catch (error) {
        
         res.status(500).json(error.message);
    }
}
// find one user
exports.getOneUser=async(req,res)=>{
    try {

        const findUser=await UserModel.findById(req.params.id).populate('todoInfo')
        const total_content=findUser.todoInfo.length
        if(!findUser){
            return  res.status(404).json({message:'user not found '})
        }else{
            return  res.status(200).json({message:`${findUser.fullName} found `,"Total content created  " :total_content ,data:findUser})
        }
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// find all user


exports.getAllUsers=async(req,res)=>{
    try {
        const findUser=await UserModel.find()
        if(findUser===0 || findUser<1){
            return  res.status(404).json({message:'user not found '})
        }else{
            return  res.status(200).json({message:'users found ',"total users":findUser.length ,data:findUser})
        }
        
    } catch (error) {
         res.status(500).json(error.message);
    }
}

// delete user


exports.deleteUser=async(req,res)=>{
    try {
        const findUser=await UserModel.findByIdAndDelete(req.params.id)
        if(!findUser){
            return  res.status(404).json({message:'user not found '})
        }else{
            return  res.status(200).json({message:'user successfully deleted'})
        }
        
    } catch (error) {
        res.status(500).json(error.message);
    }
}