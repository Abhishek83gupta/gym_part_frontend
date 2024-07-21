import { useContext } from 'react'
import { WorkoutsContext } from '../context/WorkoutContext.jsx'

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)


  if(!context){
    throw Error('useWorkoutContext must be used inside an WorkoutsContextProvider')
  }
 return context
}


