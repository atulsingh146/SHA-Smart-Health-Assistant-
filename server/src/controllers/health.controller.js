import HealthLog from "../models/HealthLog.js";
export async function saveDaily(req, res) {
  try {
    const { date, sleepHours, waterGlasses, mood, temperature } = req.body;

    const log = await HealthLog.findOneAndUpdate(
      { userId: req.user.id, date },
      {
        userId: req.user.id,
        date,
        sleepHours,
        waterGlasses,
        mood,
        temperature,
      },
      { upsert: true, new: true },
    );

    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getHistory(req, res) {
  const logs = await HealthLog.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  res.json(logs);
}
