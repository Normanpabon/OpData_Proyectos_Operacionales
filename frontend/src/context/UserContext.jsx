import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export function UserContextProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState("1");

  const getProjectsByUnit = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8090/prodata/API/V1/proyectos/unidad/${user}`
      );
      setProjects(data);
    } catch (error) {}
  };
  useEffect(() => {
    getProjectsByUnit();
  }, []);

  const createProject = async (proyect) => {
    try {
      const response = await axios.post(
        "http://localhost:8090/prodata/API/V1/proyectos/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}"
      );
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        projects: projects,
        user: user,
        getProjectsByUnit: getProjectsByUnit,
        createProject: createProject,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
