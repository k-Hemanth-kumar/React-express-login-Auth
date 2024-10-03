const express = require('express');
const path = require('path');
const cors=require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const corsOption={
  origin: "http://localhost:5001"
}

const {verifySignUp,authJwt}=require('./backend/middleware');

const Authcontroller=require('./backend/controllers/auth.controller');
const Usercontroller=require('./backend/controllers/userController');
app.use(cors(corsOption))
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

// Serve static files from the React src directory
app.use(express.static(path.join(__dirname, 'ui/src')));


//database handling
const dbconfig=require('./backend/config/db.config');
const db=require('./backend/model');
const Role=db.role;

db.mongoose.connect(`mongodb://${dbconfig.HOST}:${dbconfig.PORT}/${dbconfig.DB}`).then(()=>{
  console.log("successfully connected to mongodb");
  initial();
}).catch((error)=>{
  console.error("Connection error", error);
    process.exit();
})

async function initial(){
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {

      await new Role({ name: 'user' }).save();
      console.log(`added 'user' to the role collection`);

      await new Role({ name: 'admin' }).save();
      console.log(`added 'admin' to the role collection`);

      await new Role({ name: 'moderator' }).save();
      console.log(`added 'moderator' to the role collection`);
    }
  } catch (error) {
    console.log("error", error);
  }
}

app.get('/', (req, res) => {
  res.json({message:"Welcome to node example"})
   //res.sendFile(path.join(__dirname, 'ui/src', 'index.js')); // Change this to index.html
 });
 
 app.post('/auth/login',Authcontroller.signInController)
 app.post('/auth/signup',[verifySignUp.checkDuplicateUsernameorEmail,verifySignUp.checkRoleExisted],Authcontroller.signUpController);

 app.get('/test/all',Usercontroller.allAcess);
 app.get('/test/user',[authJwt.verifyToken],Usercontroller.userBoard);
 app.get('/test/mod',[authJwt.verifyToken,authJwt.isModerator],Usercontroller.ModeratorBoard);

 app.get('/test/admin',[authJwt.verifyToken,authJwt.isAdmin],Usercontroller.AdminBoard);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});