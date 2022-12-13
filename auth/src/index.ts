import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
dotenv.config();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    //secure: true // commented for test purposes.
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect(""+process.env.DATABASE_URL, {});
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!!!!!!!!`);
  });
};

start();
