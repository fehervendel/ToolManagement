import Cookies from "js-cookie";
import "./css/Menu.css"
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import LoginMenu from "../registerLogin/LoginMenu";
function Menu() {
const location = useLocation();
const token = Cookies.get("userToken");

const handleLogout = () => {
  Cookies.remove("userToken");
  window.location.reload();
}
console.log("Token from menu js:", token);
  return (
    <div>
    {token !== undefined ? (<div>
        <section></section>
      <div className="topnav">
      <Link to="/mytools" className={location.pathname === '/mytools' ? 'active' : ''}> {/* Use Link to navigate to /mytools */}
          My Tools
        </Link>
        <Link to="/managetools" className={location.pathname === '/managetools' ? 'active' : ''}> {/* Add Links for other pages */}
          Manage Tools
        </Link>
        <Link to="/manageusers" className={location.pathname === '/manageusers' ? 'active' : ''}>
          Manage Users
        </Link>
          <a href="#Logout" onClick={(e) => {e.preventDefault(); handleLogout()}}>Logout</a>
      </div>
      <section><Outlet/></section>
    </div>) : (<LoginMenu></LoginMenu>)}
    </div>
  );
}

export default Menu;
