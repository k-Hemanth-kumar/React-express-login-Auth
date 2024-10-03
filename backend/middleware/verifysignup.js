const db=require('../model');
const ROLES=db.ROLES;
const User=db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Check for duplicate username
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).send({ message: "Failed! User already exists!" });
        }

        // Check for duplicate email
        const email = await User.findOne({ email: req.body.email });
        if (email) {
            return res.status(400).send({ message: "Failed! Email already exists!" });
        }

        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const checkRoleExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) { // Fixed logic here to check if role exists
                return res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
            }
        }
    }
    next();
};


const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRoleExisted
  };
  
  module.exports = verifySignUp;