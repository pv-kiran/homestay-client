import React, { useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import UploadIdProof from '../components/UploadIdProof'

function UserProfilePage() {
  const [idProof, setIdProof] = useState(null);

  const handleIdProofChange = (idProofData) => {
    setIdProof(idProofData);
  };

  return (
    <div className='mt-7 mr-24 ml-24'>
        <ProfileCard onIdProofChange={handleIdProofChange}/>
        <UploadIdProof idProofData={idProof}/>
    </div>
  )
}

export default UserProfilePage