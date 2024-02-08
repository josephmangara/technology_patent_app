import { useState, useEffect } from "react";

export default function Classification(){
 
    const [classifications, setClassification] = useState([])

    useEffect(() => {
        fetch('/classifications')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setClassification(data)
        })
        .catch(error => {
            console.error('Error fetching Classifications:', error);
          });
    }, [])
  
    return (
        <div>
          <h1>classifications List</h1>
          <ul className="not">
            {classifications.map((code, id) => (
            <li key={id} id="display-classes">
                <h3>{code.class_code}</h3>
                <h4>Description</h4>
                <p>{code.description}</p>
                
            </li>
            ))}
          </ul>
        </div>
    )
    
}