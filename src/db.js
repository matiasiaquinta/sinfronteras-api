const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://matias:E41XAmNjkgG4bjZR@sinfronteras-api.5lqm1.mongodb.net/sinfronteras-api"
    )
    .then(() => {
        console.log("MongoDB is connected");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
