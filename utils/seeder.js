import User from "../models/User.js";
import Post from "../models/Post.js";
import {connectDataBase} from "../config/database.js";
import { posts, users } from "../data/index.js";

connectDataBase();

const seedProducts = async () => {
  try {
    await User.deleteMany();
    console.log("Deleting all Users");
    await Post.deleteMany();
    console.log("Deleting all Posts");

    await User.insertMany(users);
    console.log("Adding all users from file");

    await Post.insertMany(posts);
    console.log("Adding all posts from file");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedProducts();
