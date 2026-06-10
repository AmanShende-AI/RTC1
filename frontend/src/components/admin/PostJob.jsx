import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostJob = () => {
  useGetAllCompanies();

  const [input, setInput] = useState({
    title: "",
    description: "",
    salary: "",
    jobType: "",
    experience: "",
    requirements: "",
    position: "",
    location: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { allCompanies = [] } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        { withCredentials: true }
      );

      if (res.data?.success) {
        toast.success(res.data.message || "Job posted successfully");
        navigate("/admin/jobs"); 
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error posting job"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Post a Job
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={changeEventHandler}
            placeholder="Job Title"
            className="border px-4 py-2 rounded-lg"
          />

          <textarea
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Job Description"
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="number"
            name="salary"
            value={input.salary}
            onChange={changeEventHandler}
            placeholder="Salary"
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="jobType"
            value={input.jobType}
            onChange={changeEventHandler}
            placeholder="Job Type"
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="number"
            name="experience"
            value={input.experience}
            onChange={changeEventHandler}
            placeholder="Experience (years)"
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="requirements"
            value={input.requirements}
            onChange={changeEventHandler}
            placeholder="Requirements (comma separated)"
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="number"
            name="position"
            value={input.position}
            onChange={changeEventHandler}
            placeholder="Number of Positions"
            className="border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="location"
            value={input.location}
            onChange={changeEventHandler}
            placeholder="Location"
            className="border px-4 py-2 rounded-lg"
          />

          {allCompanies.length > 0 ? (
            <select
              name="companyId"
              value={input.companyId}
              onChange={changeEventHandler}
              className="border px-4 py-2 rounded-lg"
            >
              <option value="">Select Company</option>

              {allCompanies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-red-500 text-sm">
              Please register a company first
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 py-2 rounded-lg text-white transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;