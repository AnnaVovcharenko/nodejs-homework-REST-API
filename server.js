const mongoose = require("mongoose");
const app = require('./app');
// const { default: mongoose } = require("mongoose");
// const { error } = require("console");
// 0sIXWHuiXOJcvXo8

const DB_HOST = "mongodb+srv://Anna:0sIXWHuiXOJcvXo8@cluster0.edmvm7v.mongodb.net/my-contacts?retryWrites=true&w=majority";
mongoose.connect(DB_HOST)
.then(()=>{
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  })
  
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})


