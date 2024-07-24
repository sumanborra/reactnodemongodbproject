

import {Popup} from 'reactjs-popup'
import { useState } from 'react'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'

import 'reactjs-popup/dist/index.css'
import "./index.css"

const ReactPopUp = (props) => {

   
   const handleClickClose = () => isPopUpClicked();
   const{isPopup,isPopUpClicked,name,about,changeUpdateForm} = props
   const[nameEdit, setNameEdit] = useState(name);
   const [aboutEdit, setAbout] = useState(about)
  const navigate = useNavigate();
    const changeAboutEdit = (event) =>{
      
      setAbout(event.target.value)
    }
    const deleteAccount = async () =>{
      const jwtToken = Cookies.get("jwtToken")
      const userName = Cookies.get("userName")
      const options = {
        method:'POST',
        headers:{
          "Content-Type":"application/json",
          authorization:`Bearer ${jwtToken}`
        }
      }
      const response = await fetch(`http://localhost:3000/delete-account/${userName}`, options)
      if(response.status === 200){
        navigate("/login")
        Cookies.remove("jwtToken")
        Cookies.remove("userName")
      }

    }

    const changeEditName = (event) =>{
      setNameEdit(event.target.value)
    }
    const submitEditForm = async (event) =>{
      const jwtToken = Cookies.get("jwtToken")
      const userName = Cookies.get("userName")
      event.preventDefault();
      if(about !== "" && nameEdit !== "" ){
          const userEditData = {
            name:nameEdit,
            about:aboutEdit
          }
          const options = {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              authorization: `Bearer ${jwtToken}`
            },
            body:JSON.stringify(userEditData)
          }
          await fetch(`http://localhost:3000/edit-settings/${userName}`,options)
          changeUpdateForm();
      }

    }

    return (
      <div className="popup-container">
        
        <Popup open={isPopup} onClose={handleClickClose}>
          <div>
            <form className='setting-form-container' onSubmit={submitEditForm}>
              <div>
                <label htmlFor='name' className='label-text-settings'>Name:</label>
                <input type="text" id="name"  className='name-text-settings' value={nameEdit} onChange={changeEditName}/>
              </div>
              <br/>
              <div>
                <label htmlFor='about' className='label-text-settings'>About:</label>
                <input type="text" id="about"  className='name-text-settings about-setting' value={aboutEdit} onChange={changeAboutEdit}/>
              </div>
              <button type='submit' className='save-button'>Save</button>
            </form>
          </div>
          <div  className="custom-button-comtainer-pop">
            <button type="button" className="trigger-button" onClick={handleClickClose}>
              Close
            </button>
            <button type="button" className="delete-button" onClick={deleteAccount}>
              Delete account 
            </button>
          </div>
        </Popup>
      </div>
    );
 }
 export default ReactPopUp;