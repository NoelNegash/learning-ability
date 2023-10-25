import express from 'express'
import { getDrills, newDrill } from '../controllers/drillController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getDrills).post(protect, newDrill)

export default router