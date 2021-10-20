const router = require("express").Router();
const validation = require('../middlewares/register')
const { login, register } = require("../controllers/users");

router.post("/login", login);
router.post("/register", validation, register);

module.exports = router;
