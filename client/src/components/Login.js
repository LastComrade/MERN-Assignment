import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import verifyToken from "./utils";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (verifyToken()) {
      navigate("/user");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/login", { email, password })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-green-400 w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded"
      >
        <div className="text-white pb-4 text-3xl font-semibold">
          MERN Assignment
        </div>
        <input
          value={email}
          className="px-2 block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300"
          id="email"
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          value={password}
          className="px-2 block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300"
          id="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="pt-3 flex items-center justify-between">
          <button className="inline-block mt-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 px-6 py-2 rounded text-white shadow-lg">
            Login
          </button>
          <Link
            to="/register"
            className="inline-block text-green-700 hover:text-green-900 font-normal text-md"
          >
            Register?
          </Link>
        </div>
      </form>
      <p className="mt-4 text-center text-gray-400 text-xs">
        &copy;2021 Konark Lohat. MIT Licensed.
      </p>
    </div>
  );
};

export default Login;
