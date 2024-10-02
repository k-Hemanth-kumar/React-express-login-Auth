const db=require('../model');
const ROLES=db.ROLES;
const User=db.user;

const checkDuplicateUsernameorEmail=(req,res,next)=>{
    User.findOne({
        username:req.body.username
    }).exec((error,user)=>{
        if(error){
            res.status(500).send({message:error});
            return;
        }
        if(user){
            res.status(400).send({message:"Failed! User is already exists.!"})
            return;
        }
        User.findOne({
            username:req.body.email
        }).exec((error,email)=>{
            if(error){
                res.status(500).send({message:error});
            return;
            }

            if(email){
                res.status(400).send({message:"Failed! Email is already exists.!"})
            return;
            }
            next();
        });
    });
}

const checkRoleExisted=(req,res,next)=>{
    if(req.body.roles){
        for(let i=0;i<req.body.roles.length;i++){
            if(ROLES.includes(req.body.roles[i])){
                res.status(400).send(
                    {message:`Failed! Role ${req.body.roles[i]} does not exist!`}
                );
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
  };
  
  module.exports = verifySignUp;