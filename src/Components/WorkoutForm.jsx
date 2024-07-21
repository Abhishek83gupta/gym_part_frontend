
import React, { useState } from "react";
import axios from 'axios'
import {useWorkoutsContext} from '../Hooks/useWorkoutsContext.js'
import { useAuthContext } from "../Hooks/useAuthContext.js";

function WorkoutForm() {
  const {dispatch} = useWorkoutsContext()
  const {user} =useAuthContext()

  const [title, setTitle] = useState("");
  const [load, setload] = useState("");
  const [reps, setreps] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setError('You must be logged in')
      return
    }

    const workout = { title, load, reps };

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/workouts`,workout,{
      headers:{
        'Authorization' : `Bearer ${user.token}`
      }
    })
     .then((response)=>{
      const response_data = response.data
      
      if (response.status === 200) {
              setTitle("");
              setload("");
              setreps("");
              setError(null);
              console.log("New workout added",response_data);
              dispatch({type: 'CREATE_WORKOUT', payload:response_data})
            }
     })
     .catch((err)=>{
      setError(err.response.data.error)
     })
  };

  return (
    <div className="w-full flex justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full md:w-96 m-8">
        <h3 className="font-bold text-xl mb-4">Add a New Workout</h3>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Exercise Title:
          </label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Load (in kg):
          </label>
          <input
            type="number"
            onChange={(e) => setload(e.target.value)}
            value={load}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Reps:</label>
          <input
            type="number"
            onChange={(e) => setreps(e.target.value)}
            value={reps}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Workout
        </button>

        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}

export default WorkoutForm;
