import { useState } from "react";


export default function Uploadpatent(){
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [patent_status, setStatus] = useState("")
    const [classification_id, setClassification] = useState("")
    const [uploadMessage, setUploadMessage] = useState("");
    const [formErrors, setFormErrors] = useState([]);

    function handleTitle(event) {
        setTitle(event.target.value)
    }   
    function handleSummary(event) {
        setSummary(event.target.value)
    }
    function handleClassification(event) {
        const value = parseInt(event.target.value);
        setClassification(value);
    }
    
    function handleStatus(event) {
        setStatus(event.target.value)
    }
    
    function handleSubmit(event){
        event.preventDefault();
        const formData = { title:title, patent_status:patent_status, summary:summary, classification_id:classification_id };
        fetch('https://technology-patent-app.onrender.com/patents', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formData),
        }).then((response) => {
            if (response.ok) {
                return response.json().then((new_patent) => {
                   
                    setTitle(new_patent.title);
                    setUploadMessage(`Successfully uploaded a patent.`);
                });
            } else {
                return response.json().then((err) => {
                    setFormErrors(err.errors);
                    throw new Error("Failed to upload patent");
                });
            }
        })
        .catch((error) => {
            console.error("Error uploading patent:", error);
        });
        
      
    }

return (
    <div id="upload-page" style={{marginTop: "30px"}}>
     
      <form onSubmit={handleSubmit} id="upload">
      <label>Title</label><br />
        <input 
            type="text"
            className="upload-select"
            onChange={handleTitle}
            value={title}
            placeholder="title" /><br />
        <label>Classification</label><br />
        <select className="upload-select" onChange={handleClassification} value={classification_id} placeholder='classification' >
            <option value="1">Machine Learning algorithms</option>
            <option value="2">Blockchain Technology</option>
            <option value="3">Nanotechnology</option>
            <option value="4">Augmented Reality Applications</option>
            <option value="5">Internet of Things (IoT)</option>
            <option value="6">Biometric Authentication Systems</option>
        </select><br />
        <label>Summary</label><br />
        <input 
            type="text"
            className="upload-select"
            onChange={handleSummary}
            value={summary}
            placeholder="summary" /><br />
        <label>Status</label><br />
        <select className="upload-select" onChange={handleStatus} value={patent_status} placeholder='status' >
            <option value="granted">granted</option>
            <option value="pending">pending</option>
            <option value="expired">expired</option>
        </select><br />
        <button type="submit" className='upload-btn'>Upload</button>
            {uploadMessage && <p>{uploadMessage}</p>} 
            {formErrors && <p>{formErrors}</p>}
      </form>
    </div>
)
}