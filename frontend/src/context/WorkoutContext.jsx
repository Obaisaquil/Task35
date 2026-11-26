import { createContext, useEffect, useReducer } from 'react';
import { workoutReducer } from './WorkoutReducer';

export const WorkoutContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, { workouts: [] });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/workouts`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to load workouts');
        dispatch({ type: 'SET_WORKOUTS', payload: data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch, API_URL }}>
      {children}
    </WorkoutContext.Provider>
  );
};
