import { useState, useEffect } from "react";

export default function Patent(){
const [patents, setPatents] = useState([])

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


return (
    <div>
      <h1>Patents List</h1>
      <ul className="lists">
        {patents.map((patent, id) => (
        <li key={id} id="display-patents">
            <h3>{patent.title}</h3>
            <p>Patent Status: {patent.patent_status}</p>
            <h4>Summary</h4>
            <p>{patent.summary}</p>
            
        </li>
        ))}
      </ul>
    </div>
)
}