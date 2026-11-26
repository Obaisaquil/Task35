import { useContext, useState } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';

const WorkoutForm = () => {
  const { dispatch, API_URL } = useContext(WorkoutContext);
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, load, reps })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Unable to add workout');
        setFieldErrors(data.fields || {});
        return;
      }

      dispatch({ type: 'ADD_WORKOUT', payload: data });
      setTitle('');
      setLoad('');
      setReps('');
    } catch (err) {
      setError('Cannot connect to the server. Check that the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit} noValidate>
      <h2>Add a New Workout</h2>

      <label htmlFor="title">Exercise Title:</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="e.g. Chest"
        aria-invalid={Boolean(fieldErrors.title)}
      />
      {fieldErrors.title && <small className="field-error">{fieldErrors.title}</small>}

      <label htmlFor="load">Load (in Kgs):</label>
      <input
        id="load"
        type="number"
        min="0.1"
        step="0.1"
        value={load}
        onChange={(event) => setLoad(event.target.value)}
        placeholder="e.g. 15"
        aria-invalid={Boolean(fieldErrors.load)}
      />
      {fieldErrors.load && <small className="field-error">{fieldErrors.load}</small>}

      <label htmlFor="reps">Reps:</label>
      <input
        id="reps"
        type="number"
        min="1"
        step="1"
        value={reps}
        onChange={(event) => setReps(event.target.value)}
        placeholder="e.g. 30"
        aria-invalid={Boolean(fieldErrors.reps)}
      />
      {fieldErrors.reps && <small className="field-error">{fieldErrors.reps}</small>}

      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="add-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Workout'}
      </button>
    </form>
  );
};

export default WorkoutForm;
