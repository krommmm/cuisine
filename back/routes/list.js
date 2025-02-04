const express = require("express");
const router = express.Router();
const listCtrl = require("../controllers/list");



router.post("/", listCtrl.createList);
router.get("/", listCtrl.getAllList);
router.put("/:id", listCtrl.modifyList);
router.delete("/:id", listCtrl.deleteList);

module.exports = router; 