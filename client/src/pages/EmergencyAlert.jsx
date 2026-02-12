export default function EmergencyAlert({ level, message }) {
  let styles = "";
  let title = "";

  if (level === "HIGH") {
    styles =
      "bg-red-50 border border-red-400 text-red-700";
    title = "🚨 Emergency Warning";
  } else if (level === "MEDIUM") {
    styles =
      "bg-yellow-50 border border-yellow-400 text-yellow-700";
    title = "⚠️ Health Warning";
  } else {
    styles =
      "bg-green-50 border border-green-400 text-green-700";
    title = "✅ No Immediate Risk";
  }

  return (
    <div className={`${styles} p-4 rounded-xl m-15`}>
      <h3 className="font-bold mb-1">{title}</h3>
      <p>{message}</p>

      {level === "HIGH" && (
        <p className="mt-2 font-semibold">
          Call local emergency services immediately.
        </p>
      )}
    </div>
  );
}
