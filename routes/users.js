const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");
const { auth } = require("../middlewares/auth");
const { validateProfileUpdate } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateProfileUpdate, updateProfile);

module.exports = router;
