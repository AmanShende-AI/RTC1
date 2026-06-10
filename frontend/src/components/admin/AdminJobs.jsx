import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setSearchCompany } from "../../redux/companySlice";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "../../redux/jobSlice";

const AdminJobs = () => {
useGetAllAdminJobs();
  const [input,setInput]=useState("");
const navigate=useNavigate();
const dispatch=useDispatch();
useEffect(()=>{
dispatch(setSearchJobByText(input))
},[input])
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <input
            type="text"
            onChange={(e)=>setInput(e.target.value)}
            placeholder="Search companies..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
          onClick={()=>navigate('/admin/jobs/create')}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors"
          >
            New Job
          </button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
};


export default AdminJobs

