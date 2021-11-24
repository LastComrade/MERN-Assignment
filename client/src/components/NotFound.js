import { Link } from "react-router-dom";
import verifyToken from "./utils";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="bg-green-400 w-full sm:w-3/4 max-w-lg p-12 pb-6 shadow-2xl rounded">
        <div className="text-white pb-4 text-3xl font-semibold">
          Page Not Found!!!
        </div>

        <Link
          to={verifyToken() ? "/" : "/login"}
          className="inline-block mt-2 bg-green-600 hover:bg-green-700 focus:bg-green-800 px-6 py-2 rounded text-white shadow-lg"
        >
          {verifyToken() ? "Home" : "Login"}
        </Link>
      </div>
      <p className="mt-4 text-center text-gray-400 text-xs">
        &copy;2021 Konark Lohat. MIT Licensed.
      </p>
    </div>
  );
};

export default NotFound;
