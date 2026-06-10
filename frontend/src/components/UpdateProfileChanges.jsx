import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constants";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const UpdateProfileChanges = ({ setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    skills: user?.profile?.skills?.join(", ") || "",
    bio: user?.profile?.bio || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const result = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (result.data.success) {
        toast.success("Profile updated successfully");
        dispatch(setUser(result.data.user));
        setOpen(false);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Update Profile
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          
          <input
            type="text"
            name="fullName"
            value={input.fullName}
            onChange={changeEventHandler}
            placeholder="Full Name"
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="Email"
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="tel"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="Phone Number"
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            name="skills"
            value={input.skills}
            onChange={changeEventHandler}
            placeholder="Skills (comma separated)"
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            name="bio"
            value={input.bio}
            onChange={changeEventHandler}
            placeholder="Bio"
            className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="file"
            onChange={changeFileHandler}
            className="px-4 py-2 rounded-lg border file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white"
          />

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-full"
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 border border-gray-300 py-2 rounded-full"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProfileChanges;