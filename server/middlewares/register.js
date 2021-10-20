const yup = require("yup");
const User = require('../models/user')
const validationSchema = yup.object({
    firstName: yup.string()
        .max(20, 'Must be 15 characters or less')
        .min(3)
        .required('please enter your first name'),
    lastName: yup.string()
        .max(20, 'Must be 20 characters or less')
        .min(3)
        .required('please enter your last name'),
    email: yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 charaters')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Password musts match')
        .required('Confirm password is required'),
    profileImage: yup.mixed().required("You need to provide a file").test("fileFormat",
        "Unsupported Format, valid formats: png,jpeg,gif,jpg",
        value => value && SUPPORTED_FORMATS.includes(value.split('.')[1])),
})


const validation = () => async (req, res, next) => {
    const body = req.body
    try {
        await validationSchema.validate(body)
        const result = await User.find({ email: req.body.email })
        if (!result || result.length !== 0) throw Error('the user allready exist')
        return next()
    } catch (e) {
        return res.status(400).json({ message: e.message })
    }
}
module.exports = validation