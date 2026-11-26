import { useContext, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { WorkoutContext } from '../context/WorkoutContext';

const relativeTime = (dateValue) => {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(dateValue).getTime()) / 1000));
  if (!Number.isFinite(seconds)) return 'just now';
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `about ${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `about ${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `about ${months} month${months === 1 ? '' : 's'} ago`;
  const years = Math.floor(days / 365);
  return `about ${years} year${years === 1 ? '' : 's'} ago`;
};

const WorkoutDetails = ({ workout }) => {
  const { dispatch, API_URL } = useContext(WorkoutContext);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setDeleting(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/workouts/${workout._id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not delete workout');
      dispatch({ type: 'DELETE_WORKOUT', payload: data });
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  return (
    <article className="workout-card">
      <div className="workout-copy">
        <h3>{workout.title}</h3>
        <p><strong>Load (in Kgs):</strong> {workout.load}</p>
        <p><strong>Reps:</strong> {workout.reps}</p>
        <span className="created-time">{relativeTime(workout.createdAt)}</span>
        {error && <p className="card-error">{error}</p>}
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        aria-label={`Delete ${workout.title}`}
        title="Delete workout"
      >
        <Trash2 size={16} />
      </button>
    </article>
  );
};

export default WorkoutDetails;
