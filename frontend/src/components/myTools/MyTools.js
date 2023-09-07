import React from "react";
import Loading from "../Loading";
import { useEffect, useState } from "react";


const fetchTools = () => {
  return fetch("/api/Tools").then((res) => res.json());
};


function MyTools() {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);

  return(
    <div>
      <th>asd</th>
    </div>
  )
}

export default MyTools;
