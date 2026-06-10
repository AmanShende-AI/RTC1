import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
        
        <div className="lg:w-1/4">
          <div className="sticky top-20 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <FilterCard />
          </div>
        </div>

        <div className="flex-1">
          {allJobs.length === 0 ? (
            <div className="text-center mt-20">
              <h2 className="text-2xl font-semibold text-gray-800">
                No Jobs Found
              </h2>
              <p className="text-gray-500 mt-2">
                Try searching for something else
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {allJobs.map((job) => (
                <div
                  key={job?._id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition"
                >
                  <Job job={job} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Jobs;