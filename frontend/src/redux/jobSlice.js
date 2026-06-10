import { createSlice } from "@reduxjs/toolkit";

const jobSlice= createSlice({
    name:'job',
    initialState:{
allJobs:[],
singleJob:null,
adminJobs:[],
searchJobByText:"",
appliedJobs:[]
    },
    reducers:{
setAllJobs:(state,action)=>{
    state.allJobs=action.payload
},
setSingleJob:(state,action)=>{
    state.singleJob=action.payload
},
setAdminJobs:(state,action)=>{
    state.adminJobs=action.payload
},
setSearchJobByText:(state,action)=>{
    state.searchJobByText=action.payload
},
setAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload
        },
    }
})

export const {setAllJobs,setSingleJob,setAdminJobs,setSearchJobByText, setAppliedJobs}= jobSlice.actions;
export default jobSlice.reducer