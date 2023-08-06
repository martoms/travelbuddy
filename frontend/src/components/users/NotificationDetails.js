// import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { AllContext } from "../../context/AllContext";
import ObjectRenderer from '../ObjectRenderer';

const NotificationDetails = ({ id }) => {
const { token, user } = useContext(AllContext);
const [notificationDetails, setNotificationDetails] = useState('')

let isAdmin;
if (user) {
  isAdmin = user.isAdmin;
};

useEffect(() => {
  fetch(
    isAdmin ?
    `${process.env.REACT_APP_API_URL}/users/admin/notifications/${id}`
    :
    `${process.env.REACT_APP_API_URL}/users/profile/notifications/${id}`,
  {
      headers: {'Authorization': `Bearer ${token}`}
  })
  .then(res => res.json())
  .then(data => {
      setNotificationDetails(data);
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, notificationDetails]);

  

  if (!notificationDetails) {
    return (
        <img src="/images/loading.gif" alt="loading" style={{marginLeft: '3rem'}} />
    )
  }


  return (
    <ObjectRenderer data={notificationDetails} /> 
  );
};

export default NotificationDetails;
