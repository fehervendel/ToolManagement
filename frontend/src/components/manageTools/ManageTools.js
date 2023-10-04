import React, { useEffect, useState } from "react";
import "./ManageTools.css";
import Cookies from "js-cookie";

function ManageTools() {
  const [tools, setTools] = useState(null);
  const token = Cookies.get("userToken");
  const role = Cookies.get("userRole");
  const [employeeData, setEmployeeData] = useState(null);
  const [searchToolId, setSearchToolId] = useState(""); 

  useEffect(() => {
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
    fetchData();
  }, [token]);

  useEffect(() => {
    if (tools) {
      const toolsWithOwner = tools.filter(
        (tool) => tool.currentOwnerEmployeeId !== null
      );

      const employeePromises = toolsWithOwner.map((tool) =>
        fetchEmployee(tool.currentOwnerEmployeeId)
      );
      Promise.all(employeePromises)
        .then((employeeData) => setEmployeeData(employeeData))
        .catch((error) => console.error(error));
    }
  }, [tools]);

  const fetchEmployee = async (id) => {
    const response = await fetch(
      `/api/ToolManager/GetEmployeeById?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const jsonData = await response.json();
    return jsonData;
  };

  if (role !== "Admin") {
    return <div>Only admins can see this page!</div>;
  }

  const filteredTools = tools
    ? tools.filter((tool) =>
        tool.id.toString().includes(searchToolId.toString())
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
        <button type="button">Search</button>
      </div>
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
          {filteredTools.map((tool, index) => (
            <tr key={index}>
              <td>{tool.id}</td>
              <td>{tool.type}</td>
              <td>{tool.price}</td>
              <td>
                {tool.currentOwnerEmployeeId === null
                  ? "No Current Owner"
                  : employeeData
                  ? employeeData[index].name
                  : "Loading..."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageTools;
