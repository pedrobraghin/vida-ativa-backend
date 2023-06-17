import express from "express";
import router from "../routes/index.routes";
import limiter from "express-rate-limit";
import sanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import notFound from "../routes/notFound.routes";
import errorHandler from "../middlewares/errorHandler";

const app = express();

const BASE_API_URL = String(process.env.BASE_API_URL);

const corsOptions: CorsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(sanitize());

app.use(
  limiter({
    max: 100,
  })
);

app.use(BASE_API_URL, router);
app.all("*", notFound);
app.use(errorHandler);

export default app;
