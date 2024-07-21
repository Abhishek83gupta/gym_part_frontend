import { useWorkoutsContext } from '../Hooks/useWorkoutsContext.js'
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext.js';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
function WorkoutDetails({ workout }) {

  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()
   
    const handleClick = async () => {
      try {
        if(!user){
          return
        }

        const response = await axios.delete('/api/workouts/' + workout._id, {
          headers:{
            'Authorization' : `Bearer ${user.token}`
          }
        });
        
        if (response.status === 200) {
          const response_data = response.data;
          dispatch({ type: 'DELETE_WORKOUT', payload: response_data });
        }
      } catch (err) {
        console.error('Error deleting workout:', err);
      }
    };

  return (
    <div className='mx-4 md:mx-40 my-10 p-5 bg-[#fff] rounded-lg shadow'>
       <h4 className='font-bold text-[#1aac83] '>{workout.title}</h4>
       <p> <strong> Load (kg) :</strong> {workout.load}</p>
       <p><strong> Reps :</strong> {workout.reps}</p>
       <p>{formatDistanceToNow(new Date (workout.createdAt))}</p>
       <button className='mt-4 w-full md:w-20 border border-black-600 rounded-2xl px-3 py-2 bg-red-600 text-white'
       onClick={handleClick}> delete </button>
    </div>
  ) 
}

export default WorkoutDetails
