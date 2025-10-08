// src/Pages/Home/Home.jsx
import React from "react";
import Banner from "../../Components/Banner/Banner";
import FeaturedSports from "./FeaturedSports";
import ShowCard from "./ShowCard";  
import UpcomingEvents from "./UpcomingEvents";
import EliteExperience from "./HeroShowcase";
import Location from "./Location";

// ❌ Remove admin imports - They should NOT be in Home page
// import ManageBanners from "./Admin/ManageBanners";
// import AddBanner from "./Admin/AddBanner";

const Home = () => {
  return (
    <>
      <Banner />
      <FeaturedSports />
      <ShowCard />
      <UpcomingEvents />
      <Location />
      <EliteExperience />
    </>
  );
};

export default Home;
