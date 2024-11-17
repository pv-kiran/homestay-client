import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import HomestayList from "../components/HomeStayList";
import Footer from "../components/Footer";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <HomestayList />
      <Footer />
    </div>
  );
};

export default LandingPage;
