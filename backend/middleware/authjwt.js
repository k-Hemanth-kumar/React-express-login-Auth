const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../model');

const Role = db.role;
const User = db.user;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "User is not Authorized", succes: false })
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "User not Authorized", success: false })
        }
        req.userid = decoded.id;
        next();
    })
}

const isAdmin = (req, res, next) => {
    User.find(req.userid).exec((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        Role.find({
            _id: { $in: user.roles }
        }, (error, roles) => {
            if (error) {
                res.status(500).send({ message: error });
                return;
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            return res.status(403).send({ message: "User needed Admin role", success: false });
        })
    })
}
const isModerator = (req, res, next) => {
    User.find(req.userid).exec((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        Role.find({
            _id: { $in: user.roles }
        }, (error, roles) => {
            if (error) {
                res.status(500).send({ message: error });
                return;
            }
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            return res.status(403).send({ message: "User needed Admin role", success: false });
        })
    })
}

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};
module.exports = authJwt;