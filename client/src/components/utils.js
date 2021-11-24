import jwtDecode from "jwt-decode";

const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    console.log(user);
    return JSON.parse(user);
  }
  return null;
};

const verifyToken = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
    return getUser();
  }
  if (user) {
    localStorage.removeItem("user");
  }
  return false;
};

export default verifyToken;
