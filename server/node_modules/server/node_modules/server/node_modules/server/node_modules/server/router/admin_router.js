const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const authMiddlware = require("../middlwares/authMiddlware");
const adminMiddleware = require("../middlwares/admin_middleware");


router.route("/users").get(authMiddlware,adminMiddleware,adminController.getUsers);
router.route("/users/:id").get(authMiddlware,adminMiddleware,adminController.getUserByID);
router.route("/users/update/:id").patch(authMiddlware,adminMiddleware,adminController.updateUserByID);
router.route("/contacts").get(authMiddlware,adminMiddleware,adminController.getContacts);
router.route("/users/delete/:id").delete(authMiddlware,adminMiddleware,adminController.deleteUserByID);
router.route("/contacts/delete/:id").delete(authMiddlware,adminMiddleware,adminController.deleteContactByID);

module.exports = router;