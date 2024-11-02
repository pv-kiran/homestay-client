import React, { useState } from 'react';
import { SignupModal } from '../components/SignupModal';
import { Button } from '../components/common/Button';
import Logout from '../components/Logout';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='flex justify-center items-center'>
        <Button
        type="button"
        onClick = {() => {setIsModalOpen(true)}}
        >
           Sign Up
        </Button>
        <SignupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}     
      />
      <Logout/>
    </div>
  );
}

export default LandingPage;
