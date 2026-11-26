const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

// GET /api/workouts — newest workouts first
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    return res.status(200).json(workouts);
  } catch (error) {
    return res.status(500).json({ error: 'Could not fetch workouts' });
  }
};

// POST /api/workouts
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const errors = {};
  if (typeof title !== 'string' || !title.trim()) {
    errors.title = 'Exercise title is required';
  }
  if (load === undefined || load === '' || !Number.isFinite(Number(load)) || Number(load) <= 0) {
    errors.load = 'Load must be a number greater than 0';
  }
  if (reps === undefined || reps === '' || !Number.isInteger(Number(reps)) || Number(reps) < 1) {
    errors.reps = 'Reps must be a whole number greater than 0';
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ error: 'Please fix the highlighted fields', fields: errors });
  }

  try {
    const workout = await Workout.create({
      title: title.trim(),
      load: Number(load),
      reps: Number(reps)
    });
    return res.status(201).json(workout);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const fields = {};
      Object.values(error.errors).forEach((item) => {
        fields[item.path] = item.message;
      });
      return res.status(400).json({ error: 'Workout validation failed', fields });
    }
    return res.status(500).json({ error: 'Could not create workout' });
  }
};

// DELETE /api/workouts/:id
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid workout ID' });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    return res.status(200).json(workout);
  } catch (error) {
    return res.status(500).json({ error: 'Could not delete workout' });
  }
};

module.exports = { getWorkouts, createWorkout, deleteWorkout };
