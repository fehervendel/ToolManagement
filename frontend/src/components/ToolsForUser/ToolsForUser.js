import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./ToolsForUser.css";

function ManageTools() {
  const [tools, setTools] = useState(null);
  const token = Cookies.get("userToken");
  const role = Cookies.get("userRole");
  const [employeeData, setEmployeeData] = useState(null);
  const [searchToolId, setSearchToolId] = useState("");
  const [searchToolType, setSearchToolType] = useState("");
  const [showAvailable, setShowAvailable] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://localhost:7173/api/ToolManager/GetAllTools", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      setTools(jsonData);
    };
    fetchData();
  }, [token]);

  const filteredTools = tools
    ? tools.filter(
        (tool) =>
          (tool.id.toString().includes(searchToolId) || searchToolId === "") &&
          (tool.type.toLowerCase().includes(searchToolType.toLowerCase()) || searchToolType === "") &&
          (showAvailable ? tool.currentOwnerEmployeeId === null : true) 
      )
    : [];

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Tool ID"
          value={searchToolId}
          onChange={(e) => setSearchToolId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Tool type"
          value={searchToolType}
          onChange={(e) => setSearchToolType(e.target.value)}
        />
        Show Available Only
        <label className="switch">
          
          <input
            name="showAvailable"
            type="checkbox"
            checked={showAvailable}
            onChange={(e) => setShowAvailable(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <table className="tables">
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Price</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {filteredTools.map((tool, index) => (
            <tr key={index}>
              <td>{tool.id}</td>
              <td>{tool.type}</td>
              <td>{tool.price}</td>
              <td>{tool.currentOwnerEmployeeId === null ?
               <span style={{color: 'green'}}>Available</span> : 
               <span style={{color: 'red'}}>Not available</span>
               }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageTools;
