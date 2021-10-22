import React, { useEffect, useState } from "react";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { connect, useSelector, useDispatch } from 'react-redux';
import { login, signup } from '../redux/user/actions'
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'
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
            dispatch(signup(data,values))
        },
    })
    return <>
        <div class="row">
            <div class="book book--register">
                <div class="book__form book__form--register">
                    <form onSubmit={formik.handleSubmit} enctype="multipart/form-data" class="form" >
                        <div class="u-center-text u-margin-bottom-medium">
                            <h2 class="heading-secondary">Start messaging now</h2>
                            <h2>login</h2>
                            {error && <h3 className='text-danger'>{error}</h3>}
                            {loading && <Spinner animation="border" />}
                        </div>
                        <div className="d-flex justify-content-between">

                            <div class="form__group">
                                <input
                                    type="text"
                                    class="form__input"
                                    required
                                    name="firstName"
                                    id="firstName"
                                    placeholder="first name"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                />
                                <label for="firstName" class="form__label">first name</label>
                                {formik.touched.firstName && formik.errors.firstName ? <small className='text-danger'>{formik.errors.firstName} </small> : ""}
                            </div>
                            <div class="form__group">
                                <input
                                    type="text"
                                    class="form__input"
                                    required
                                    id="lastName"
                                    name="lastName"
                                    placeholder="last name"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                />
                                <label for="lastName" class="form__label">last name</label>
                                {formik.touched.lastName && formik.errors.lastName ? <small className='text-danger'>{formik.errors.lastName} </small> : ""}
                            </div>
                        </div>
                        <div class="form__group">
                            <input
                                type="email"
                                class="form__input"
                                required
                                name='email'
                                id="email"
                                placeholder="Email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <label for="email" class="form__label">Email</label>
                            {formik.touched.email && formik.errors.email ? <small className='text-danger'>{formik.errors.email} </small> : ""}
                        </div>
                        <div className="d-flex justify-content-between">

                            <div class="form__group">
                                <input
                                    type="password"
                                    class="form__input"
                                    placeholder="Password"
                                    required
                                    id="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <label for="password" class="form__label">Password</label>
                                {formik.touched.password && formik.errors.password ? <small className='text-danger'>{formik.errors.password} </small> : ""}
                            </div>
                            <div class="form__group">
                                <input
                                    type="password"
                                    class="form__input"
                                    placeholder="confirm Password"
                                    required
                                    name='confirmPassword'
                                    id="confirmPassword"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                />
                                <label for="confirmPassword" class="form__label">confirm Password</label>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <small className='text-danger'>{formik.errors.confirmPassword} </small> : ""}

                            </div>
                        </div>
                        <div class="form__group">
                            <input
                                type="file"
                                class="form__input"
                                placeholder="confirm Password"
                                required
                                name='profileImage'
                                id="confirmPassword"
                                onChange={formik.handleChange}
                                value={formik.values.profileImage}
                            />
                            <label for="confirmPassword" class="form__label">profile Image</label>
                            {formik.touched.profileImage && formik.errors.profileImage ? <p className='text-danger'>{formik.errors.profileImage} </p> : ""}

                        </div>
                        <div class="form__group d-flex justify-content-around">
                            <button type="submit" class="btn btn--green u-center-text">
                                Register&rarr;
                            </button>
                            <Link type="submit" class="btn  u-center-text" to='/login'>
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
export default Register