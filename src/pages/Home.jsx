
import { useEffect } from "react";
import axios from "axios";
import { WorkoutDetails, WorkoutForm } from "../Components/index.js";
import { useWorkoutsContext } from "../Hooks/useWorkoutsContext.js";
import { useAuthContext } from "../Hooks/useAuthContext.js";
import { Navigate } from "react-router-dom";

function Home() {

  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()
  const fetchWorkouts = () => {
   axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workouts`,{
    headers:{
      'Authorization' : `bearer ${user.token}`
    }
   })
   .then((response)=>{
    const response_data = response.data
    dispatch({type : "SET_WORKOUTS", payload : response_data})
   })
   .catch((err)=>{
    console.log("Cannot fetch the data",err);
   })
  };


  useEffect(() => {
    if(user){
      fetchWorkouts();
    }
  
  },[dispatch,user]);

  return ( user ?
    <div className="home flex flex-col md:flex-row">

      <div className="w-full md:w-1/2">
        <WorkoutForm/>
      </div>

      <div className="workouts w-full md:w-2/3">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} /> 
          ))}
      </div>
    </div>
  : <Navigate to='/login'/> );
}

export default Home;
