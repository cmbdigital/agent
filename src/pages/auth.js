import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { loginAgent } from "@/services/api";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/authSlice";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [toggelFieldType, setToggleFieledType] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        // title
        document.title = "Login | B2B";
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await loginAgent(data);
            dispatch(setAuth(res.data.data));
            router.push("/");
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error(err?.response?.data?.msg || err?.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen gap-20">
            <div className="w-full p-6 lg:w-1/3">
                <a className="flex flex-col items-center gap-2 mb-6">
                    <img alt="img" src="/logo.png" className="object-contain w-48" />
                    <h1 className="text-2xl mt-4 font-bold tracking-tight text-center uppercase cursor-pointer">
                        Welcome Back Agents
                    </h1>
                </a>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className={`w-full input input-bordered ${errors.email ? "input-error" : ""
                                }`}
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                },
                            })}
                        />
                        {errors.email && (
                            <label className="label">
                                <span className="text-red-500 label-text-alt">
                                    Enter a valid Email Address!
                                </span>
                            </label>
                        )}
                    </div>
                    <div className="w-full form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative w-full">
                            <input
                                type={toggelFieldType ? "text" : "password"}
                                placeholder="Password"
                                className={`input ${errors.password ? "input-error" : ""
                                    } input-bordered w-full`}
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            {toggelFieldType ? (
                                <AiOutlineEyeInvisible
                                    className="absolute text-xl cursor-pointer top-4 right-3"
                                    onClick={() => setToggleFieledType(!toggelFieldType)}
                                />
                            ) : (
                                <AiOutlineEye
                                    className="absolute text-xl cursor-pointer top-4 right-3"
                                    onClick={() => setToggleFieledType(!toggelFieldType)}
                                />
                            )}
                        </div>
                        <label className="label">
                            {errors.password ? (
                                <span className="text-red-500 label-text-alt">
                                    Password is required!
                                </span>
                            ) : (
                                <span className="label-text-alt"></span>
                            )}
                            <span className="label-text-alt"></span>
                            <span className="label-text-alt text-right ml-auto cursor-pointer hover:underline">
                                Forgot Password?
                            </span>
                        </label>
                    </div>
                    <button
                        className={`w-full mt-6 bg-blue-100 btn btn-ghost hover:bg-blue-300`}
                    >
                        {loading && <span className="loading loading-spinner"></span>}
                        Log In{" "}
                    </button>
                </form>
            </div>
            <div className="hidden h-full lg:w-2/3">
                <div className="relative flex items-center justify-center h-full overflow-hidden rounded-3xl bg-blue-50">
                    <h1 className="absolute z-10 font-black text-blue-200 uppercase text-9xl top-16">
                        Login
                    </h1>
                    <img
                        alt="login"
                        src="/auth/login.png"
                        className="z-20 object-cover w-10/12 rounded-3xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
