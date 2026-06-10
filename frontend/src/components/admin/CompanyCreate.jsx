import React from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constants";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, { withCredentials: true })
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company))
        const companyId = res?.data?.company?._id
        toast.success(res.data.message)
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {

    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-start pt-20 px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Create a Company
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Add your company details below to get started.
        </p>

        <div className="w-full max-w-lg">
          <label className="block text-gray-700 mb-2" htmlFor="companyName">
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => navigate("/admin/companies")}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button onClick={registerNewCompany} className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;