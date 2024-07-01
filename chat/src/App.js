
import {useState,useEffect} from "react";

function App() {

  const[a, setA] = useState({});
  const[yourName, setYourName] = useState("");
  const[nameToDatabase, setNameToDatabase] = useState("")

  useEffect( () =>{
    
    const data = async () =>{
      const data1 = await fetch("http://localhost:3000/");
      const data2 = await data1.json();
      console.log(data2)
      setA(data2.result);
    }
    data();
  },[])

  useEffect( () =>{
    const userRegister = async () =>{
    const user = {
      name:nameToDatabase
      
    }
    console.log(user)
    const options = {
      method:"POST",
      headers:{
        
        'Content-Type': 'application/json'
        
      },
      body:JSON.stringify(user)
    }
     await fetch("http://localhost:3000/register", options);
  }
    userRegister();
  },[nameToDatabase])
  console.log(a)

    const changeName = (event) =>{
      setYourName(event.target.value);
    }
  const submitForm = (event) =>{
    event.preventDefault();
    setNameToDatabase(yourName);
  }

  return (
    <>
    <div>
      <form onSubmit = {submitForm}>
        <input type="text" value={yourName} onChange = {changeName}/>
        <button type="submit">submit</button>
      </form>
      <ul>
        {a.map((each) => (<li>{each.name}</li>))}
      </ul>
    </div>
    </>
  );
}

export default App;
