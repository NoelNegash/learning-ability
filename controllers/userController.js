import expressAsyncHandler from "express-async-handler"
import User from "../models/User.js"
import generateToken from '../utils/generateToken.js'

const authUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(200).json(({
            name: user.name,
            email
        }))
    } else {
        throw new Error("Invalid email or password")
    }
})

const registerUser = expressAsyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name, email, password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name,
            email,
        })
    } else {
        res.status(400) 
        throw new Error("Invalid user data")
    }
})

const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: "User logged out"
    })
})

const getUser = expressAsyncHandler(async (req, res) => {
    res.status(200).json({
        name: req.user.name,
        email: req.user.email
    })
})

export {
    authUser, registerUser, logoutUser, getUser
}