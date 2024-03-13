import { Router } from "express";
import passport from "../config/passport.config.js";
import { ensureAuthenticated } from "../middlewares/auth.passport.js";

const router = Router();

// Ruta de inicio de sesión
router.post("/auth", passport.authenticate("oauth2"));

// Ruta de callback después de iniciar sesión
router.get(
  "/auth/callback",
  passport.authenticate("oauth2", { failureRedirect: "/login" }),
  (req, res) => {
    // Autenticación exitosa, redirigir a la página principal del frontend
    res.redirect("http://localhost:9090/");
  }
);

// Ruta protegida
router.get("/", ensureAuthenticated, function (req, res) {
  res.send("Bienvenido a la página protegida");
});

export default router;
