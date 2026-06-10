import React, { useEffect } from "react";
import { APPLICANTION_API_END_POINT } from "../utils/constants";
import {  useSelector } from "react-redux";



const AppliedJobTable = () => {

  const {appliedJobs}=useSelector((store)=>store.job)


  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-2">Date</th>
            <th className="py-2">Title</th>
            <th className="py-2">Company</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {appliedJobs.map((job) => (
            <tr key={job._id} className="border-b hover:bg-gray-50">
              <td className="py-2">{job.createdAt.split("T")[0]}</td>
              <td>{job.job.title}</td>
              <td>{job.job.company.name}</td>
              <td>
                <span
  className={`px-2 py-1 rounded-full text-xs font-medium ${
    job.status === "accepted"
      ? "bg-green-100 text-green-600"
      : job.status === "rejected"
      ? "bg-red-100 text-red-600"
      : "bg-yellow-100 text-yellow-600"
  }`}
>
  {job.status}
</span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default AppliedJobTable;