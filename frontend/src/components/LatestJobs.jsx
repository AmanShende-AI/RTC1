import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const latestJobs = allJobs?.slice(0, 6);

  return (
    <div>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Latest Opportunities
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Discover jobs tailored for you
        </p>
      </div>

      {latestJobs && latestJobs.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestJobs.map((job) => (
            <div
              key={job._id}
              className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {job.company?.name || "Unknown Company"}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">
                  New
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-gray-500 text-sm">
                  {job.location || "Remote"}
                </p>
                <p className="text-gray-500 text-sm">
                  ₹ {job.salary || "Not disclosed"}
                </p>
              </div>

              <div className="mt-5 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {job.jobType || "Full-time"}
                </span>

                <Link
                  to={`/job/${job._id}`}
                  className="text-sm px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs available</p>
      )}
    </div>
  );
};

export default LatestJobs;