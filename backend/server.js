require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const workoutRoutes = require('./routes/workouts');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Workout Buddy API is running' }));
app.use('/api/workouts', workoutRoutes);

// JSON parsing errors and unexpected errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON request body' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Something went wrong on the server' });
});

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  });
