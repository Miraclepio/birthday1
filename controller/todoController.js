const UserModel = require('../model/userModel');
const TodoModel = require('../model/todoModel');
const mongoose=require('mongoose')

// create a content by a user
exports.createContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Find the user by ID
        const user = await UserModel.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the new content
        const content = await TodoModel.create(req.body);
        content.userInfo = user;

        // Save the content and update the user
        await content.save();
        user.todoInfo.push(content);
        await user.save();

        res.status(201).json({ message: 'New content created successfully', data: content });

    } catch (error) {
        next(error); // Pass the entire error object to the error-handling middleware
    }
};

// get a content by user

exports.getOneContent=async(req,res)=>{
    try {
        const findContent=await TodoModel.findById(req.params.id)
        if(!findContent){
            return  res.status(404).json({message:'content not found '})
        }else{
            return  res.status(200).json({message:'content found ',data:findContent})
        }
        
    } catch (error) {
        return res.status(500).json(error.message); 
    }
}

// get all content posted by a user

exports.getAllContent=async(req,res)=>{
    try {
        const findAllContent=await TodoModel.find()
        if(findAllContent===0 || findAllContent<1){
            return  res.status(404).json({message:'user not found '})
        }else{
            return  res.status(200).json({message:'content(s) found ',"total content(s)":findAllContent.length ,data:findAllContent})
        }
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}






// delete content

exports.deleteContent=async(req,res)=>{
    try {
        const findContent=await TodoModel.findByIdAndDelete(req.params.id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid content ID format' });
        }
        if(!findContent){
            return  res.status(404).json({message:'content not found '})
        }else{
            return  res.status(200).json({message:'content successfully deleted'})
        }
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// update a content
exports.updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid content ID format' });
        }

        // Update content
        const updatedContent = await TodoModel.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true } // Options to return the updated document and validate fields
        );

        if (!updatedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }

        res.status(200).json({ message: 'Content successfully updated', data: updatedContent });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
