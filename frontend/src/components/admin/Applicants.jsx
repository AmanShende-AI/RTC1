import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICANTION_API_END_POINT } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "../../redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICANTION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        dispatch(setApplicants(res.data.applications)); // ✅ correct
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplicants();
  }, [dispatch, params.id]); // ✅ fix

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4">
        <h1 className="font-bold text-xl my-5 text-black">
          Applicants ({applicants?.length}) 
        </h1>

        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;