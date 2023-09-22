import Cookies from "js-cookie";
import "./css/Menu.css"
import { Outlet, Link, useLocation} from "react-router-dom";
import LoginMenu from "../registerLogin/LoginMenu";
import { useNavigate } from "react-router-dom";
function Menu() {
const location = useLocation();
const token = Cookies.get("userToken");
const userRole = Cookies.get("userRole");
const navigate = useNavigate();

const handleLogout = () => {
  Cookies.remove("userToken");
  navigate("/MyTools");
}

  return (
    <div>
    {token !== undefined ? (<div>
        <section></section>
      <div className="topnav">
      {userRole === "User" ? (
        <Link to="/mytools" className={location.pathname === '/MyTools' || location.pathname === '/mytools' ? 'active' : ''}>
          My Tools
        </Link>
      ) : (<div>
        <Link to="/managetools" className={location.pathname === '/managetools' || location.pathname === '/ManageTools' ? 'active' : ''}>
          Manage Tools
        </Link>
        <Link to="/manageusers" className={location.pathname === '/manageusers' || location.pathname === '/ManageUsers' ? 'active' : ''}>
          Manage Users
        </Link>
        <Link to="addnewtool" className={location.pathname === '/addnewtool' ? 'active' : ''}>
          Add New Tool
        </Link>
      </div>)}
          <a href="#Logout" id="logOutButton" onClick={(e) => {e.preventDefault(); handleLogout()}}>Logout</a>
      </div>
      <section><Outlet/></section>
    </div>) : (<LoginMenu></LoginMenu>)}
    </div>
  );
}

export default Menu;
