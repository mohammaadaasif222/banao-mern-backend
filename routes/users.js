import express from  'express'
import {
    getUser, 
}  from '../controllers/users.js'
import {verifyToken}  from '../middleware/auth.js'
const router  = express.Router();
 
router.route('/:id').get( verifyToken, getUser);


export default router;