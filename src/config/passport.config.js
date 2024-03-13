import { Passport } from "passport";
import OAuth2Strategy from "passport-oauth2";
import config from "./config.js";

// Configurar estrategia de OAuth 2.0 con Microsoft Graph
const microsoftGraphAuth = new OAuth2Strategy(
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
  }
);

const passport = new Passport();
passport.use(
  "oauth2",
  microsoftGraphAuth
);

export default passport;
