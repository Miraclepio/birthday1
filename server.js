const express = require("express");
const cors=require('cors')


require("./config/db");
const router = require('./router/userRoute');
const todoRouter = require('./router/todoRouter');

const port = process.env.PORT || 3000; // Use 3000 as a default port if not specified
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(router);
app.use(todoRouter);

// Example route handler for a runtime error
app.get("/error", (req, res, next) => {
  const error = new Error("Something went wrong!");
  next(error); // Pass the error to the error-handling middleware
});

// Catch-all route handler for undefined routes
app.all("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});


 

// Start the server
app.listen(port, () => {
  console.log(`My app is listening on port ${port}`);
});
 