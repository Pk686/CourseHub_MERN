const express = require("express");
const router = express.Router();
//const {home,register,login} = require("../controllers/auth-controller");
const authControllers = require("../controllers/auth-controller");
const validators = require("../validators/auth_validator");
const validate  = require("../middlwares/auth_middleware");
const authMiddlware = require("../middlwares/authMiddlware");

router.route("/").get(authControllers.home);
router.route("/register").post(validate(validators.signupSchema),authControllers.register);
router.route("/login").post(validate(validators.loginSchema),authControllers.login);
router.route("/user").get(authMiddlware,authControllers.user);

// router.get("/",(req,res) => {
//     res.status(200).send("The message is clear");
// });
// router.get("/register",(req,res) => {
//     res.status(200).send("The message is sent successfully");
// });

module.exports = router;

