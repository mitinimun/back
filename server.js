import express from "express";
import http from "http";
import databaseCon from "./config/databaseCon.js";
import delegateRoutes from "./routes/delegateRoutes.js";
import dotenv from "dotenv"
import { errorHandler, routeNotFound } from "./middlewares/error.js";
import cors from "cors";
import ocRoutes from "./routes/ocRoutes.js";
import committeeRoutes from "./routes/committeeRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();
app.use(cors());

// database connection
databaseCon();
// dotenv.config({ path: "C:/Users/asher/Documents/Projects/mitini-mun/backend/.env"});
dotenv.config()
app.use(express.json())

const PORT = process.env.PORT;

//routes
app.use("/api/delegates", delegateRoutes);
app.use("/api/oc", ocRoutes);
app.use("/api/committees", committeeRoutes);
app.use("/api/posts", postRoutes)

app.use(errorHandler);
app.use(routeNotFound);

const server = http.createServer(app)
server.listen(PORT, console.log(`Server is running on port: ${PORT}`))