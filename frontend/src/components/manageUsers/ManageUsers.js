import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./manageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const token = Cookies.get("userToken");
  const role = Cookies.get("userRole");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://toolmanagerserver.onrender.com/api/ToolManager/GetAllEmployees", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      setUsers(jsonData);
    };
    fetchData();
  }, [token]);

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.emailAddress.toLowerCase().includes(searchEmail.toLowerCase()) &&
          (user.id.toString().includes(searchId) || searchId === "") &&
          (user.name.toLowerCase().includes(searchName.toLowerCase()) ||
            searchName === "")
      )
    : [];

  if (role !== "Admin") {
    return <div>Only admins can see this page!</div>;
  }

  return (
    <div>
      <div className="search-bar">
        <label>Search by email:
        <input
          type="text"
          placeholder="Email address"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}/>
        </label>
        <label>Search by ID:
        <input
          type="text"
          placeholder="ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}/>
        </label>
        <label>Serch by name:
        <input
          type="text"
          placeholder="Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}/>
        </label>
      </div>
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
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.emailAddress}</td>
              <td>{user.salary}</td>
              <td>
                <Link to={`/edituser/${user.id}`}>
                  <button type="button" className="EditButton">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
