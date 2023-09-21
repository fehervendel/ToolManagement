import Cookies from "js-cookie";
import React, { useState } from "react";

function AddNewTool() {
  const [toolName, setToolName] = useState("");
  const [toolPrice, setToolPrice] = useState("");
  const token = Cookies.get("userToken");


  const handleNameChange = (e) => {
    e.preventDefault();
    setToolName(e.target.value);
  };

  const handlePriceChange = (e) => {
    e.preventDefault();
    setToolPrice(e.target.value);
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(toolName)
//     console.log(parseFloat(toolPrice)+1)

//     fetch("/api/ToolManager/AddTool", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           Type: toolName,  // Send the toolName as 'type'
//           Price: parseFloat(toolPrice)  // Send the toolPrice as 'price'
//         }),
//       })
//         .then((response) => {
//           if (response.ok) {
//             console.log("Tool added successfully");
//             setToolName("");
//             setToolPrice("");
//           } else {
//             console.error("Failed to add tool");
//           }
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
        const response = await fetch("/api/ToolManager/AddTool", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                type: toolName,  // Send the toolName as 'type'
                price: parseFloat(toolPrice), // Send the toolPrice as 'price'
            }),
        }).then((response) => response.json())
            .then((data) => {console.log(data)})
        if (response.ok) {
            const data = await response.json();
            console.log("Tool added successfully", data);
        } else {
            console.error("Failed to add tool");
        }
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
            onChange={handleNameChange}
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
            onChange={handlePriceChange}
            required
          />
        </div>
        <button type="submit">Add Tool</button>
      </form>
    </div>
  );
}

export default AddNewTool;
