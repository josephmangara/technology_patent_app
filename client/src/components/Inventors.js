import { useState, useEffect } from "react";

export default function Inventors() {

  const [inventors, setInventors] = useState([])

  useEffect(() => {
    fetch('https://technology-patent-app.onrender.com/inventors')
    .then(res => res.json())
    .then(data => {
        setInventors(data)
    })
    .catch(error => {
        console.error('Error fetching Inventors:', error);
    });
  }, [])

return (
  <div id="inventors-page" style={{marginTop: "30px"}}>
    <h1 id="heading">List of patents belonging to multiple inventors.</h1>
    <ul className="lists">
      {inventors.map((inv, id) => (
        <li key={id} id="display-inventors">
          <h3>{inv.group_name}</h3>
          <img src={inv.group_image} alt="inventions" id='pictures'/>
          <h4>Patents:</h4>
          <ul>
            {inv.patents.map((patent, index) => (
              <li key={index}>
                <p>Title: {patent.title}</p>
                <p>Summary: {patent.summary}</p>
                <p>Status: {patent.patent_status}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
)
}
