import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./EditUser.css"
function EditUser() {
  const { userId } = useParams();
  const [tools, setTools] = useState(null);
  const [user, setUser] = useState(null);
  const [newSalary, setNewSalary] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const token = Cookies.get("userToken");
  const role = Cookies.get("userRole");
  
    
  useEffect(() => {
    // Fetch user details by user ID from your API using the dynamic userId
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/ToolManager/GetEmployeeById?id=${userId}`, { // Use the dynamic userId here
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }); 
  
        if (response.status === 200) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error(`Error fetching user: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUserDetails();
  }, [userId, token]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewSalary(user?.salary || "");
  };

  //TESZT
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/ToolManager/GetAllTools", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const jsonData = await response.json();
      setTools(jsonData);
    };
    fetchData(); 
  }, [token]);

  if(role !== "Admin"){
    return <div>Only admins can see this page!</div>
  }
  //ENDTESZT

  const handleSaveClick = async () => {
    try {
      // Send an API request to update the user's salary
      const response = await fetch(`/api/ToolManager/UpdateUserSalary?id=${userId}&salary=${newSalary}`, { // Use the dynamic userId here
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
          }
      });

      if (response.status === 200) {
        setIsEditing(false);
        // Optionally, update the user's salary in the state
        setUser({ ...user, salary: parseFloat(newSalary) });
      } else {
        // Handle error, e.g., display an error message
        console.error(`Error updating user's salary: ${response.status}`);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error updating user's salary:", error);
    }
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <h2>Edit User</h2>
      <div>
        <p>User ID: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.emailAddress}</p>
        {isEditing ? (
          <div>
            <label>New Salary:</label>
            <input
              type="text"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              className="NewSalaryInput"
            />
            <button onClick={handleSaveClick} className="EditButton">Save</button>
          </div>
        ) : (
          <div>
            <p>Current Salary: {user.salary}</p>
            <button onClick={handleEditClick} className="EditButton">Edit Salary</button>
          </div>
        )}
      </div>
      <div>
        <table className="tables">
          <thead>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Price</th>
              <th>Owner</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tools &&
              tools.map((tool, index) => (
                tool.currentOwnerEmployee === null ? (
                  <tr key={index}>
                    <td>{tool.id}</td>
                    <td>{tool.type}</td>
                    <td>{tool.price}</td>
                    <td>No Current Owner</td>
                    <td><button type="button" className="EditButton">Add to user</button></td>
                  </tr>
                ) : null
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditUser;
