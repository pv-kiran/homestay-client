import React from 'react';
import { Home, Compass, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound404() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full text-center relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-64 h-64 rounded-full bg-[#40E0D0]/20 animate-pulse -top-20 -left-20" />
              <div className="absolute w-96 h-96 rounded-full bg-white/30 animate-pulse -bottom-32 -right-32" />
            </div>
    
            {/* Main Content */}
            <div className="relative backdrop-blur-md bg-white/30 p-8 rounded-2xl shadow-2xl border border-white/40">
              {/* Animated 404 Text */}
              <h1 className="text-9xl font-bold text-[#14B8A6] mb-4 relative">
                <span className="animate inline-block">4</span>
                <span className="animate inline-block">0</span>
                <span className="animate inline-block">4</span>
              </h1>
    
              {/* Compass Animation */}
              <div className="mb-6">
                <Compass className="w-24 h-24 mx-auto text-[#008080] animate-spin-slow" />
              </div>
    
              <h2 className="text-2xl font-semibold text-[#006666] mb-4">
                Oops! Looks like you're lost in paradise
              </h2>
              
              <p className="text-[#007777] mb-8">
                The homestay you're looking for might have taken a vacation of its own.
                Let's get you back on track!
              </p>
    
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/"
                  className="group flex items-center gap-2 px-6 py-3 bg-[#14B8A6] text-white rounded-full font-medium transition-all hover:bg-[#006666] hover:scale-105"
                >
                  <Home className="w-5 h-5" />
                  <span>Return Home</span>
                </Link>
                
                <button 
                  onClick={() => window.history.back()}
                  className="group flex items-center gap-2 px-6 py-3 border-2 border-[#14B8A6] text-[#14B8A6] rounded-full font-medium transition-all hover:bg-[#14B8A6]/10"
                >
                  <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
                  <span>Go Back</span>
                </button>
              </div>
            </div>
    
            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-10 left-10 w-3 h-3 bg-[#008080] rounded-full animate-float opacity-70" />
              <div className="absolute bottom-10 right-10 w-3 h-3 bg-[#008080] rounded-full animate-float2 opacity-70" />
              <div className="absolute top-1/2 right-20 w-2 h-2 bg-[#008080] rounded-full animate-float3 opacity-70" />
            </div>
          </div>
        </div>
      );
}

export default NotFound404