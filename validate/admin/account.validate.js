const Joi = require('joi');

module.exports.registerPost = (req, res, next) => {
    //Logic
    const schema = Joi.object({
        fullName: Joi.string()
            .required()
            .min(5)
            .max(30)
            .message({
                "string.empty": "Enter Full Name",
                "string.min": "Enter Full Name with min 5 Characters",
                "string.max": "Exceed max 50 Characters"
            }),
        email: Joi.string()
            .required()
            .email()
            .message({
                "string.empty": "Enter Email",
                "string.email": "Enter Email",
                
            }),
        password: Joi.string()
            .required()
            .min(8)
            .custom((value, helpers) => {
                
                if (!/[A-Z]/.test(value)) {
                    return helpers.error("password.uppercase");
                }
                if (!/[a-z]/.test(value)) {
                    return helpers.error("password.lowercase");
                }
                if (!/[\d]/.test(value)) {
                    return helpers.error("password.number");
                }
                if (!/[@$!%*?&]/.test(value)) {
                    return helpers.error("password.symbol");
                }
                return value;
            })
            .message({
                "string.empty": "Enter Password",
                "string.min": "Min 8 Characters",
                "password.uppercase": "No Uppercase",
                "password.lowercase": "No Lowercase",
                "password.number": "No Number",
                "password.symbol": "No Symbol",
            })
        
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
module.exports.loginPost = (req, res, next) => {
    //Logic
    const schema = Joi.object({
        email: Joi.string()
            .required()
            .email()
            .message({
                "string.empty": "Enter Email",
                "string.email": "Enter Email",
                
            }),
        password: Joi.string()
            .required()
            .min(8)
            .custom((value, helpers) => {
                
                if (!/[A-Z]/.test(value)) {
                    return helpers.error("password.uppercase");
                }
                if (!/[a-z]/.test(value)) {
                    return helpers.error("password.lowercase");
                }
                if (!/[\d]/.test(value)) {
                    return helpers.error("password.number");
                }
                if (!/[@$!%*?&]/.test(value)) {
                    return helpers.error("password.symbol");
                }
                return value;
            })
            .message({
                "string.empty": "Enter Password",
                "string.min": "Min 8 Characters",
                "password.uppercase": "No Uppercase",
                "password.lowercase": "No Lowercase",
                "password.number": "No Number",
                "password.symbol": "No Symbol",
            }),
        rememberPassword: Joi.boolean()
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