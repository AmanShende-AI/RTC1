import axios from "axios"
import { useEffect } from "react"
import { COMPANY_API_END_POINT } from "../utils/constants"
import { setAllCompanies} from "../redux/companySlice"
import { useDispatch } from "react-redux"


const useGetAllCompanies = () => {
    const dispatch=useDispatch()
    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllCompanies(res.data.companies));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }

        fetchAllCompanies()
    },[dispatch])
}
export default useGetAllCompanies