import { useContext } from 'react';
import WorkoutDetails from './components/WorkoutDetails';
import WorkoutForm from './components/WorkoutForm';
import { WorkoutContext } from './context/WorkoutContext';

function App() {
  const { workouts } = useContext(WorkoutContext);

  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Workout Budyyy</h1>
      </header>

      <div className="content-grid">
        <section className="workout-list" aria-label="Your workouts">
          {workouts.length === 0 ? (
            <p className="empty-state">No workouts yet. Add your first workout!</p>
          ) : (
            workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))
          )}
        </section>
        <aside className="form-panel">
          <WorkoutForm />
        </aside>
      </div>
    </main>
  );
}

export default App;
