import React, { useContext, useState } from 'react';
import portalcontext from './portalcontext';
import { userContext } from '../../../App';
import axios from 'axios';
import { UserPortal } from '../UserPortal';

export const Portalstate = (props) => {
  const host = "http://localhost:2000";
  const [userData, setUserData] = useState(null);
  const authenticateUser = useContext(userContext);

  const getdetails = async () => {
    try {
      const response = await axios.get(`${host}/user/id/${authenticateUser.uid}`); // Access authenticateUser.uid instead of authenticateUser
      console.log(response);
      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <portalcontext.Provider value={{ getdetails ,userData}}>
      {props.children}
      {UserPortal}
    </portalcontext.Provider>
  );

}
