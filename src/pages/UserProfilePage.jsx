import React, { useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import UserNavbar from '../components/UserNavbar';

function UserProfilePage() {
  const [idProof, setIdProof] = useState(false);
  const handleIdProofChange = (idProofData) => {
    setIdProof(idProofData);
  };

  return (
    <div className='lg:mt-6 lg:mr-24 lg:ml-24 p-2 border'>
      <UserNavbar />
      <div className='mt-8'>
        <ProfileCard
          onIdProofChange={handleIdProofChange}
          idProof={idProof}
        />
      </div>

    </div>
  )
}

export default UserProfilePage