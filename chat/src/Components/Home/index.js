import{useState,useEffect} from "react";
import Cookies from "js-cookie";
import Contacts from "../Contacts"
import Chats from"../Chats";
import { IoMdContact } from "react-icons/io";
import {useNavigate,Navigate} from "react-router-dom";
import ReactPopUp from "../ReactPopUp";
import AvatarPopUp from "../AvatarPopUp";
import StatusPopUp from "../StatusPopUp";
import FunChatView from "../FunChatView";



import "./index.css"


const Home = () =>{
const[image,setImage]=useState("");
const[imageUpdate,setImageUpdate] = useState("")
const[userDataFromDB, setUserDataFromDB] = useState([])
const[chatButton, setChatButton] = useState(false)
const[personalUserData, setPersonalUserData] = useState([])
const[isPopup, setIspopup] = useState(false)
const[isAvatarPopup, setIsAvatarPopup] = useState(false)
const[isStatus, setIsStattus] = useState(false)
const [updateEditForm , setUpdateEditForm] = useState("")

const navigate = useNavigate();

console.log(isPopup)
console.log(chatButton)

useEffect(() =>{
    const profileImageUpLoad = async () =>{
        const userName = Cookies.get("userName")
        const jwtToken = Cookies.get("jwtToken")
        
        const options = {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                authorization: `Bearer ${jwtToken}`
            },
        }

        const imageData = await fetch(`http://localhost:3000/get-profile-image/${userName}`,options)
        const imageFromDb = await imageData.json()
        if(imageData.status === 200){
            setImage(imageFromDb.image)
        }

    }
    profileImageUpLoad();

},[imageUpdate])

useEffect(() =>{

    const userDetails = async() =>{
        const userName = Cookies.get("userName")
        const jwtToken = Cookies.get("jwtToken")
        const options = {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                authorization: `Bearer ${jwtToken}`
            },
        }
        const userData = await fetch(`http://localhost:3000/${userName}`,options)
        const userDetails = await userData.json()
        
        if(userData.status === 200){
            setUserDataFromDB([userDetails.result[0]])
        }

    }
    userDetails();

    

},[])

useEffect(() =>{

    const userDetails = async() =>{
        const userName = Cookies.get("userName")
        const jwtToken = Cookies.get("jwtToken")
        const options = {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                authorization: `Bearer ${jwtToken}`
            },
        }
        const userData = await fetch(`http://localhost:3000/${userName}`,options)
        const userDetails = await userData.json()
        
        if(userData.status === 200){
            setUserDataFromDB([userDetails.result[0]])
        }

    }
    userDetails();

    

},[updateEditForm])

const updateImageOnDB = async (base64Image) =>{
    const userName = Cookies.get("userName")
    const jwtToken = Cookies.get("jwtToken");
    const profileImageUpload = {
        image1: base64Image,
        userName
    }
    

    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            authorization: `Bearer ${jwtToken}`
        },
        
        body:JSON.stringify(profileImageUpload)
    }
    try{
        await fetch("http://localhost:3000/upload",options)
        setImageUpdate(base64Image);
        
    }
    catch(error){
        console.log(error)
    }
    

}

const clickedChatButton1 = () =>{
    setChatButton(false)
    setIsAvatarPopup(false)
    setIspopup((prev) => (!prev))
    setIsStattus(false)
}

const convertToBase64 =  (event) =>{

    
    
    const reader = new FileReader();
     reader.readAsDataURL(event.target.files[0])
     
    reader.onload = () =>{
        console.log(reader.result)
        try{
            if(event.target.files.length !== 0){
            
            updateImageOnDB(reader.result)
            }
            
            
        }
        catch(err){
            console.log(err)
        }
    }
    reader.onerror = (error) =>{
        console.log("Error",error)
    }

}
const logOutButtonClicked =() =>{
    Cookies.remove("userName")
    Cookies.remove("jwtToken")
    navigate("/login")

}
const clickedChatButton = () =>{
    setChatButton((prevValue) => (!prevValue))
    setIspopup(false)
    setIsAvatarPopup(false)
    setIsStattus(false)
}

const clickedAvatarButton = () =>{
    setChatButton(false)
    setIspopup(false)
    setIsAvatarPopup((prevValue) => (!prevValue))
    setIsStattus(false)
}

const isStatusPopupClicked = () =>{
    setIsStattus(false);
}

const isPopUpClicked = () =>{
    setIspopup(false)
}

const changeUpdateForm = () =>{
    setUpdateEditForm("changed")
}

const changeStarusButton =() =>{
    setIsStattus(prev => (!prev))
    setChatButton(false)
    setIspopup(false)
    setIsAvatarPopup(false)
}

const isAvatarPopupClicked = () =>{
    setIsAvatarPopup(false)
}

const clickedPersonalChat = (userData) =>{
    
    if(userData.length !== 0){
    setPersonalUserData(userData)
    }
}

const jwtToken = Cookies.get("jwtToken");
const homePageView = () =>{
    
    if(jwtToken === undefined){
        return <Navigate to="/login"/>
    }
        else{
           
            return (<div className="home-main-container">
    <div className="left-side-section-container">
        <div className="profile-container">
            <label htmlFor="profileImageUpload">
                {image === "" || image === null || image === undefined ?(<IoMdContact color="#d9d9d9" size={50}/>):(<img src={image} alt="profile" className="profile-image-home"/>)}
            </label>
            <input type="file" accept=".jpg,.jpeg,.img" className="inpyt-element-image" id="profileImageUpload" onChange={convertToBase64}/>
            <div>
                {userDataFromDB.length !== 0 && <p className="profile-name-text">{userDataFromDB[0].name}</p>}
                {userDataFromDB.length !== 0 && <p className="profile-about-text">{userDataFromDB[0].about} </p>}
            </div>
        </div>
        <ul className="features-container-left-section">
            <li className="settings-text" onClick={changeStarusButton}>Status</li>
            <li className="settings-text" onClick={clickedAvatarButton}>Avatar</li>
            <li className="settings-text" onClick={clickedChatButton1}>Settings</li>
            <li className="settings-text">Privacy</li>
            <li className="settings-text" onClick={clickedChatButton}>Chats</li>
        </ul>
        <button className="log-out-text custom-log-out-button" onClick={logOutButtonClicked}>Log out</button>
        
    </div>
    {
    chatButton === true && <div className="middle-section-container">
         <Contacts personalChat={clickedPersonalChat}/>
    </div>
    
        }

        {chatButton !== true && isPopup !== true && isAvatarPopup !== true && isStatus !== true && <div className="fun-chat-view-styles">
         <FunChatView />
    </div>}
    {isPopup === true && <ReactPopUp changeUpdateForm={changeUpdateForm} about = {userDataFromDB[0].about} name={userDataFromDB[0].name} isPopup={isPopup} isPopUpClicked={isPopUpClicked}/>}
    {isAvatarPopup === true && <AvatarPopUp isAvatarPopup={isAvatarPopup} isAvatarPopupClicked={isAvatarPopupClicked} updateImageOnDB={updateImageOnDB}/>}
    {isStatus === true && <StatusPopUp isStatus={isStatus} isStatusPopupClicked={isStatusPopupClicked}/>}
    {personalUserData.length !==0 && chatButton === true  &&<div className="right-section-container">
        <Chats singlePersonData = {personalUserData[0]}/>
    </div>
        }
</div>)
        }
}
    return(
        <>
            {homePageView()}
        </>
    )
}
export default Home;