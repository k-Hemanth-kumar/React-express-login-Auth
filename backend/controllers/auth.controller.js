const config = require('../config/auth.config');

const db = require('../model');
const User = db.user;
const Role = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.signUpController = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();

        if (req.body.roles) {
            const roles = await Role.find({ name: { $in: req.body.roles } });
            user.roles = roles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: 'user' });
            user.roles = [role._id];
        }

        await user.save(); // Save the user again after assigning roles
        res.send({ message: "User was registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports.signInController = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v");
        
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: 'Password is not valid' });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: 'HS256',
            expiresIn: 86400, // 24 hours
            allowInsecureKeySizes: true
        });

        const authorities = user.roles.map(role => 'ROLE_' + role.name.toUpperCase());
        
        res.status(200).send({
            id: user._id,
            accessToken: token,
            username: user.username,
            email: user.email,
            roles: authorities,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};