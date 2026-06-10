import React from "react";
import Navbar from "./shared/Navbar";
import Hero from "./shared/Hero";
import useGetAllJobs from "../hooks/useGetAllJobs";
import LatestJobs from "./LatestJobs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const {user}=useSelector((store)=>store.auth)
  const navigate=useNavigate();
  useEffect(()=>{
    if(user?.role=== 'recruiter'){
navigate('/admin/companies')
    }
  },[])

  return (
    <div className="bg-white min-h-screen text-gray-900">
      
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-10 pb-16">
        <Hero />
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] bg-gray-200"></div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <LatestJobs />
      </section>

    </div>
  );
};

export default Home;