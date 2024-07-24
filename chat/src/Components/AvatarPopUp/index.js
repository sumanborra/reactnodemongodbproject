import {v4 as uuidv4} from "uuid";

import {Popup} from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import "./index.css"

const avatarImagesUrl = [{
  image:"https://res.cloudinary.com/dq6jxocbv/image/upload/v1721480298/jpeg-optimizer_portrait-happy-young-businessman-glasses-3d-rendering_zw5ohe.jpg",
  id:uuidv4()
},
{
  image:"https://res.cloudinary.com/dq6jxocbv/image/upload/v1721480289/jpeg-optimizer_3d-illustration-teenager-with-funny-face-glasses_qurkav.jpg",
  id:uuidv4()
},
{
  image:"https://res.cloudinary.com/dq6jxocbv/image/upload/v1721480272/jpeg-optimizer_androgynous-avatar-non-binary-queer-person_i3gqvo.jpg",
  id:uuidv4()
},
{
  image:"https://res.cloudinary.com/dq6jxocbv/image/upload/v1721480260/jpeg-optimizer_portrait-young-woman-wearing-glasses-3d-rendering_qtuhoe.jpg",
  id:uuidv4()
},
{
  image:"https://res.cloudinary.com/dq6jxocbv/image/upload/v1721480247/jpeg-optimizer_3d-illustration-cute-cartoon-girl-blue-jacket-glasses_hrzflr.jpg",
  id:uuidv4()
},
{
  image:"https://res.cloudinary.com/dq6jxocbv/image/upload/v1721480236/jpeg-optimizer_3d-illustration-young-girl-with-black-headscarf_gqsohj.jpg",
  id:uuidv4()
}
]

const AvatarPopUp = (props) => {

   
   
   const{isAvatarPopup,isAvatarPopupClicked,updateImageOnDB} = props
   const handleClickClose = () => isAvatarPopupClicked();
    const changeAvatar = (event) =>{
      updateImageOnDB(event.target.src)
    }
    return (
      <div className="popup-container">
        
        <Popup open={isAvatarPopup} onClose={handleClickClose}>
          <div className='avatar-display-container'>
            
              {avatarImagesUrl.map( (each) => (
                <button type='button' className='avatar-button' key={each.id}><img src={each.image} alt="avatar" className='avatar-image-style-custom' onClick={changeAvatar}/></button>            
              )
              )} 
          </div>
          <div  className="custom-button-comtainer-pop">
            <button type="button" className="trigger-button" onClick={handleClickClose}>
              Close
            </button>
            
          </div>
        </Popup>
      </div>
    );
 }
 export default AvatarPopUp;