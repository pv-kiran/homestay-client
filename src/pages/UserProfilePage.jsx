import React, { useState } from 'react'
import ProfileCard from '../components/ProfileCard'

function UserProfilePage() {
  const [isProof, setIdProof] = useState(false);
  const handleIdProofChange = (idProofData) => {
    setIdProof(idProofData);
  };

  return (
    <div className='lg:mt-6 lg:mr-24 lg:ml-24 p-2 border'>
      <ProfileCard onIdProofChange={handleIdProofChange} />
    </div>
  )
}

export default UserProfilePage