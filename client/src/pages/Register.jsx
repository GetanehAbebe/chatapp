import React, { useEffect, useState } from "react";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { connect, useSelector, useDispatch } from 'react-redux';
import { login, signup } from '../redux/user/actions'
const Register = () => {
    const { user, error, loading } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const SUPPORTED_FORMATS = ["jpg", "jpeg", "gif", "png", "webp"];
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            profileImage: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(20, 'Must be 15 characters or less')
                .min(3)
                .required('please enter your first name'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .min(3)
                .required('please enter your last name'),
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 charaters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Password musts match')
                .required('Confirm password is required'),
            profileImage: Yup.mixed().required("You need to provide a file").test("fileFormat",
                "Unsupported Format, valid formats: png,jpeg,gif,jpg",
                value => value && SUPPORTED_FORMATS.includes(value.split('.')[1])),
        }),
        onSubmit: (values) => {
            console.log('values', values)
            const data = new FormData();
            data.append("userDetails", JSON.stringify(values))
            data.append('image', formik.values.profileImage)
            dispatch(signup(data))
        },
    })
    return <>
        {loading && <p>loading</p>}
        <form onSubmit={formik.handleSubmit} method="POST">

            <label htmlFor="firstName" className='form__label'>firstName</label>
            <input
                type="text"
                name="firstName"
                className='form__input'
                placeholder="abc@example.com"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? <small className='text-danger'>{formik.errors.firstName} </small> : ""}
            <label htmlFor="lastName" >lastName</label>
            <input
                type="text"
                name="lastName"
                className='form__input'
                placeholder="abc@example.com"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? <small className='text-danger'>{formik.errors.lastName} </small> : ""}


            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                className='form__input'
                placeholder="abc@example.com"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <small className='text-danger'>{formik.errors.email} </small> : ""}


            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                className='form__input'
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <small className='text-danger'>{formik.errors.password} </small> : ""}


            <label htmlFor="confirmPassword">confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                className='form__input'

                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <small className='text-danger'>{formik.errors.confirmPassword} </small> : ""}


            <label htmlFor="profileImage">profile Image</label>
            <input
                type="file"
                name="profileImage"
                className='form__input'
                onChange={formik.handleChange}
                value={formik.values.profileImage}
            />
            {formik.touched.profileImage && formik.errors.profileImage ? <small className='text-danger'>{formik.errors.profileImage} </small> : ""}

            <button type="submit" className="btn btn--green">submit</button>
        </form>
    </>





}
export default Register