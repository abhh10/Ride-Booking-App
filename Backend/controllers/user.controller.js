const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log('Request body:', req.body); // Debug
        console.log('fullname:', req.body.fullname);
        const { fullname, email, password } = req.body;
        const hashedPassword = await userModel.hashPassword(password);

        const user = new userModel({
            firstname: fullname.firstName,
            lastname: fullname.lastName || '',
            email,
            password: hashedPassword
        });

        await user.save();
        const token = user.generateAuthToken();

        res.status(201).json({
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Register error:', error.message, error.stack);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};