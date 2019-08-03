const router = require("express").Router();
const userRoutes = require("./user");
const habitRoutes = require("./habit");

// routes
router.use("/user", userRoutes);
router.use("/habit", habitRoutes);

module.exports = router;
