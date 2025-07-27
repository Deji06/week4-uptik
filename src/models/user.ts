import mongoose,{Document, Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import {config} from '../config'

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  createJwt: () => string;
  confirmPassword: (incomingPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required:[true, 'please provide username'],
        minLength: 3,
        maxLength:20,
    },
    password: {
        type: String,
        required:[true, 'please provide password'],
        minLength: 3,
        maxLength:8,
    },
    email: {
        type: String,
        required:[true, 'please provide email'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "plese provide valid email",
          ],
          unique: true,
    }
})

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.createJwt = function (this:IUser) {
  return jwt.sign({userId: this._id}, config.JWT_SECRET, {expiresIn:'30d'})
}

userSchema.methods.confirmPassword = async function (incomingPassword:string) {
    const isMatch = bcrypt.compare(incomingPassword, this.password)
    return isMatch
}

export default mongoose.model<IUser>('User', userSchema, "users")