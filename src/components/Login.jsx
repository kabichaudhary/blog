import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";


function Login() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()


    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto max-w-lg w-full bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="flex mb-2 justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center leading-tight text-2xl font-bold">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form action=""></form>
            </div>
        </div >
    )
}

export default Login;

// 26: 30