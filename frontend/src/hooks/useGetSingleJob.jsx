// import axios from "axios";
// import { useEffect } from "react";
// import { JOB_API_END_POINT } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { setSingleJob } from "../redux/jobSlice";

// const useGetSingleJob = (jobId) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!jobId) return;

//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(
//           `${JOB_API_END_POINT}/get/${jobId}`,
//           { withCredentials: true }
//         );

//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//         }
//       } catch (error) {
//         console.error("Error fetching job:", error);
//       }
//     };

//     fetchSingleJob();
//   }, [jobId, dispatch]);
// };

// export default useGetSingleJob;