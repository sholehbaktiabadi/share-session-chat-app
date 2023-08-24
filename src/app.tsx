import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./view/login";
import Home from "./view/home";
import Room from "./view/room";
import Landing from "./view/landing";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { Variables } from "./config/env-loader";

function App() {
  const [token] = useCookies(["user"]);
  const [isAuthenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    axios
      .post(
        Variables.VITE_CHAT_API_URL + "/auth/verify",
        {},
        { headers: { Authorization: `Bearer ${token.user}` } }
      )
      .then((res) => {
        setAuthenticated(res.data);
        console.log(res.data, token.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Landing /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/room" element={isAuthenticated ? <Room /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
