// Import Packages
const express = require("express");

// Create express app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Decleare Port
const PORT = 15000;
app.listen(PORT, ()=>{
  console.log(`Server listened in ${PORT}`)
});