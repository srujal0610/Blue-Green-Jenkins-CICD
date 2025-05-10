// import express from "express"
// import bodyParser from "body-parser"
// import cors from "cors"
// import cookieParser from "cookie-parser"

// const app = express()

// // app.use(cors({
// //     // origin: process.env.CORS_ORIGIN,
// //     // credentials: true
// //     origin: "*", // Allow all origins (Not recommended for production)
// //     credentials: true,
// //     methods: "GET,POST,PUT,DELETE",
// //     allowedHeaders: ["Content-Type", "Authorization"]
// // }))

// const express = require('express')
// const cors = require('cors')
// const app = express()

// app.use(cors({
//   origin: "*", 
//   credentials: true,
//   methods: "GET,POST,PUT,DELETE",
//   allowedHeaders: ["Content-Type", "Authorization"]
// }))

// app.options('*', cors())  // <- handle preflight requests






// app.use(cookieParser())
// app.use(express.json({limit:"16kb"}))
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))




// import userRouter from './routes/user.routes.js'
// import managerRouter from './routes/manager.routes.js'
// import workerRouter from './routes/worker.routes.js'
// import diamondRouter from './routes/diamond.routes.js'


// app.use("/api/v1/users", userRouter)
// app.use("/api/v1/manager", managerRouter)
// app.use("/api/v1/worker",workerRouter)
// app.use("/api/v1/diamond",diamondRouter)


// export { app }

// export default app







import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"

import userRouter from './routes/user.routes.js'
import managerRouter from './routes/manager.routes.js'
import workerRouter from './routes/worker.routes.js'
import diamondRouter from './routes/diamond.routes.js'

const app = express()

// ✅ CORS setup with preflight support
app.use(cors({
  origin: "*",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.options("*", cors()) // preflight

// ✅ Middlewares
app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// ✅ Routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/manager", managerRouter)
app.use("/api/v1/worker", workerRouter)
app.use("/api/v1/diamond", diamondRouter)

// ✅ Export for usage in server.js
export { app }
export default app

















