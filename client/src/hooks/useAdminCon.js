import { useContext } from "react";
import { AdminContext } from "../contexts/adminContext";

 const useAdmin = () => useContext(AdminContext);
 export default useAdmin;