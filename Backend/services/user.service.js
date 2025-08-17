const { use } = require('react');
const userModel = require('../models/user.model');

module.exports.createUser = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    if(!firstname || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const user = userModel({
        fullname: {
                firstName: firstname,
                lastName: lastname || ''
            },
            email,
            password: await userModel.hashPassword(password)
        });
        try {
            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error(error);
            if (error.code === 11000) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            res.status(500).json({ message: 'Internal server error' }); 

    }
    return user;
}