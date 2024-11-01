import React,{useState} from 'react';
import { SignupModal } from './components/SignupModal';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen items-center justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-turquoise-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-turquoise-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-turquoise-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </div>

      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default App
