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
global.fetch = require("node-fetch");

/**
 * Routes Definitions
 */

// routes
const attendeeRouter = require("./Routes/AttendeeRoute");
const organizersRouter = require("./Routes/OrganizerRoute");
const eventRouter = require("./Routes/EventRoute");
const conversationRouter = require("./Routes/ConversationRoute");
const messageRouter = require("./Routes/MessageRoute");
const venueRouter = require("./Routes/VenueRoute");

// nesting routes
attendeeRouter.use("/:attendeeId/conversations", conversationRouter);
conversationRouter.use("/:conversationId/messages", messageRouter);
organizersRouter.use("/:organizerId/venues", venueRouter);

// configuring routes
app.use("/api/events", eventRouter);
app.use("/api/attendees", attendeeRouter);
app.use("/api/organizers", organizersRouter);

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