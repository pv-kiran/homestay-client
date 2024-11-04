import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      console.log("sss");
      // Clear Google OAuth
      googleLogout();

      // Clear local storage
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('user');

      //   // Optional: Call backend to invalidate session
      //   fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      //     method: 'POST',
      //     headers: {
      //       'Authorization': `Bearer ${localStorage.getItem('token')}`
      //     }
      //   });

      // Redirect to login page
      //   navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button
      onClick={() => handleLogout()}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
      Logout
    </button>
  );
};

export default Logout;
