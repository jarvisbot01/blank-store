



// Middleware para verificar autenticación
export const ensureAuthenticated = (req, res, next) => {  
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth");
};