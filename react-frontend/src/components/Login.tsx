import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"

import React, { useState, useEffect, useRef } from 'react';
import AuthService from "../services/auth.service";

type Inputs = {
    loginUsername: string
    loginPassword: string
}


export default function App() {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {

        AuthService.login(data.loginUsername, data.loginPassword).then(
            (response) => {
                //   navigate("/profile");
                console.log(response);
                window.location.href = "/profile";
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    }




    // console.log(watch("loginUsername")) // watch input value by passing its name


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        // <form onSubmit={handleSubmit(onSubmit)}>
        //   {/* register your input into the hook by invoking the "register" function */}
        //   <input defaultValue="test" {...register("example")} />


        //   {/* include validation with required or other standard HTML validation rules */}
        //   <input {...register("exampleRequired", { required: true })} />
        //   {/* errors will return when field validation fails  */}
        //   {errors.exampleRequired && <span>This field is required</span>}


        //   <input type="submit" />
        // </form>

        <div className="col-md-12">
            <div className="card card-container">


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"


                            {...register("loginUsername")}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            required


                            {...register("loginPassword")}

                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}


                </form>
            </div>
        </div>
    )
}