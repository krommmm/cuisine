const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");


router.post("/signUp", userCtrl.signUp);
router.post("/login", userCtrl.login);
router.get("/", auth, multer, userCtrl.myProfil);
router.put("/forgot", userCtrl.forgotPassword);
router.put("/change", userCtrl.changePassword);
router.post("/", userCtrl.isTokenValid);
router.get("/:id", userCtrl.userById);
router.put("/", auth,multer,userCtrl.modifyUser);
router.delete("/", auth, multer,userCtrl.deleteUser);

module.exports = router;
