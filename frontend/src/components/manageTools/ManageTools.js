import React, { useEffect, useState } from "react";
import "./ManageTools.css"

function ManageTools(){
  const [tools, setTools] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/ToolManager/GetAllTools");
      const jsonData = await response.json();
      setTools(jsonData);
    };
    fetchData(); 
  }, []);


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