import { useState } from "react";
import Menu from "./components/menu/Menu.js";
import LoginMenu from "./components/registerLogin/LoginMenu.js";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <div className="App">{isLoggedIn === false ? <LoginMenu /> : <Menu />}</div>;
}

export default App;
