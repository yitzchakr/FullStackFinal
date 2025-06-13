import { useState,createContext,useCallback } from "react";
import api from '../api/axios'; // your custom axios instance

export const managerContext = createContext();

export const ManagerProvider = ({ children }) => {
     const [managerData, setManagerData] = useState({});
   
    const fetchManagerData = useCallback(async () => {
      
      try {
        const response = await api.get('/manager/');
        setManagerData(response.data);
      } catch (error) {
        console.error('Error fetching manager data:', error);
      }
    }, []);

    const { caseworkers = [], unassignedRequests = [] } = managerData.data || {};
    const value ={setManagerData,
      managerData,
      fetchManagerData,
      caseworkers,
      unassignedRequests
    };
    return (
        <managerContext.Provider value={value}>
            {children}
        </managerContext.Provider>
    );
}
