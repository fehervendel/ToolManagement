import React from "react";
import { useEffect, useState } from "react";

function ManageUsers(){
  const [users, setUsers] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/ToolManager/GetAllEmployees");
      const jsonData = await response.json();
      setUsers(jsonData);
    };
    fetchData(); 
  }, []);

      return (
        <table className="tables">
          <thead>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Salary</th>
    </tr>
  </thead>
          <tbody>
            {users && users.map((user, index) =>(
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.emailAddress}</td>
                <td>{user.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
  
}

export default ManageUsers;