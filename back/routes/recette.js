const express = require("express");
const router = express.Router();
const recetteCtrl = require("../controllers/recette");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");


router.get("/", recetteCtrl.getAllRecettes);
router.post("/", auth, multer, recetteCtrl.createRecette);
router.get("/:id", recetteCtrl.getOneRecette);
router.put("/:id", auth, multer, recetteCtrl.modifyRecette);
router.put("/:id/titre", auth, recetteCtrl.modifyRecetteText);
router.patch("/:id", auth, recetteCtrl.handleIngredients);
router.patch("/id", auth, recetteCtrl.handleInstructions);
router.patch("/id", auth, recetteCtrl.handleTags);
router.delete("/:id", auth, recetteCtrl.deleteRecette);

module.exports = router;