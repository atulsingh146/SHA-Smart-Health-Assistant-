import { useEffect, useState } from "react";
import { getSymptomHistory } from "../services/aiService";

export default function SymptomHistorySidebar() {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSymptomHistory();
        setHistory(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <>
      <div className=" h-fit max-h-[600px] overflow-y-auto  bg-gradient-to-br from-violet-50 to-white  rounded-3xl p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          Recent Checks
        </h2>

        {history.length === 0 && (
          <p className="text-slate-500 text-sm">
            No history yet.
          </p>
        )}

        {history.slice(0, 10).map((item) => (
          <div
            key={item._id}
            onClick={() => setSelected(item)}
            className="border-b last:border-none pb-3 mb-3 cursor-pointer hover:bg-slate-50 rounded-lg p-2 transition  bg-gradient-to-br from-violet-50 to-white  rounded-3xl p-4 shadow-md"
          >
            <p className="font-medium text-sm">
              {item.symptoms}
            </p>

            <p className="text-xs text-slate-500">
              Severity: {item.severity} | {item.duration}
            </p>

            <p className="text-xs text-slate-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl relative  bg-gradient-to-br from-violet-50 to-white  rounded-3xl p-4 shadow-md">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-4 text-slate-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Symptom Details
            </h2>

            <p className="mb-3">
              <strong>Symptoms:</strong> {selected.symptoms}
            </p>

            <p className="mb-3">
              <strong>Severity:</strong> {selected.severity}
            </p>

            <p className="mb-3">
              <strong>Duration:</strong> {selected.duration}
            </p>

            <p className="mb-3">
              <strong>Possible Causes:</strong>
              <br />
              {selected.causes}
            </p>

            <p>
              <strong>Advice:</strong>
              <br />
              {selected.advice}
            </p>

          </div>
        </div>
      )}
    </>
  );
}
