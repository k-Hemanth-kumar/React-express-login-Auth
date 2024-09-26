const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React src directory
app.use(express.static(path.join(__dirname, 'ui/src')));

// Route to serve the index.html file (assuming it's inside src)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui/src', 'index.js')); // Change this to index.html
});

// Catch-all route to serve any other file

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.listen(5000,()=>{
    console.log("listening")
})