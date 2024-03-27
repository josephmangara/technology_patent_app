import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PatentById() {
    const [patent, setPatent] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        fetch(`https://technology-patent-app.onrender.com/patents/${id}`) 
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
            .then(data => {
                setPatent(data[0]);  
            })
            .catch(error => {
                console.error('Error fetching patent:', error);
            });
    }, [id]); 

    if (!patent) {
        return <div>Loading...</div>;
    }

    return (
        <div id="patent-details" style={{marginTop: "30px"}}>
            <h2>{patent.title}</h2>
            <h3>Summary</h3>
            <p>{patent.summary}</p>
            <h4>Classification</h4>
            <p>{patent.classification.description}</p>
            <h4>Patent Creator</h4>
            <p>{patent.patent_creator.name}</p>
            <p><strong>Patent Status:</strong> {patent.patent_status}</p>
        </div>
    );
}
