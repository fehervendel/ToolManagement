import "./css/Menu.css"
import { Outlet, Link } from "react-router-dom";
function Menu() {
  return (
    <div>
      <section></section>
      <div class="topnav">
      <Link to="/mytools" className="active"> {/* Use Link to navigate to /mytools */}
          My Tools
        </Link>
        <Link to="/managetools"> {/* Add Links for other pages */}
          Manage Tools
        </Link>
        <Link to="/manageusers">
          Manage Users
        </Link>
        <a href="#Logout">Logout</a>
      </div>
      <section><Outlet/></section>
    </div>
  );
}

export default Menu;
