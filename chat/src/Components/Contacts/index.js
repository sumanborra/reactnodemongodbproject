
import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { IoMdContact } from "react-icons/io";

import "./index.css";
const Contacts = (props) =>{

    const[allUserData, setAllUserData] = useState([])

    useEffect(() =>{
        const allUserDataFetch = async ()=>{
            const userName = Cookies.get("userName")
            const jwtToken = Cookies.get("jwtToken")
            const options = {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    authorization: `Bearer ${jwtToken}`
                },
            }
            const response = await fetch(`https://reactnodemongodbproject.onrender.com/all-users/${userName}`,options)
            const responseData = await response.json()
            if(response.status === 200){
                setAllUserData(responseData.result);
            }
        }
        allUserDataFetch();
    },[])

    const personalSingleUserChat = (event) =>{
            const{personalChat} = props
            
           
            const singleUser = allUserData.filter((each) =>(each.userName === event.currentTarget.id))
           
            if(singleUser.length !== 0){
                personalChat(singleUser)
            }
    }

    return(
        <>
            <p className="contacts-chat-text">Chats</p>
            <hr/>
            
            {
            allUserData.length !== 0 && <ul className="list-container-all-user-data">
               { 
                 allUserData.map( (eachUser) => (<li key={eachUser._id} onClick={personalSingleUserChat} id={eachUser.userName}>
                    <div className="contacts-container-profile">
                    {eachUser.image === "" || eachUser.image === null || eachUser.image === undefined ?(<IoMdContact color="#ffffff" size={50}/>):(<img src={eachUser.image} alt="profile" className="profile-image"/>)}
                    <div>
                        <p className="name-text-chat">{eachUser.name}</p>
                        <p className="chat-text-chat">hi </p>
                    </div>
                </div>
                </li>)
                 )
                }
            </ul>
            }
            
        </>
    )

}
export default Contacts;
