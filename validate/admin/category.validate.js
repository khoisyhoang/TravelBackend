const Joi = require('joi');

module.exports.createPost = (req, res, next) => {
    //Logic
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .messages({
                "string.empty": "Enter Full Name",
            }),
        parent: Joi.string().allow(""),
        position: Joi.string().allow(""),
        status: Joi.string().allow(""),
        parent: Joi.string().allow(""),
        avatar: Joi.string().allow(""),
        description: Joi.string().allow("")
        
        
    });
    
    const {error} = schema.validate(req.body);
    if (error){
        console.log(error);
        res.json({
            code: "error",
            message: "Error!"
        })
        return;
    }

    next()
}