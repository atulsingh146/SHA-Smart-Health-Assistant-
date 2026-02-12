const KEY = "health-tracker-data";

export function getHealthData() {
  return JSON.parse(localStorage.getItem(KEY)) || {};
}

export function saveHealthData(date, data) {
  const existing = getHealthData();
  existing[date] = data;
  localStorage.setItem(KEY, JSON.stringify(existing));
}
