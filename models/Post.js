import mongoose from "mongoose";

const postSchema = mongoose.Schema({
 userId:{
    type:String,
    required:true,
 },
 userName:{
    type:String,
    required:true,
 },
 title:{
  type:String,
  required:true,
 },
 location:String,
 picturePath:String,
 description:String,
 likes:{
    type:Map,
    of:Boolean,
 },
 comments:{
  type:Array,
  default:[]
 },
 createdAt: {
    type: Date,
    default: Date.now(),
  },
})


const Post  = mongoose.model('Post', postSchema);

export default Post;