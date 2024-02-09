import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PatentById() {
    const [patent, setPatent] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        fetch(`/patents/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPatent(data);
            })
            .catch(error => {
                console.error('Error fetching patent:', error);
            });
    }, [id]); 
    if (!patent) {
        return <div>Loading...</div>;
    }

    return (
        <div id="patent-details">
            <h2>{patent.title}</h2>
            <p><strong>Patent Status:</strong> {patent.patent_status}</p>
            <h3>Summary</h3>
            <p>{patent.summary}</p>
            <h3>Classification</h3>
            <p>{patent.classification.description}</p>
            <h3>Patent Creator</h3>
            <p>{patent.patent_creator.name}</p>
        </div>
    );
}
