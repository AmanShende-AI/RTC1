import { createSlice } from "@reduxjs/toolkit";


const companySlice=createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        allCompanies:[],
        searchCompany:"",
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload
        },
        setAllCompanies:(state,action)=>{
            state.allCompanies=action.payload
        },
        setSearchCompany:(state,action)=>{
            state.searchCompany=action.payload
        }
    }
})

export const {setSingleCompany,setAllCompanies,setSearchCompany} = companySlice.actions
export default companySlice.reducer