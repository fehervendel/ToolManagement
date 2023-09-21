import React, { useEffect, useState } from "react";
import "./ManageTools.css"
import Cookies from "js-cookie";

function ManageTools(){
  const [tools, setTools] = useState(null);
  const token = Cookies.get("userToken");
  const role = Cookies.get("userRole");

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
    return (
        <table className="tables">
          <thead>
    <tr>
      <th>Id</th>
      <th>Type</th>
      <th>Price</th>
      <th>Owner</th>
    </tr>
  </thead>
          <tbody>
            {tools && tools.map((tool, index) =>(
              <tr key={index}>
                <td>{tool.id}</td>
                <td>{tool.type}</td>
                <td>{tool.price}</td>
                <td>{tool.currentOwnerEmployee === null ? ("No Current Owner") : (tool.currentOwnerEmployee.name)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default ManageTools;