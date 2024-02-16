
import React, { useEffect, useState } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info', duration = 20000) => {
    setNotification({ message, type });

    // Automatically hide the notification after the specified duration
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return { notification, showNotification, hideNotification };
};



const NotificationProvider = ({ children }) => {
  const { notification, hideNotification } = useNotification();

 


  return (
    <>
      {children}
      <Notification notification={notification} onClose={hideNotification} />
    </>
  );
};

export { useNotification, NotificationProvider };
