const Joi = require('joi'); // Use the updated 'joi' package

// Staff schema validation
const schema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .required()
        .trim()
        .pattern(/^[A-Z][a-zA-Z'-]+( [A-Z]\.)?( [A-Z][a-zA-Z'-]+)+$/)
        .messages({
            'string.pattern.base': 'Full name must be in letters only and follow the correct format',
            'string.min': 'Full name must be at least three characters in length',
            'string.empty': 'Full name cannot be left empty',
            'any.required': 'Full name is required'
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'any.required': 'Please provide an email.',
            'string.empty': 'Email cannot be left empty.',
            'string.email': 'Please provide a valid email address.',
        }),
  
    password: Joi.string()
        .trim()
        .required()
        .pattern(new RegExp("^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$"))
        .messages({
            'any.required': 'Please provide a password.',
            'string.empty': 'Password cannot be left empty.',
            'string.pattern.base': 'Password must be at least 8 characters long and include at least one uppercase letter and one special character (!@#$%^&*).',
        }),
});

const validateSignUp = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // Add abortEarly: false to collect all errors

    if (error) {
        return res.status(400).json({ errors: error.details.map(detail => detail.message) });
    }

    next();
};

module.exports = { validateSignUp };
