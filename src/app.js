import express from "express";
import passport from "./config/passport.config.js";
import session from "express-session";
import config from "./config/config.js";
import router from "./routes/routes.passport.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
// Configurar sesión de express
app.use(
  session({
    secret: config.secret_key,
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializar Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/passport", router);

export default app;
