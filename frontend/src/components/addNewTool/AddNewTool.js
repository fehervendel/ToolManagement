import Cookies from "js-cookie";
import React, { useState } from "react";
import "./AddNewTool.css";

function AddNewTool() {
  const [toolName, setToolName] = useState("");
  const [toolPrice, setToolPrice] = useState("");
  const token = Cookies.get("userToken");
  const [addToolSucces, setAddToolSucces] = useState(false);


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
        setToolName("");
        setToolPrice("");
        setAddToolSucces(true);
        setTimeout(() => {
          setAddToolSucces(false);
        }, 5000);
    } catch (error) {
        console.error("Error:", error);
    }
};

  return (
    <div className="add-tool-container">
      <h2>Add New Tool</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="toolName">Name:</label>
          <input
            type="text"
            id="toolName"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
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
        <button type="submit" className="submit-button">Add Tool</button>
      </form>
      {addToolSucces ? (<div className="success">Tool added successfully!</div>) : ("")}
    </div>
  );
}

export default AddNewTool;
