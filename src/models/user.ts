import {mongoose} from "../database";
import bcrypt from 'bcryptjs';
import { Schema } from "mongoose";


export interface UserInterface extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  role: string;
  _id: string
 // comparePasswords(candidatePassword: string, next: (err: Error | null, same: boolean | null) => void): void;
}



const userSchema: Schema<UserInterface> = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
    select: false
  },
  role:{
    type: String,
    enum: ['usuarioComum', 'organizadorEventos'],
    required: true,
    default: 'usuarioComum',
  },
})



userSchema.pre<UserInterface>("save", async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
})

const user = mongoose.model('user', userSchema);
export {user}
