import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Patent() {
  const [patents, setPatents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/patents')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPatents(data);
        setSearchResults(data);    
      })
      .catch(error => {
        console.error('Error fetching patents:', error);
      });
  }, []);

  const handleChange = event => {
    const searchTerm = event.target.value;
    filterPatents(searchTerm);
  };

  const filterPatents = searchTerm => {
    const filteredPatents = patents.filter(patent =>
      patent.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredPatents);
  };
  
  const handleClick = (id) => {
    navigate(`/patents/${id}`, { replace: true }); 
  }; 

  return (
    <>
      <div id="search">      
        <input
          id="search-bar"
          placeholder="search"
          type="text"
          onChange={handleChange}
        />
        <button className="button">🔍</button>
      </div>
      <div id="patents-page">
        <h2 id="patents">Patents</h2>
        <ol id="lists">
          {searchResults.map((patent, id) => (
            <li key={id} id="display-patents" onClick={() => handleClick(patent.id)}>
              <h4>{patent.title}</h4>
              <h5>Summary</h5>
              <p>{patent.summary}</p>
              <p>Patent Status: {patent.patent_status}</p>
            </li>
          ))}
        </ol>
      </div>
      <Footer />
    </>
  );
}
