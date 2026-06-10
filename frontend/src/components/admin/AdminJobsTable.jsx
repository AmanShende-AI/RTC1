import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";

const AdminJobsTable = () => {
    useGetAllAdminJobs();
  const { adminJobs = [], searchJobByText } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = adminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title
        ?.toLowerCase()
        .includes(searchJobByText.toLowerCase());
    });

    setFilterJobs(filtered);
  }, [searchJobByText, adminJobs]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full overflow-x-auto">
      <h2 className="text-gray-800 text-xl font-semibold mb-4">Jobs</h2>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-4 py-2">Job Title</th>
            <th className="px-4 py-2">Company</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {(filterJobs || []).map((job) => (
            <tr key={job._id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{job?.title}</td>

              <td className="px-4 py-3">{job?.company?.name}</td>

              <td className="px-4 py-3">
                {new Date(job.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
  <div className="flex gap-2">
    <button
      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
    >
      Applicants
    </button>

    <button
      onClick={() => navigate(`/admin/jobs/${job._id}`)}
      className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-500 transition"
    >
      Edit
    </button>
  </div>
</td>
            </tr>
          ))}

          {filterJobs.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobsTable;