import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,   
    minlength: 6,
  },
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
});

const User = mongoose.model("User", UserSchema);

export default User;