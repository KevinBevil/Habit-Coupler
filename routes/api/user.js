const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/user"
router
  .route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/user/:email"
router
  .route("/:email")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// Matches with "/api/user/habits/:id"
router.route("/habits/:id").put(userController.update);

module.exports = router;
