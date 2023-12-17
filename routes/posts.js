import express from 'express'
const router = express.Router();
import { getFeedPosts, getUserPosts, likePosts, deleteUserPost,updateUserPost } from '../controllers/posts.js'
import {verifyToken} from '../middleware/auth.js'

router.route('/').get(getFeedPosts);
router.route('/').get( verifyToken, getUserPosts);
router.route('/:postId').delete( verifyToken,deleteUserPost);
router.route('/:postId').put( verifyToken, updateUserPost);
router.route('/:id/like').get( verifyToken, likePosts)
router.route('/:id/like').get( verifyToken, likePosts)

export default router