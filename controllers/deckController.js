import expressAsyncHandler from "express-async-handler"
import Deck from "../models/Deck.js"
import Drill from "../models/Drill.js"

const getDecks = expressAsyncHandler(async (req, res) => {
    let decks = await Deck.find({userID: req.user._id})
    for (var i = 0; i < decks.length; i++) {
        let drills = await Drill.find({deckID: decks[i]._id}).sort({createdAt: 1}).limit(50)
        decks[i] = decks[i].toObject()
        decks[i].drills = drills;
    }
    res.status(200).json(decks)
})

const getPublicDecks = expressAsyncHandler(async (req, res) => {
    let decks = await Deck.find({userID: { $ne : req.user._id}, public: true})
    res.status(200).json(decks)
})

const newDeck = expressAsyncHandler(async (req, res) => {
    let deck = await Deck.create({
        userID: req.user._id,
        name: "New Definition List",
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
    getDecks, getPublicDecks, updateDeck, newDeck,
}