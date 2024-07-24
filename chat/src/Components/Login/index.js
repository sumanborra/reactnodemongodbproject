import {Link, useNavigate,Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import { useState} from "react";



import "./index.css";

const Login = () =>{

  const[userName,setUserName]=useState("");
  const[password,setPassword] =useState("");
  const[errorMessage,setErrorMessage] = useState("")
  const navigate = useNavigate();
  
  const changeName = (event) =>{

      setUserName(event.target.value);
  }

  const changePassword = (event) =>{
    setPassword(event.target.value);
  }

  const userLogin = async () =>{
    const userData = {
      userName,
      password
    }
    
    const options = {
      method:"POST",
      headers:{
        
        'Content-Type': 'application/json'
        
      },
      body:JSON.stringify(userData)
    }
     const response = await fetch("http://localhost:3000/login", options);
     const responseStatus = await response.json(); 
     if(response.status !== 200){
        setErrorMessage(responseStatus.errorMsg)
     }
     else{
       
       Cookies.set("jwtToken",responseStatus.jwtToken,{expires:30})
       Cookies.set("userName",responseStatus.userName,{expires:30});
        navigate("/")
     }
    }

  

  const submitLoginform = (event) =>{
    event.preventDefault();
    userLogin();
  }
  
  const jwtToken = Cookies.get("jwtToken")
  if(jwtToken !== undefined){
    return <Navigate to="/"/>
  }
    return(
        <div className="register-form-main-container">
            <img src="https://res.cloudinary.com/dq6jxocbv/image/upload/v1716187341/Group_2_err5xy.png" alt="register" className="register-image"/>
            <form className="form-container" onSubmit={submitLoginform}>
            <div>
                <label className="label-text" htmlFor="userName">UserName:</label><br/>
                <input type="email" placeholder="username@gmail.com" id="userName" className="input-element" value={userName} onChange={changeName}/>
                {userName === "" && <p className="required-inputs">Required*</p>}
              </div>
              <br/>
              <div>
                <label className="label-text" htmlFor="password">Password:</label><br/>
                <input type="password" placeholder="enter password" id="password" value={password} className="input-element" onChange={changePassword}/>
                {password === "" && <p className="required-inputs">Required*</p>}
              </div>
              <br/>
              <button type="submit" className="button-custom">submit</button>
              <br/>
              {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}
              <p className="login-form-para-text">if you don't have an account please <Link to="/Register" className="login-form-span-text">Sign up</Link></p>
            </form>
            
        </div>
    )

}
export default Login;