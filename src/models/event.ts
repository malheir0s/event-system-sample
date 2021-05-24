import {mongoose} from "../database";

const eventSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  img:{
    name: String,
    size: Number,
    key: String,
    url: String,
  },
  date:{  
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true
  }

})

const event = mongoose.model('event', eventSchema);


export {event}
