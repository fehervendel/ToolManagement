import { useEffect, useState } from "react";
import Menu from "./components/menu/Menu.js";
import LoginMenu from "./components/registerLogin/LoginMenu.js";
import "./App.css";

function App() {
  const [isLoggedIn] = useState(false);
  const [tools, setTools] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/Inventory/GetAll");
      const jsonData = await response.json();
      setTools(jsonData);
    };
    fetchData(); 
  }, []);

 console.log("Tools:" + tools);

  return <div>
    <div className="App">
      {isLoggedIn === true ? <LoginMenu /> : <Menu />}
      </div>
    </div>;
}

export default App;
