const config = require('../config/auth.config');

const db = require('../model');
const User = db.user;
const Role = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports.signUpController = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save((error, user) => {
        if (error) {
            res.status(500).send({ message: error }); // Use 'error' here
            return;
        }

        if (req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            }, (error, roles) => {
                if (error) {
                    res.status(500).send({ message: error }); // Use 'error' here
                    return;
                }
                user.roles = roles.map(role => role._id);
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            });
        } else {
            Role.findOne({ name: 'user' }, (error, role) => {
                if (error) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User was registered successfully!" });
                });
            }) // Handle case where no roles are provided
        }
    })
};

module.exports.signInController=(req,res)=>{
    User.findOne({username:req.body.username}).populate("roles","-__v").exec((err,user)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          var passwordISvalid=bcrypt.compareSync(req.body.password,user.password);
          if(!passwordISvalid){
            res.status(401).send({accessToken:null,message:'Password is not valid'});
            return;
          }
          const token=jwt.sign({id:user.id},config.secret,{
            algorithm:'HS256',expiresIn:86400,allowInsecureKeySizes:true
          });
          var authorities=[];
          for(let i=0;i<user.roles.length;i++){
            authorities.push('ROLE'+user.roles[i].name.toUppperCase())
          }
          res.status(200).send({
            id:user._id,
            accessToken:token,
            username:user.username,
            email:user.email,
            roles:authorities,
          });
          return;
    });
}
