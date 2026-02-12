import { createContext, useContext, useState } from "react";

const RiskContext = createContext();

export function RiskProvider({ children }) {
  const [riskLevel, setRiskLevel] = useState("LOW");

  return (
    <RiskContext.Provider value={{ riskLevel, setRiskLevel }}>
      {children}
    </RiskContext.Provider>
  );
}

export function useRisk() {
  return useContext(RiskContext);
}
