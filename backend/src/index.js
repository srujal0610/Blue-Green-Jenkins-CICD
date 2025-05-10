// import dotenv from "dotenv"
// import app from "./app.js"
// import connectDB from "./db/index.js"

// dotenv.config({
//     path:"./.env"
// })

// connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`Application is running at : ${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log("MONGODB connection failed");
// })

import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

// Load environment variables
dotenv.config({ path: "./.env" });

// Ensure PORT is set correctly
const port = process.env.PORT || 8000;

// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`✅ Application is running at : ${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ MONGODB connection failed:", err);
        process.exit(1); // Exit the process if DB connection fails
    });
