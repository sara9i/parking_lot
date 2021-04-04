/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import * as morgan from "morgan"
import { carsRouter } from "./routes/cars.router";


dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;

 
 const app = express();

/**
 *  App Configuration
 */

app.use(express.json());
app.use("/api/v1/cars", carsRouter);



/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });