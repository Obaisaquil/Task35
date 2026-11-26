# Workout Buddy — MERN CRUD + Context

A responsive workout tracker built with React, Context API + `useReducer`, Express, MongoDB and Mongoose.

## Project structure

```text
workout-buddy/
├── backend/
│   ├── config/db.js
│   ├── controllers/workoutController.js
│   ├── models/workoutModel.js
│   ├── routes/workouts.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── WorkoutDetails.jsx
    │   │   └── WorkoutForm.jsx
    │   ├── context/
    │   │   ├── WorkoutContext.jsx
    │   │   └── WorkoutReducer.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## 1. Configure MongoDB

1. Create a MongoDB Atlas cluster and database user.
2. Add your IP address under **Network Access**.
3. Copy your MongoDB connection string.
4. In `backend`, copy `.env.example` to `.env` and replace the URI:

```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/workout-buddy?retryWrites=true&w=majority
```

Do not commit `.env` or share your database credentials.

## 2. Run the backend

```bash
cd backend
npm install
npm run dev
```

The API runs at `http://localhost:4000`.

## 3. Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/workouts` | Get all workouts, newest first |
| POST | `/api/workouts` | Create a workout |
| DELETE | `/api/workouts/:id` | Delete a workout |

Example POST body:

```json
{
  "title": "Chest",
  "load": 15,
  "reps": 30
}
```

The API validates required fields, positive numeric load/reps, and MongoDB IDs. It returns useful error messages and appropriate HTTP status codes.

## Notes

- Workout documents use Mongoose timestamps (`createdAt`, `updatedAt`).
- The frontend stores the global workout list in Context + `useReducer`.
- Successful POST and DELETE requests dispatch reducer actions to update the UI.
- The form displays API and validation errors without reloading the page.
