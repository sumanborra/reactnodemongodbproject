import React from "react"
import {Popup} from 'reactjs-popup'
import Player from 'react-player';

import 'reactjs-popup/dist/index.css'

import "./index.css";

const videoUrl = ["https://youtu.be/6stlCkUDG_s?si=je5LY37B9BQG-rza",
    "https://youtu.be/3176Sw8A0EE?si=6XSy8bJnUTO3ep4R",
    "https://youtu.be/HHBsvKnCkwI?si=N_VdF5V2Ax1gA9BN",
    "https://youtu.be/zJwHKgj5BwM?si=cbzoDt2rkeVMKA-C",
    "https://youtu.be/wegd5ERgQuA?si=sdqJouUR76tdrszx",
    "https://youtu.be/7NrKMceE6Wk?si=d-hxpKmPhqs24hkL",
    "https://youtu.be/RDqwQF00-ZQ?si=ueQ0XdyeYGL-2DKg",
    "https://youtu.be/rsUnpWA_kRw?si=yzi3MQNfov1anprv",
    "https://youtu.be/hQ6zGpM284Q?si=yfkXeyP3SgcrwJX5",
    "https://youtu.be/mUxzKVrSAjs?si=VAlMkOl-jqWgxB2d",
    "https://youtu.be/i74j6UWek4w?si=9hXhGyQ_MIvogkb0",
    "https://youtu.be/QBpQHkVmWBw?si=HQJXdmuHsvP9zV56",
    "https://youtu.be/PCslUovZIcM?si=OdATnB9qwOl2Jx0f",
    "https://youtu.be/RMyhFoMaiBQ?si=Fk8OK3xRQYPrdv_o",
    "https://youtu.be/2NEt3NwMBG8?si=91iqgI2yUbRVg-JA"
]

const StatusPopUp = (props) =>{
    const{isStatus,isStatusPopupClicked} = props
    const handleClickClose = () => isStatusPopupClicked();

    const randomNumber = Math.ceil(Math.random() * videoUrl.length -1)
    const randomNumber1 = Math.ceil(Math.random() * videoUrl.length -1)
    const randomNumber2 = Math.ceil(Math.random() * videoUrl.length -1)
    const randomNumber3 = Math.ceil(Math.random() * videoUrl.length -1)
    const randomNumber4 = Math.ceil(Math.random() * videoUrl.length -1)
    return (
        <div className="popup-container">
          
          <Popup open={isStatus} onClose={handleClickClose}>
            <div className='avatar-display-container'>
              <div className="video-container"> 
                <Player url={videoUrl[randomNumber]} width="540" height="380" controls />
              </div> 
              <div className="video-container"> 
                <Player url={videoUrl[randomNumber1]} width="540" height="380" controls />
              </div>
            <div className="video-container"> 
                <Player url={videoUrl[randomNumber2]} width="540" height="380" controls />
            </div>
            <div className="video-container"> 
                <Player url={videoUrl[randomNumber3]} width="540" height="380" controls />
            </div>
            <div className="video-container"> 
                <Player url={videoUrl[randomNumber4]} width="540" height="380" controls />
            </div>
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
export default StatusPopUp;