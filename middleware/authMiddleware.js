import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
            req.user = await User.findById(decoded.userId).select('-password')
            next();
        } catch (error) {
            res.cookie('jwt', '', {
                secure: true, sameSite: 'None',
                expires: new Date(0)
            })
            res.status(401)
            throw new Error('Not authorized, invalid token')
        }
    } else {
        res.status(401)
        throw new Error("Not Authorized")
    }
})

export { protect }