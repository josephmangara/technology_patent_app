import { useState, useEffect } from "react";

export default function Inventors() {

  const [inventors, setInventors] = useState([])

  useEffect(() => {
    fetch('/inventors')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        setInventors(data)
    })
    .catch(error => {
        console.error('Error fetching Inventors:', error);
    });
  }, [])

return (
  <div>
    <h1>List of patents belonging to multiple inventors.</h1>
    <ul className="lists">
      {inventors.map((inv, id) => (
        <li key={id} id="display-inventors">
          <h3>{inv.group_name}</h3>
          <img src={inv.group_image} alt="inventions" />
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
