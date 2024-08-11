const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: `id does not exist , please check and try again` });
    }
    next();
};

module.exports = validateObjectId;