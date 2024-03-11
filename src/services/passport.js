import passport from "passport";
import { OAuth2Strategy as MicrosoftGraphAuth } from "passport-oauth2";
import session from "express-session";
import app from "../app.js";
import config from "../config/config.js";

// Configurar sesión de express
app.use(
  session({
    secret: config.secret_key,
    resave: false,
    saveUninitialized: false,
  }),
);

// Inicializar Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia de OAuth 2.0 con Microsoft Graph
passport.use(
  "oauth2",
  new MicrosoftGraphAuth(
    {
      authorizationURL:
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      clientID: config.microsoft_client_id,
      clientSecret: config.microsoft_client_secret,
      callbackURL: "http://localhost:9090/auth/callback",
      scope: ["user.read", "mail.read"], // Especifica los permisos necesarios
    },
    function (accessToken, refreshToken, profile, done) {
      // Puedes guardar el token de acceso en la sesión o en una base de datos
      return done(null, { accessToken: accessToken });
    },
  ),
);

// Ruta de inicio de sesión
app.get("/auth", passport.authenticate("oauth2"));

// Ruta de callback después de iniciar sesión
app.get(
  "/auth/callback",
  passport.authenticate("oauth2", { failureRedirect: "/login" }),
  function (req, res) {
    // Autenticación exitosa, redirigir a la página principal del frontend
    res.redirect("http://localhost:9091");
  },
);

// Ruta protegida
app.get("/", ensureAuthenticated, function (req, res) {
  res.send("Bienvenido a la página protegida");
});

// Middleware para verificar autenticación
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth");
}
