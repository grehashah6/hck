const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  async(err)=>{
      if(err) throw err;
      console.log("conncted to db")
  }
)



  