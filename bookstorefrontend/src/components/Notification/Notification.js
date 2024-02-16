'use client'
import { useSelector } from "react-redux";



const Notification = () => {
 
    
    const notificationData= useSelector((state)=>state.notification)

        console.log(notificationData)
  
  
  
    return (
   <>
    {notificationData.visible === true && (   <div
        style={{
          position: 'absolute',
          top: 20,
          right: 40,
          minWidth:'100px',
          backgroundColor: 'green',
          color: 'white',
          padding: 10,
          opacity: notificationData.visible ? 1 : 0,
          transition: 'opacity 0.5s ease',
          borderRadius: 5,
          zIndex: 19999,
        }}
      >
    <span>{notificationData.message}</span> 
      
      </div>)}
   </>
    );
  };


  export default Notification;