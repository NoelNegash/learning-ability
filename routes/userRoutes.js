import express from 'express'
import { authUser, logoutUser, registerUser, getUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getUser).post(registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)

export default router