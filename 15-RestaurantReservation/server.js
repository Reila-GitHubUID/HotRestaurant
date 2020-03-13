// Dependencies
// =============================================================
let express = require("express");
let path = require("path");

// Sets up the Express App
// =============================================================
let app = express();
let PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables and waitlists
// =============================================================
let tables = [];
let waitLists = [];
const maxReservation = 5;


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "assets/reserve.html"));
});

// Return your tables Array object
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Return your waitLists Array object 
app.get("/api/waitlist", function(req, res) {
  return res.json(waitLists);
});

// Create New tables - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  let newReservation = req.body;
  console.log(newReservation);

  if (tables.length < maxReservation)
    tables.push(newReservation);
  else 
    waitLists.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log(`App listening on http://localhost:${PORT}`);
});
