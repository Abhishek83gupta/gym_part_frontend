import { createContext, useReducer} from "react"

export const WorkoutsContext = createContext()

const initialState = {
    workouts : null,
}

export const workoutsReducer = (state,action)=> {
  switch(action.type){
    case 'SET_WORKOUTS': 
    return {
        workouts:action.payload
    }

    case 'CREATE_WORKOUT':
    return {
        workouts :[action.payload, ...state.workouts]
    }  
    
    case 'DELETE_WORKOUT':
      return {
          workouts :state.workouts.filter((w)=> w._id !== action.payload._id )
      }

    default :
    return state
  }
}

export const WorkoutContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(workoutsReducer, initialState)       // Similar to useState 
                                                                             // reducer fun, on different different action how state is going to updates
    // console.log(state)
    return (                                                           // dispatch to update workoutsReducer and state which conatain previous all data
        <WorkoutsContext.Provider value={{...state, dispatch}}>          
         {children}
        </WorkoutsContext.Provider>
    )
  }