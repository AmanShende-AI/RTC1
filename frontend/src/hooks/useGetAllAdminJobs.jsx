import axios from "axios";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setAdminJobs } from "../redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/getadminjobs`,
          { withCredentials: true }
        );

        if (res.data?.success) {
          dispatch(setAdminJobs(res.data.jobs || []));
        }
      } catch (error) {
        console.error(
          "Error fetching admin jobs:",
          error.response?.data || error.message
        );
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;