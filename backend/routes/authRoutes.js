const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const {
  signup,
  verifyEmail,
  login,
  logout,
  checkAuth,
  checkEmail,
  getMe,
} = require("../controllers/authController");

// Google Auth
const passport = require("passport");
const session = require("express-session");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const router = express.Router();


router.post("/signup", signup);
router.post("/verifyemail", verifyEmail);
router.post("/login", login);
router.post("/check-email", checkEmail);
router.post("/logout", logout);
router.get("/check-auth", verifyToken, checkAuth)
router.get("/me",  getMe)

// Google Auth session setup
router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

router.use(passport.initialize());
router.use(passport.session());

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000");
  }
);

// Google Auth

module.exports = router;