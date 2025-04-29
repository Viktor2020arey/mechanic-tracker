const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  startSession,
  pauseSession,
  stopSession,
  addComment,
  getMySessions,
} = require("../controllers/sessionController");

router.post("/start", auth(["mechanic"]), startSession);
router.patch("/:id/pause", auth(["mechanic"]), pauseSession);
router.patch("/:id/stop", auth(["mechanic"]), stopSession);
router.patch("/:id/comment", auth(["mechanic"]), addComment);
router.get("/", auth(["mechanic"]), getMySessions);

module.exports = router;
