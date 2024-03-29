/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import { mainRouter } from "./routes/main.router";
import { rateLimit } from "./middleware/rate-limit.middleware";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../docs/swagger.json";


dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  console.error("PORT NOT DEFINED");
  process.exit(1);
}
if (!process.env.PARKING_LOT_SIZE) {
  console.error("PARKING_LOT_SIZE NOT DEFINED");
  process.exit(1);
}

 
 const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;

 
 const app = express();

/**
 *  App Configuration
 */

app.use(express.json());
app.use(rateLimit);
app.use("/api/v1", mainRouter);

//adding swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });