const jwt = require('jsonwebtoken');
const AccountAdmin = require('../../models/account-admin.model');

module.exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect(`/${pathAdmin}/account/login`);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, email } = decoded;

        const existAccount = await AccountAdmin.findOne({
            _id: id,
            email: email,
            status: "initial"  
        });

        if (!existAccount) {
            res.redirect(`/${pathAdmin}/account/login`);
            return;
        }
        req.account = existAccount;
        next();
    } catch (error) {
        res.clearCookie("token");
        res.redirect(`/${pathAdmin}/account/login`);
    }

}