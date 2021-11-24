import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verifyToken from "./utils";

const User = () => {
  const [user, setUser] = useState(verifyToken);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("user");
    navigate("/login");
  };
  useEffect(() => {
    setUser(verifyToken);
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-green-400 w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded">
        <div className="text-white pb-4 text-3xl font-semibold">
          Greetings,{" "}
          {user ? user.firstName + " " + user.lastName : navigate("/login")}
        </div>
        <div className="px-2 block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300">
          Email - {user.email}
        </div>
        <div className="px-2 block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300">
          Ph. Number - {user.phone}
        </div>
        <div className="px-2 block text-gray-700 p-1 m-4 ml-0 w-full rounded text-lg font-normal placeholder-gray-300">
          Address - {user.address}
        </div>
        <button
          onClick={logoutHandler}
          className="inline-block mt-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 px-6 py-2 rounded text-white shadow-lg"
        >
          Logout
        </button>
      </div>
      <p className="mt-4 text-center text-gray-400 text-xs">
        &copy;2021 Konark Lohat. MIT Licensed.
      </p>
    </div>
  );
};

export default User;
