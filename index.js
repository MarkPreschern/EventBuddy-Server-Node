/**
 * Required External Modules
 */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

/**
 * App Variables
 */
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/EventBuddy";

/**
 * Routes Definitions
 */

// events
const event = require("./routes/EventRoute");
app.use("/api/events", event);

// attendees
const attendee = require("./routes/AttendeeRoute");
app.use("/api/attendees", attendee);

// organizers
const organizers = require("./routes/OrganizerRoute");
app.use("/api/organizers", organizers);

/**
 * Database Connection
 */
mongoose.connect(mongoURL, {
                     useNewUrlParser: true,
                     useFindAndModify: false,
                     useCreateIndex: true,
                     useUnifiedTopology: true
                 },(err) => {
                     if (err) {
                         process.exit(1);
                         console.log("unable to connect to database")
                     }
                 })
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.log(error));

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});