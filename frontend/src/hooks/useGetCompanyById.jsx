import axios from "axios"
import { useEffect } from "react"
import { COMPANY_API_END_POINT } from "../utils/constants"
import { setSingleCompany } from "../redux/companySlice"
import { useDispatch } from "react-redux"


const useGetCompanyById = (companyId) => {
    const dispatch=useDispatch()
    useEffect(() => {
        const fetchCompanyById = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }

        fetchCompanyById()
    },[dispatch,companyId])
}
export default useGetCompanyById