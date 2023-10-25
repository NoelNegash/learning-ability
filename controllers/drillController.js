import expressAsyncHandler from "express-async-handler"
import Drill from "../models/Drill.js"

const getDrills = expressAsyncHandler(async (req, res) => {
    if (!req.query.deck) throw Error("Deck is required.")
    let drills = await Drill.find({userID: req.user._id, deckID: req.query.deck}).sort({ createdAt: 1 })
    res.status(200).json(drills)
})

const newDrill = expressAsyncHandler(async (req, res) => {
    let drill = await Drill.create({
        ...req.body,
        userID: req.user._id,
    })
    res.status(200).json(drill)
})

export {
    getDrills, newDrill,
}