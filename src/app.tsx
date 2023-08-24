import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./view/login"
import Home from "./view/home"
import Room from "./view/room"
import Landing from "./view/landing"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/room" element={<Room />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
