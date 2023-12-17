import Post from "../models/Post.js";

export const createPost = async (request, response) => {
  
  try {
    const { title, location, description, picturePath } = request.body;

    const newPost = new Post({
      userId:request.user.id,
      userName:request.user.userName,
      title,
      location,
      description,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const post = await Post.find();

    response.status(201).json(post);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getFeedPosts = async (request, response) => {
  try {
    const post = await Post.find();
    response.status(200).json(post);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (request, response) => {
  try {
    const { userId } = request.params;
    const posts = await Post.find({ userId });
    response.status(200).json(posts);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const deleteUserPost = async (request, response) => {
  try {
    const { postId } = request.params;
    const deletionResult = await Post.deleteOne({ _id: postId, userId: request.user.id});

    if (deletionResult.deletedCount > 0) {
      response.status(200).json({ message: "User post deleted successfully" });
    } else {
      response.status(404).json({ message: "Post not found for the user" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateUserPost = async (request, response) => { 
  try {
    const { postId } = request.params;
    const updateData = request.body; 

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, userId:request.user.id },
      { $set: updateData },
      { new: true } 
    );

    if (updatedPost) {
      response.status(200).json({ message: 'User post updated successfully', updatedPost });
    } else {
      response.status(404).json({ message: 'Post not found for the user' });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export const likePosts = async (request, response) => {
  try {
    const { id } = request.params;
    const { userId } = request.body;
    const post = await Post.findById(id);
    const isLiked = await post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    response.status(200).json(updatedPost);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const CommentToPost = async (request, response) => {
  try {
    const { id } = request.params;
    const { userId, userName, commentText } = request.body;

    const newComment = {
      userId,
      userName,
      commentText,
      createdAt: new Date(),
    };

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true }
    );

    if (!updatedPost) {
      return response.status(404).json({ message: 'Post not found' });
    }

    response.status(200).json(updatedPost);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};