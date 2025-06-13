import { useContext } from "react";
import { managerContext } from "../contexts/managerContext";
export const useManagerContext = () => {
  const context = useContext(managerContext);
  if (!context) {
    throw new Error("useManager must be used within a ManagerProvider");
  }
  return context;
}