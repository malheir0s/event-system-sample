import mongoose from "mongoose";

const options = {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}
mongoose.connect(process.env.MONGO_URL, options)

export{mongoose};   

