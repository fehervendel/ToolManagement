import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./EditUser.css";

function EditUser() {
  const { userId } = useParams();
  const [tools, setTools] = useState(null);
  const [user, setUser] = useState(null);
  const [newSalary, setNewSalary] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTool, setIsAddingTool] = useState(false);
  const [isRemovingTool, setIsRemovingTool] = useState(false); 
  const token = Cookies.get("userToken");
  const role = Cookies.get("userRole");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/ToolManager/GetEmployeeById?id=${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const fetchData = async () => {
    const response = await fetch("/api/ToolManager/GetAllTools", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    setTools(jsonData);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  if (role !== "Admin") {
    return <div>Only admins can see this page!</div>;
  }

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/ToolManager/UpdateEmployeeSalary?id=${userId}&salary=${newSalary}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
      });

      if (response.status === 200) {
        setIsEditing(false);
     
        setUser({ ...user, salary: parseFloat(newSalary) });
      } else {
      
        console.error(`Error updating user's salary: ${response.status}`);
      }
    } catch (error) {
     
      console.error("Error updating user's salary:", error);
    }
  };

  const handleAddToUserClick = async (toolId) => {
    try {
      setIsAddingTool(true); 

      const response = await fetch(
        `/api/ToolManager/AddToolToEmployee?employeeId=${userId}&toolId=${toolId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      if (response.status === 200) {
        setIsAddingTool(false); 
        console.log(`Tool with ID ${toolId} added to user with ID ${userId}`);
        fetchData();
      } else {
        setIsAddingTool(false); 
        console.error(`Error adding tool to user: ${response.status}`);
      }
    } catch (error) {
      setIsAddingTool(false); 
      console.error("Error adding tool to user:", error);
    }
  };

  const handleRemoveFromUserClick = async (toolId) => {
    try {
      setIsRemovingTool(true); 

      const response = await fetch(
        `/api/ToolManager/RemoveToolFromEmployee?id=${toolId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      if (response.status === 200) {
        setIsRemovingTool(false); 
        console.log(`Tool with ID ${toolId} removed from user with ID ${userId}`);
        fetchData();
      } else {
        setIsRemovingTool(false); 
        console.error(`Error removing tool from user: ${response.status}`);
      }
    } catch (error) {
      setIsRemovingTool(false);
      console.error("Error removing tool from user:", error);
    }
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <h2>Edit User</h2>
      <div className="user-details-box">
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
            <button onClick={handleSaveClick} className="EditButton">
              Save
            </button>
          </div>
        ) : (
          <div>
            <p>Current Salary: {user.salary}</p>
            <button onClick={handleEditClick} className="EditButton">
              Edit Salary
            </button>
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
              <th>Add tool</th>
              <th>Remove tool</th>
            </tr>
          </thead>
          <tbody>
  {tools &&
    tools.map((tool, index) => (
      tool.currentOwnerEmployeeId === null || tool.currentOwnerEmployeeId === parseInt(userId) ? (
        <tr key={index}>
          <td>{tool.id}</td>
          <td>{tool.type}</td>
          <td>{tool.price}</td>
          <td>{tool.currentOwnerEmployeeId === null ? "No current owner" : user.name}</td>
          <td>
            {tool.currentOwnerEmployeeId !== parseInt(userId) && ( // Conditionally render the "Add to user" button
              <button
                type="button"
                className="EditButton"
                onClick={() => handleAddToUserClick(Number(tool.id))}
                disabled={isAddingTool}
              >
                {isAddingTool ? "Adding..." : "Add to user"}
              </button>
            )}
          </td>
          <td>
            {tool.currentOwnerEmployeeId === parseInt(userId) && (
              <button
                type="button"
                className="RemoveButton"
                onClick={() => handleRemoveFromUserClick(Number(tool.id))}
                disabled={isRemovingTool} 
              >
                {isRemovingTool ? "Removing..." : "Remove tool"}
              </button>
            )}
          </td>
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
