import React, {useState} from  'react';
export default function Login(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")
    const [submittedData, setSubmittedData] = useState([]);

    function handleEmail(event) {
        setEmail(event.target.value);
    }
  
    function handlePassword(event) {
        setPassword(event.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      const formData = { email: email, password: password };
      const dataArray = [...submittedData, formData];
      setSubmittedData(dataArray);
      setEmail("");
      setPassword("");
    }
  
    const listOfSubmissions = submittedData.map((data, index) => {
      return (
        <div key={index}>
          {data.email} {data.password}
        </div>
      );
    });
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleEmail} value={email} />
          <input type="text" onChange={handlePassword} value={password} />
          <button type="submit">Submit</button>
        </form>
        <h3>Submissions</h3>
        {listOfSubmissions}
      </div>
    );
}