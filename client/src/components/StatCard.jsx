export default function StatCard({ title, value, sub, tint }) {
  return (
    <div
      className={`p-5 rounded-2xl ${tint || "bg-slate-50"} shadow-sm hover:shadow-md transition`}
    >
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-900 mt-2">
        {value}
      </p>
      {sub && (
        <p className="text-sm text-green-600 mt-1">{sub}</p>
      )}
    </div>
  );
}
