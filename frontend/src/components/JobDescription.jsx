import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/constants";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const isInitiallyApplied = singleJob?.applications?.some(
  (application) => application.applicant?._id?.toString() === user?._id?.toString()
);

const [isApplied, setIsApplied]=useState(isInitiallyApplied);
  
  const params = useParams();
  const jobId = params.id;

 const applyJobHandler = async () => {
  try {
    const res = await axios.get(
      `${APPLICATION_API_END_POINT}/apply/${jobId}`,
      { withCredentials: true }
    );
    

    if (res.data.success) {
      setIsApplied(true)
      toast.success(res.data.message);

      dispatch(
  setSingleJob({
    ...singleJob,
    applications: [
      ...singleJob.applications,
      { applicant: user._id }
    ],
  })
);
    }
  } catch (error) {
    console.error("Apply Job Error:", error);
    toast.error(
      error?.response?.data?.message || "Failed to apply"
    );
  }
};

  useEffect(() => {
    if (!jobId) return;

    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some((application) => application.applicant?._id?.toString() === user?._id?.toString()))
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch]);

  if (!singleJob) return null;

  const daysAgo = Math.floor(
    (Date.now() - new Date(singleJob.createdAt)) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {singleJob.title}
              </h1>
              <p className="text-gray-500">
                {singleJob.company?.name} • {singleJob.location}
              </p>
            </div>

            <button
            onClick={applyJobHandler}
              disabled={isApplied}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                isApplied
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
              {singleJob.position} Positions
            </span>
            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
              {singleJob.jobType}
            </span>
            <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
              ₹ {singleJob.salary}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              {singleJob.applications?.length || 0} Applicants
            </span>
          </div>

          <div className="border-t pt-4 flex flex-col gap-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {singleJob.location}
            </p>
            <p>
              <span className="font-semibold">Experience:</span>{" "}
              {singleJob.experienceLevel} Years
            </p>
            <p>
              <span className="font-semibold">Posted:</span>{" "}
              {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
            </p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Job Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {singleJob.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDescription;