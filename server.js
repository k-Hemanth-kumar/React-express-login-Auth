const express = require('express');
const path = require('path');
const cors=require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
// Example of setting CORS headers manually
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Serve static files from the React src directory
app.use(express.static(path.join(__dirname, 'ui/src')));

// Route to serve the index.html file (assuming it's inside src)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui/src', 'index.js')); // Change this to index.html
});

app.post('/auth/login',(req,res)=>{
  console.log(req.body);
})
// Catch-all route to serve any other file

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
