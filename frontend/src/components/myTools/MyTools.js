import React from "react";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function MyTools() {
  const [tools, setTools] = useState(null);
  const token = Cookies.get("userToken");
  const employeeEmail = Cookies.get("userEmail");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://toolmanagerserver.onrender.com/api/ToolManager/GetAllTools", {
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
  
  return(
      <div>
        <table className="tables">
          <thead>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tools &&
              tools.map((tool, index) => (
                tool.currentOwnerEmployee && tool.currentOwnerEmployee.emailAddress === employeeEmail ? (
                  <tr key={index}>
                    <td>{tool.id}</td>
                    <td>{tool.type}</td>
                    <td>{tool.price}</td>
                  </tr>
                ) : null
              ))}
          </tbody>
        </table>
      </div>
  );
}

export default MyTools;
