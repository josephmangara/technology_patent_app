import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="bg-slate-200">
      <div id="search">      
        <input
          id="search-bar"
          placeholder="search"
          type="text"
          onChange={handleChange}
        />
        <button className="button">🔍</button>
      </div>
      <div className="page-look">
      <div id="patents-page" className="col-md-6">
        <h2 id="patents">Patents</h2>
        {searchResults.length > 0 && (
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
        )}
      </div>
        <div id="right-col" className="col-md-6">
          <h3>What is a patent?</h3>
          <img id="image" src="https://live.staticflickr.com/540/19603716723_6d04114159_z.jpg" alt="definition of a patent" />
          <p id="patent-def">A patent is a form of intellectual property right granted by the government to an inventor or assignee, giving them the exclusive right to make, use, and sell their invention for a limited period of time. 
            Patents are granted for inventions that are novel, non-obvious, and useful. They provide inventors with the incentive to invest time and resources into researching and developing new technologies or products 
            by granting them a period of exclusivity during which they can profit from their invention without competition. In exchange for this exclusivity, the inventor is required to disclose the details of their 
            invention in the patent application, which contributes to the body of public knowledge.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
