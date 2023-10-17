import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./MyTools.css"; // Import the CSS file

function MyTools() {
  const [tools, setTools] = useState(null);
  const token = Cookies.get("userToken");
  const employeeEmail = Cookies.get("userEmail");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://localhost:7173/api/ToolManager/GetAllTools", {
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

  const handleCheckboxChange = (tool) => {
    if(tool.check === false){
      const fetchData = async () => {
        const response = await fetch(`https://localhost:7173/api/ToolManager/ChangeCheckToTrue?id=${tool.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
       if(response.status === 200){
        const fetchData = async () => {
          const response = await fetch("https://localhost:7173/api/ToolManager/GetAllTools", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const jsonData = await response.json();
          setTools(jsonData);
        };
        fetchData();
        console.log("Check changed to true")
       }
       else{
        console.error(response.status);
       }
      };
      fetchData();
    }
    else{
      const fetchData = async () => {
        const response = await fetch(`https://localhost:7173/api/ToolManager/ChangeCheckToFalse?id=${tool.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
       if(response.status === 200){
        const fetchData = async () => {
          const response = await fetch("https://localhost:7173/api/ToolManager/GetAllTools", {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const jsonData = await response.json();
          setTools(jsonData);
        };
        fetchData();
        console.log("Check changed to false")
       }
       else{
        console.error(response.status);
       }
      };
      fetchData();
    }
    console.log("Checkbox changed for tool with ID:", tool);
  };

  return (
    <div>
      <table className="tables">
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Price</th>
            <th>
              <div className="tooltip">
                Check <i className="fas fa-info-circle"></i>
                <span className="tooltiptext">If you own the tool, switch the slide to green every week. The admin will uncheck it.</span>
                </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tools &&
            tools.map((tool, index) =>
              tool.currentOwnerEmployee && tool.currentOwnerEmployee.emailAddress === employeeEmail ? (
                <tr key={index}>
                  <td>{tool.id}</td>
                  <td>{tool.type}</td>
                  <td>{tool.price}</td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" checked={tool.check} onChange={() => handleCheckboxChange(tool)} />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>
    </div>
  );
}

export default MyTools;
