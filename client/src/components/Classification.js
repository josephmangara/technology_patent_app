import { useState, useEffect } from "react";

export default function Classification(){
 
    const [classifications, setClassification] = useState([])

    useEffect(() => {
        fetch('https://technology-patent-app.onrender.com/classifications')
        .then(res => res.json())
        .then(data => {
            setClassification(data)
        })
        .catch(error => {
            console.error('Error fetching Classifications:', error);
          });
    }, [])
  
    return (
        <div id="classifications-page" style={{marginTop: "30px"}}>
          <h4>classifications List</h4>
          <table>
            <thead className="table">
              <tr>
                <th>Class Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody className="table">
              {classifications.map((classification) => (
                <tr key={classification.id}>
                  <td>{classification.class_code}</td>
                  <td>{classification.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
    
}