import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./manageUsers.css"

function ManageUsers() {
  const [users, setUsers] = useState(null);
  const token = Cookies.get("userToken");
  const role = Cookies.get("userRole");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/ToolManager/GetAllEmployees", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const jsonData = await response.json();
      setUsers(jsonData);
    };
    fetchData();
  }, [token]);

  if (role !== "Admin") {
    return <div>Only admins can see this page!</div>
  }

  return (
    <table className="tables">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Salary</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map((user, index) => (
          <tr key={index}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.emailAddress}</td>
            <td>{user.salary}</td>
            <td>
              <Link to={`/edituser/${user.id}`}><button type="button" className="EditButton">Edit</button></Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ManageUsers;
