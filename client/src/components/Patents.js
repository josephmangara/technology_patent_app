import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Patent(){
const [patents, setPatents] = useState([])
const navigate = useNavigate();

useEffect(() => {
    fetch('/patents')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setPatents(data)
    })
    .catch(error => {
        console.error('Error fetching patents:', error);
      });
}, [])

const handleClick = (id) => {
  navigate(`/patents/${id}`, { replace: true }); 
};

return (
    <div id="patents-page">
      {/* <h5>Welcome, {user.name}</h5> */}
      <h2 id="patents">Patents</h2>
      <ol className="lists">
        {patents.map((patent, id) => (
        <li key={id} id="display-patents" onClick={() => handleClick(patent.id)}>
            <h4>{patent.title}</h4>
            <h5>Summary</h5>
            <p>{patent.summary}</p>
            <p>Patent Status: {patent.patent_status}</p>
        </li>
        ))}
      </ol>
    </div>
)
}