import React from "react";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { authState } = useSelector((state) => state?.userAuth);

  return (
    <div className="flex justify-center items-center h-[95vh]">
      {!authState ? (
        <span>Login and Continue</span>
      ) : (
        <span>{authState?.name}</span>
      )}
    </div>
  );
};

export default LandingPage;
