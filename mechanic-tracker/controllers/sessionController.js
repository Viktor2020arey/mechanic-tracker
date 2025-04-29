const Session = require("../models/Session");

exports.startSession = async (req, res) => {
  const { carId } = req.body;
  const newSession = await Session.create({
    car: carId,
    mechanic: req.user.id,
    startTime: new Date(),
    status: "active",
  });
  res.status(201).json(newSession);
};

exports.pauseSession = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session || session.mechanic.toString() !== req.user.id)
    return res.sendStatus(404);
  session.status = "paused";
  await session.save();
  res.json(session);
};

exports.stopSession = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session || session.mechanic.toString() !== req.user.id)
    return res.sendStatus(404);
  session.status = "stopped";
  session.endTime = new Date();
  await session.save();
  res.json(session);
};

exports.addComment = async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session || session.mechanic.toString() !== req.user.id)
    return res.sendStatus(404);
  session.comment = req.body.comment;
  await session.save();
  res.json(session);
};

exports.getMySessions = async (req, res) => {
  const sessions = await Session.find({ mechanic: req.user.id }).populate(
    "car"
  );
  res.json(sessions);
};
