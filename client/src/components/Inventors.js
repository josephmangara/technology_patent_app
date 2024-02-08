import { useState, useEffect } from "react";

export default function Inventors(){

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

// useEffect(() => {
//   fetch(`/inventors/${id}`)
//   .then(res => res.json())
//   .then(data => {
//       console.log(data)
//       setInventors(data)
//   })
//   .catch(error => {
//       console.error('Error fetching Inventors:', error);
//     });
// }, [])


return (
    <div>
      <h1>List of patents belonging to multiple inventors.</h1>
      <ul className="lists">
        {inventors.map((inventor, id) => (
        <li key={id} id="display-inventors">
            <h3>{inventor.group_name}</h3>
            {/* <p>{inventor.patents}</p> */}
        </li>
        ))}
      </ul>
    </div>
)
}