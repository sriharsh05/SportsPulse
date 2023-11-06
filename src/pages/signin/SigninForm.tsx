import React from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Sign-in failed");
      }
      console.log("Sign-in successful");
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          autoFocus
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight border-emerald-200  focus:outline-none focus:border-emerald-500 focus:shadow-outline-emerald ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && <span>This field is required</span>}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          autoFocus
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight border-emerald-200 focus:outline-none focus:border-emerald-500 focus:shadow-outline-emerald ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && <span>This field is required</span>}{" "}
      </div>
      <button
        type="submit"
        className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign In
      </button>
      <Link to={"/signup"} className="hover:text-emerald-500 transition-all">
        Don't have an account? Sign up
      </Link>
    </form>
  );
};

export default Signin;
