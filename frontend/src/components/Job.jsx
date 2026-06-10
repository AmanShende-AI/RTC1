import React from "react";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Job = ({ job }) => {
  const navigate = useNavigate();
  useGetAllJobs();

  if (!job) return null;

  const daysAgo = Math.floor(
    (Date.now() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-md transition flex flex-col gap-4">
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
        </p>
        <div className="p-2 rounded-full bg-gray-100">
          <RxAvatar size={22} />
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-800">
          {job.company?.name || "Company"}
        </h2>
        <p className="text-sm text-gray-500">
          {job.location}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {job.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {job.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
          {job.position} Positions
        </span>
        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
          {job.jobType}
        </span>
        <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
          ₹ {job.salary}
        </span>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => navigate(`/description/${job._id}`)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-full text-sm font-medium transition"
        >
          Details
        </button>

        <button className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-full text-sm font-medium transition">
          Save
        </button>
      </div>

    </div>
  );
};

export default Job;