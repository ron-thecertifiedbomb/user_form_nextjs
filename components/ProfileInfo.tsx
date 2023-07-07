import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface UserProfile {
  username: string;
  firstname: string;
  lastname: string;
  dateofbirth: string;
  address: string;
  contactno: string;
  email: string;
}

interface ProfileInfoProps {
  profileId: string;
}
const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileId }) =>{
    

  const [profileData, setProfileData] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Fetch profile data using the user ID
    fetch(`http://localhost:2000/api/profile/${profileId}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch profile data:", error);
      });
  }, [profileId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  console.log(profileId) 

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
      <h2>Profile Page</h2>
   
      <div>
        <strong>First Name:</strong> {profileData.firstname}
      </div>
      <div>
        <strong>Last Name:</strong> {profileData.lastname}
      </div>
      <div>
      <strong>Date of Birth:</strong> {new Date(profileData.dateofbirth).toLocaleDateString()}

      </div>
      <div>
        <strong>Address:</strong> {profileData.address}
      </div>
      {/* Include other profile fields */}
    </div>
  );
};

export default ProfileInfo;
