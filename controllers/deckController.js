import expressAsyncHandler from "express-async-handler"
import Deck from "../models/Deck.js"

const getDecks = expressAsyncHandler(async (req, res) => {
    let decks = await Deck.find({userID: req.user._id})
    res.status(200).json(decks)
})

const newDeck = expressAsyncHandler(async (req, res) => {
    let deck = await Deck.create({
        userID: req.user._id,
        name: "New Deck",
        cards: [],
    })
    res.status(200).json(deck)
})

const updateDeck = expressAsyncHandler(async (req, res) => {
    let deck = await Deck.findByIdAndUpdate({_id: req.body._id}, req.body)
    if (deck) res.status(201).json(deck)
    else throw new Error("Deck doesn't exist")
})

export {
    getDecks, updateDeck, newDeck,
}