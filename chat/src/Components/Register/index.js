import {useState} from "react";
import {useNavigate,Link,Navigate} from "react-router-dom";
import Cookies from "js-cookie";



import "./index.css";

const Register = () =>{
    const[name, setName] = useState("")
    const[userName, setUserName] = useState("")
    const[password, setPassword] = useState("")
    const[mobileNumber, setMobileNumber]=useState("")
    const[errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const changeName = (event) =>{
      setName(event.target.value)
    }

    const changeUserName = (event) =>{
      setUserName(event.target.value)
    }
    const changePassword = (event) =>{
      setPassword(event.target.value)
    }

    const changeMobileNumber = (event) =>{
      setMobileNumber(event.target.value)
    }

    const userRegister = async () =>{
      const userData = {
        name,
        userName,
        password,
        mobileNumber,
        recievedMessages:[],
        sendmessages:[],
        about:"We are connecting here...."
      }
      
      const options = {
        method:"POST",
        headers:{
          
          'Content-Type': 'application/json'
          
        },
        body:JSON.stringify(userData)
      }
       const response = await fetch("http://localhost:3000/register", options);
       const responseStatus = await response.json(); 
       if(response.status !== 200){
          setErrorMessage(responseStatus.errorMsg)
       }
       else{
        
          navigate("/login")
       }
      }

    const submitRegisterForm = (event) =>{
      event.preventDefault();
      
      if(name !== "" && userName !== "" && mobileNumber !== "" && password !== ""){
        if(mobileNumber.length === 10){
          userRegister();
        }
        else{
          setErrorMessage("Invalid Mobile Number")
        }
      }
      else{
        setErrorMessage("Does not allow empty fields")
      }
    }
    const jwtToken = Cookies.get("jwtToken")
    if(jwtToken !== undefined){
      return <Navigate to="/"/>
    }
        return(
          <div className="register-form-main-container">
            <img src="https://res.cloudinary.com/dq6jxocbv/image/upload/v1716187341/Group_2_err5xy.png" alt="register" className="register-image"/>
            <form className="form-container" onSubmit={submitRegisterForm}>
            
              <div>
                <label className="label-text" htmlFor="name">Name:</label><br/>
                <input type="text" placeholder="enter name" id="name" className="input-element" value={name} onChange={changeName}/>
              </div>
              <br/>
              <div>
                <label className="label-text" htmlFor="userName">UserName:</label><br/>
                <input type="email" placeholder="username@gmail.com" id="userName" className="input-element" value={userName} onChange={changeUserName}/>
              </div>
              <br/>
              <div>
                <label className="label-text" htmlFor="password">Password:</label><br/>
                <input type="password" placeholder="enter password" id="password" className="input-element" value={password} onChange={changePassword}/>
              </div>
              <br/>
              <div>
                <label className="label-text" htmlFor="mobile">Mobile Number:</label><br/>
                <input type="mobile" placeholder="mobile number" id="mobile" className="input-element" value={mobileNumber} onChange={changeMobileNumber}/>
              </div>
              <br/>
              <button type="submit" className="button-custom">submit</button>
              {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}
              <p className="login-form-para-text">if you have an account please <Link to="/login" className="login-form-span-text">login</Link></p>
            </form>
          </div>
        )

    }
    
    
export default Register;