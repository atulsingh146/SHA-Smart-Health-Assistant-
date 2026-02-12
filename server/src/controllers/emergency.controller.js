export function getEmergency(req, res) {
  res.json({
    ok: true,
    rules: [
      "Chest pain → Call emergency immediately.",
      "Breathing difficulty → Seek urgent care.",
      "Severe bleeding → Apply pressure and go to hospital.",
    ],
  });
}
