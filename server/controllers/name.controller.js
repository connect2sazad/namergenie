const AI = require('../services/ai.service');

exports.generateName = async (req, res, next) => {
  try {
    const { idea } = req.body;

    if (!idea) {
      return res.status(400).json({ success: false, message: "Idea is required" });
    }

    const name = await AI.generateName(idea);

    res.status(200).json({ success: true, name });
  } catch (error) {
    next(error);
  }
};
