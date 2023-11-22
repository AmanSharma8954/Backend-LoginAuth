const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth");
const { auth, isStudent, isAdmin } = require("../middleware/authN");

router.post("/login", login);
router.post("/signup", signup);

//testing protected routes for singlt middlware
router.get("/test", auth, (req,res) => {
    res.json({
        success: true,
        message: "Welcome to protected route for TESTS"
    })
})

// protected Route
router.get("/student", auth , isStudent , (req,res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected Route",
    })
})

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected Route",
  });
});

module.exports = router;
