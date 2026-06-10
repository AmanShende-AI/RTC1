import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constants";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetUp = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {singleCompany}=useSelector((store)=>store.company)
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    location: "",
    website: "",
    description: "",
    file: null,
  });
useGetCompanyById(params.id)
 

  const changeEventHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setInput({ ...input, file: files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("location", input.location);
    formData.append("website", input.website);
    formData.append("description", input.description);
    if (input.file) formData.append("file", input.file);

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        { withCredentials: true }
      );

      if (res.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        navigate("/admin/companies");
      } else {
        console.error("Update failed:", res.data);
      }
    } catch (error) {
      toast.error('res.data.message')
      console.error(
        "Error updating company:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

   useEffect(()=>{
    setInput({
      name:  singleCompany?.name || "",
    location: singleCompany?.location || "",
    website:singleCompany?.website || "",
    description:singleCompany?.description || "",
    file:singleCompany?.logo || "",
    })
  },[singleCompany])
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-start pt-20 px-4">
        <button
          onClick={() => navigate(-1)}
          className="self-start mb-6 text-gray-700 hover:text-gray-900"
        >
          &larr; Back
        </button>

        <h2 className="text-4xl font-bold text-gray-800 mb-2">Company Setup</h2>
        <p className="text-gray-600 text-lg mb-8">
          Fill in your company details to complete the setup.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={changeEventHandler}
            placeholder="Company Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="location"
            value={input.location}
            onChange={changeEventHandler}
            placeholder="Location"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            name="website"
            value={input.website}
            onChange={changeEventHandler}
            placeholder="Website"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Description"
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={changeEventHandler}
            className="w-full text-gray-700"
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 px-6 py-3 rounded-lg text-white transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetUp;