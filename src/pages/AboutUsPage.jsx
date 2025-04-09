import React, { useEffect } from 'react';
import { Home, Users, Clock, Shield, MapPin, Phone } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Curated Homestays",
      description: "Hand-picked properties that meet our high standards of comfort and authenticity"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Local Experiences",
      description: "Connect with hosts who share their culture and insider knowledge"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your travel needs"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Booking",
      description: "Safe and transparent booking process with verified properties"
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://res.cloudinary.com/djd2rpgil/image/upload/v1732096381/homestay-landing_bg/ne02gazrscv7bgwdfnae.jpg"
          alt="Luxury homestay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to BeStays
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl italic">
              Where comfort meets authenticity. Discover unique stays that feel just like home.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At BeStays, we believe that travel should be more than just visiting places – it should be about experiencing life as locals do. Our mission is to connect travelers with unique homestays and hosts who can provide authentic, memorable experiences.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gradient-to-b from-turquoise-50 to-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-turquoise-400 to-turquoise-600 rounded-full flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-r from-turquoise-400 to-turquoise-600">
              <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
              <div className="space-y-4 text-white">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <p>123 Travel Street, Adventure City, AC 12345</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 10:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;