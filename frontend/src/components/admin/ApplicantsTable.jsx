import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { APPLICANTION_API_END_POINT } from "../../utils/constants";
import { toast } from "react-toastify"; // ✅ FIX

const shortlistigStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const applicationsList = applicants || [];


  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICANTION_API_END_POINT}/status/${id}/update`,
        { status: status.toLowerCase() }, // ✅ important
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Status updated");
      }

    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to update status"
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-full overflow-x-auto">
      <h2 className="text-gray-800 text-xl font-semibold mb-4">
        Applicants
      </h2>

      <table className="min-w-full table-auto border-collapse">
        
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Resume</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {applicationsList.map((app) => (
            <tr key={app._id} className="hover:bg-gray-50">
              
              <td className="px-4 py-3">
                {app?.applicant?.fullName || "N/A"}
              </td>

              <td className="px-4 py-3">
                {app?.applicant?.email || "N/A"}
              </td>

              <td className="px-4 py-3">
                {app?.applicant?.phoneNumber || "N/A"}
              </td>

              <td className="px-4 py-3">
                {app?.applicant?.profile?.resume ? (
                  <a
                    href={app.applicant.profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </td>

              <td className="px-4 py-3">
                {new Date(app.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-3 text-center space-x-2">
                {shortlistigStatus.map((status, index) => (
                  <button
                    key={index}
                    onClick={() => statusHandler(status, app._id)} // ✅ FIX
                    className={`px-3 py-1 text-sm rounded-lg text-white ${
                      status === "Accepted"
                        ? "bg-green-600 hover:bg-green-500"
                        : "bg-red-600 hover:bg-red-500"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </td>

            </tr>
          ))}

          {applicationsList.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No applicants found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default ApplicantsTable;