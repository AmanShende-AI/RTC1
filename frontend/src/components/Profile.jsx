import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfileChanges from "./UpdateProfileChanges";
import AppliedJobTable from "./ApplliedJobTable";
import { setAppliedJobs } from "../redux/jobSlice";
import axios from "axios";
import { APPLICANTION_API_END_POINT } from "../utils/constants";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchAppliedJobs=async()=>{
      try {
        const res=await axios.get(`${APPLICANTION_API_END_POINT}/get`,{withCredentials:true})
        if(res.data.success){
          dispatch(setAppliedJobs(res.data.application))
        }
      } catch (error) {
        
      }
    }

    fetchAppliedJobs();
  },[dispatch])
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-6">
        
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              Profile
            </h1>

            <button
              onClick={() => setOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm"
            >
              Edit
            </button>
          </div>

          <div className="flex flex-col gap-2 text-gray-700">
            <p><span className="font-semibold">Name:</span> {user?.fullName}</p>
            <p><span className="font-semibold">Email:</span> {user?.email}</p>
            <p><span className="font-semibold">Phone:</span> {user?.phoneNumber}</p>

            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline mt-2"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Applied Jobs
          </h2>
          <AppliedJobTable />
        </div>

      </div>

      {open && <UpdateProfileChanges setOpen={setOpen} />}
    </div>
  );
};

export default Profile;