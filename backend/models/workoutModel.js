const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter an exercise title'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [60, 'Title cannot exceed 60 characters']
    },
    load: {
      type: Number,
      required: [true, 'Please enter the load in kilograms'],
      min: [0.1, 'Load must be greater than 0']
    },
    reps: {
      type: Number,
      required: [true, 'Please enter the number of reps'],
      min: [1, 'Reps must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Reps must be a whole number'
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', workoutSchema);
