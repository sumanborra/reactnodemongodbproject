
import { useState} from "react";

import { IoMdContact } from "react-icons/io";
import { IoIosSend } from "react-icons/io";

//import Cookies from "js-cookie"

import "./index.css";

const aiRespondData = ["hello","hi","how are you","I am Ai","chat with for entertainment","I am here😉","no chating only learning","hey i am AI booming in industry","I know you",
    "😆..","😅","😎","i am waiting for you👩🏿‍🤝‍🧑🏾","hey have you taken your dinner(❁´◡`❁)",
    "ask me anything","i will guide you","🍨","hey are you there.. ಠ_ಠ",
    "chill....","are you getting bore","why are wasting your time with chat","think creatively","you are not a common man"
]

const Chats = (props) =>{

    const[sendMessgeText, setSendMessgeText] = useState("")
    //const[sendMessgeTextArray, setSendMessgeTextArray] = useState([])
    const{singlePersonData} = props
    const{name,image} = singlePersonData


const changeMessageText = (event) =>{
    setSendMessgeText(event.target.value);
}



const sendMessage = async () =>{
    const randomNumber = Math.ceil(Math.random() * aiRespondData.length-1)
    
    if(sendMessgeText !== ""){
        let messageBox = document.getElementById("displayMessageBox");
        let div = document.createElement("div");
        let span = document.createElement("span");
        div.classList.add("send-message-container");
        span.classList.add("messege-text");
        span.textContent = sendMessgeText;
        let div1 = document.createElement("div");
        let span1 = document.createElement("span");
        div1.classList.add("recieved-message-container");
        span1.classList.add("messege-text");
        span1.textContent = aiRespondData[randomNumber];
        div1.appendChild(span1)
        div.appendChild(span)
        messageBox.appendChild(div);
        messageBox.appendChild(div1);
        
         
         
         

    }
    setSendMessgeText("")


}

    return(
    <>
        <div className="chat-single-profile-container">
            
            {image === undefined ?(<IoMdContact color="#ffffff" size={50}/>):(<img src={image} alt="profile" className="profile-image"/>)}
                <div>
                    {name !== undefined && <p className="name-text-chat">{name}</p>}
                    <p className="chat-text-chat">Active </p>
                </div>
        </div>
        <hr/>
        <div className="chat-bx-main-container" >
            <div className="chat-bx-texting-container" id="displayMessageBox">


            </div>
                
                

            <div className="input-text-mesg-container">
                <div className="input-text-mesg-content-container">
                    <input type="text" className="messaga-text-box" onChange={changeMessageText} value={sendMessgeText}/>
                    <IoIosSend size={40} className="send-button-custom" onClick={sendMessage}/>
                </div>
            </div>
            
        </div>
    </>
    )
}
export default Chats