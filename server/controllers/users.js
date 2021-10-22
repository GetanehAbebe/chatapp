
const User = require('../models/User')
const multer = require('multer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require("path");
require("dotenv").config();


const filesStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads',)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '---' + file.originalname,)
    }
})

const upload = multer({
    storage: filesStorageEngine
})

const login = async (req, res, next) => {
    const { email, password } = req.body
    let user
    try {
        user = await User.findOne({ email: email })
        console.log('user', user)
        console.log('login', req.body)
        if (!user) {
            const error = new HttpError('the user not exist', 422)
            return next(error)
        }
        const passValues = await bcrypt.compare(password, user.password)
        const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
        console.log("passwords", user.password, passValues)
        if (user && !passValues) {
            return res.status(401).json({ message: 'wrong password' })

        }
        user.token = token
    } catch (e) {
        // const error = new HttpError('logging in faild,please try again later', 500)

        return next({ message: e.message })
    }
    return res.status(200).json(user)
}

const register = async (req, res, next) => {
    console.log('req', req.body)
    const { firstName, lastName, password, confirmPassword, email } = req.body
    const hash = await bcrypt.hash(password, 10)
    const newUser = new User({
        firstName, lastName, password: hash, confirmPassword, email, contacts: []
    })

    try {
        const createdUser = await newUser.save()
        const token = await jwt.sign({
            id: createdUser.id
        }, process.env.JWT_SECRET_KEY)
        createdUser.token = token;
        console.log('new user', createdUser)
        const updatedUser = await createdUser.save();

        res.status(201).json(updatedUser)
    } catch (e) {
        console.log(e.message)
        const error = new HttpError(e.message, 500)
        return res.status(200).json({ ...error, message: error.message })
        return next(error)
    }

}



const getUser = async (req, res, next) => {
    console.log('im here in get user route');

    res.status(200).json('here in get user route')
}
const updateUser = async (req, res, next) => {
    console.log('im here in get user route');

    res.status(200).json('here in get update route')
}
const deleteUser = async (req, res, next) => {
    console.log('im here in get user route');

    res.status(200).json('here in get update route')
}



module.exports = {
    login,
    register,
    getUser,
    updateUser,
    deleteUser
}