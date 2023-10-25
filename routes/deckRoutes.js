import express from 'express'
import { getDecks, getPublicDecks, newDeck, updateDeck } from '../controllers/deckController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, updateDeck)
router.route('/all').get(protect, getDecks)
router.route('/public').get(protect, getPublicDecks)
router.route('/new').post(protect, newDeck)


export default router