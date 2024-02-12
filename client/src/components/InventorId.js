import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Inventors from "./Inventors";

export default function InventorId(){
    const [ inventor, setInventor] = useState([])
    const { id } = useParams(); 

    useEffect(() => {
        fetch(`/inventors/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            setInventor(data);  
        })
        .catch(error => {
            console.error('Error fetching inventors:', error);
        });
    }, [id]); 

return (
    <>
      <Inventors patents={inventor} />
    </>
)
}