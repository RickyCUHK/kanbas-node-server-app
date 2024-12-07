import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);
const app = express()
app.use(
  cors({
    credentials: true,
    origin: "https://67415eee043fa300083fff9f--bespoke-donut-101b0d.netlify.app",
  })
);
const sessionOptions = {
secret: process.env.SESSION_SECRET || "kanbas",
resave: false,
saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
sessionOptions.proxy = true;
sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
};
}
app.use(session(sessionOptions));
app.use(express.json());
Lab5(app);
CourseRoutes(app);
UserRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Hello(app);
app.listen(process.env.PORT || 4000)