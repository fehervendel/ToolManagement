import Cookies from "js-cookie";
import React, { useState } from "react";

function AddNewTool() {
  const [toolName, setToolName] = useState("");
  const [toolPrice, setToolPrice] = useState("");
  const token = Cookies.get("userToken");


const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(toolName);
    console.log(toolPrice);
    try {
        const response = await fetch("/api/ToolManager/AddTool", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                type: toolName,
                price: toolPrice,
            }),
        })
        console.log(toolName);
        console.log(toolPrice);

        setToolName("");
        setToolPrice("");
    } catch (error) {
        console.error("Error:", error);
    }
};

  return (
    <div>
      <h2>Add New Tool</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="toolName">Name:</label>
          <input
            type="text"
            id="toolName"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="toolPrice">Price:</label>
          <input
            type="number"
            step="0.01"
            id="toolPrice"
            value={toolPrice}
            onChange={(e) => setToolPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Tool</button>
      </form>
    </div>
  );
}

export default AddNewTool;
