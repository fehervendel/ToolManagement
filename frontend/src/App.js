import { useEffect, useState } from "react";
import Menu from "./components/menu/Menu.js";
import LoginMenu from "./components/registerLogin/LoginMenu.js";
import "./App.css";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("userToken");
  
  return <div>
    <div className="App">
      {token === null ? <LoginMenu /> : <Menu />}
      </div>
    </div>;
}

export default App;
