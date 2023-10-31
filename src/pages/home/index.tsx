import React, { useState } from "react";
import ContentHeader from "./components/ContentHeader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="user-home">
      <Header />

      <div className="user-home__content">
        <ContentHeader navigate={navigate} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
