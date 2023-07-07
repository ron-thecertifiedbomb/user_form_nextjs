import React, { useState } from "react";
import LoginForm from "../components/LogInForm";
import ProfileInfo from "../components/ProfileInfo";

const SuccessPage: React.FC = () => {

const [isLoggedIn, setIsloggedIn] = useState(false)
const [profileId, setProfileId] = useState('')


  return (
    <div>

    { isLoggedIn ?   <ProfileInfo profileId={profileId} />  :
      <LoginForm setIsLoggedIn={setIsloggedIn} setProfileId={setProfileId}/>}
    </div>
  );
};

export default SuccessPage;
