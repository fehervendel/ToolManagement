import "./css/Menu.css"
import { Outlet, Link, useLocation } from "react-router-dom";
function Menu() {
const location = useLocation();

  return (
    <div>
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
        <a href="#Logout">Logout</a>
      </div>
      <section><Outlet/></section>
    </div>
  );
}

export default Menu;
