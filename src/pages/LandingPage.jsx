import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import HomestayList from "../components/HomeStayList";
import Footer from "../components/Footer";
import {CouponModal} from "../components/couponBanner/CouponModal";
import { useModalSession } from '../hooks/useModalSession';


const LandingPage = () => {
  const { showModal, setShowModal } = useModalSession();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <CouponModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Categories />
      <HomestayList />
      <Footer />
    </div>
  );
};

export default LandingPage;
