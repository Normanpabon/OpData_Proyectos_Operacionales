import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export function UserContextProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [allStatus, setAllStatus] = useState([]);
  const [unit, setUnit] = useState("");
  const opDataRestApi = "http://localhost:8090/opData/API/V1";

  const clearFilters = () => {
    setFilteredProjects(() => [...projects]);
    console.log(filteredProjects);
  };

  const filterProjectsByDate = (dateType, dateFilter, order) => {
    if (dateType === "reg") {
      setFilteredProjects(
        projects.filter((item) =>
          filterProjectsDateOperation(order, dateFilter, item.fecha_reg)
        )
      );
    } else if (dateType === "ini") {
      setFilteredProjects(
        projects.filter((item) =>
          filterProjectsDateOperation(order, dateFilter, item.fecha_ini)
        )
      );
    } else if (dateType === "fin") {
      setFilteredProjects(
        projects.filter((item) =>
          filterProjectsDateOperation(order, dateFilter, item.fecha_fin)
        )
      );
    }
  };

  const filterProjectsDateOperation = (order, dateFilter, date) => {
    if (order == ">") {
      return date.replace("-", "") > dateFilter.replace("-", "");
    } else if (order == "<") {
      return date.replace("-", "") < dateFilter.replace("-", "");
    } else if (order == "=") {
      return date.replace("-", "") === dateFilter.replace("-", "");
    }
  };

  const orderProjectsByDate = (dateType, order) => {
    const sortedArray = [...filteredProjects];
    if (dateType === "reg") {
      sortedArray.sort((a, b) =>
        orderProjectDateOperation(a.fecha_reg, b.fecha_reg, order)
      );
    } else if (dateType === "ini") {
      sortedArray.sort((a, b) =>
        orderProjectDateOperation(a.fecha_ini, b.fecha_ini, order)
      );
    } else if (dateType === "fin") {
      sortedArray.sort((a, b) =>
        orderProjectDateOperation(a.fecha_fin, b.fecha_fin, order)
      );
    }
    console.log(sortedArray);
    setFilteredProjects(sortedArray);
  };

  const orderProjectDateOperation = (a, b, order) => {
    if (order == "asc") {
      if (a.replace("-", "") > b.replace("-", "")) {
        return 1;
      } else if (a.replace("-", "") < b.replace("-", "")) {
        return -1;
      }
      return 0;
    } else if (order == "des") {
      if (a.replace("-", "") > b.replace("-", "")) {
        return -1;
      } else if (a.replace("-", "") < b.replace("-", "")) {
        return 1;
      }
      return 0;
    }
  };

  const filterProjectsByStatus = (status) => {
    setFilteredProjects(projects.filter((item) => item.id_estado == status));
    console.log(filteredProjects);
  };

  const orderProjectsByStatus = (order) => {
    const sortedArray = [...filteredProjects];
    sortedArray.sort((a, b) =>
      orderProjectsOperation(a.id_estado, b.id_estado, order)
    );
    setFilteredProjects(sortedArray);
  };

  const orderProjectsOperation = (a, b, order) => {
    if (order == "asc") {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }
      return 0;
    } else if (order == "des") {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      }
      return 0;
    }
  };

  const filterProjectsByName = (name) => {
    setFilteredProjects(
      projects.filter((item) => item.desc_pro.includes(name))
    );
    console.log(filteredProjects);
  };

  const orderProjectsByName = (order) => {
    const sortedArray = [...filteredProjects];
    sortedArray.sort((a, b) =>
      orderProjectsOperation(a.desc_pro, b.desc_pro, order)
    );
    setFilteredProjects(sortedArray);
  };

  const getProjectsByUnit = async () => {
    try {
      const { data } = await axios.get(
        `${opDataRestApi}/proyectos/unidad/${user.unit}`
      );
      setProjects([...data]);
      setFilteredProjects(
        [...data].sort((a, b) => (a.id_estado > b.id_estado ? 1 : -1))
      );
    } catch (error) {}
  };

  const getAllStatus = async () => {
    try {
      const { data } = await axios.get(`${opDataRestApi}/proyectos/estado/all`);
      setAllStatus(data);
    } catch (error) {}
  };

  const getUnitById = async () => {
    try {
      const { data } = await axios.get(
        `${opDataRestApi}/unidades/${user.unit}`
      );
      setUnit(data.nombre_unidad);
    } catch (error) {}
  };

  const createProject = async (project) => {
    try {
      const {
        desc_pro,
        fecha_fin,
        fecha_ini,
        fecha_reg,
        id_estado,
        observaciones,
      } = project;
      const { data } = await axios.post(
        `${opDataRestApi}/proyectos/${user.unit}/${fecha_reg}/${fecha_ini}/${fecha_fin}/${desc_pro}/${id_estado}/${observaciones}`
      );
      setProjects([...projects, data]);
      setFilteredProjects([
        ...projects.filter((pro) => pro.id !== data.id),
        data,
      ]);
    } catch (error) {}
  };

  const updateProject = async (project) => {
    try {
      var {
        id,
        desc_pro,
        fecha_fin,
        fecha_ini,
        fecha_reg,
        id_estado,
        observaciones,
      } = project;
      let observacionesSend = "";
      if (observaciones == "" || observaciones == undefined) {
        observacionesSend = null;
      } else {
        observacionesSend = observaciones;
      }
      console.log(observaciones);
      const { data } = await axios.put(
        `http://localhost:8090/opData/API/V1/proyectos/${id}/${user.unit}/${fecha_reg}/${fecha_ini}/${fecha_fin}/${desc_pro}/${id_estado}/${observacionesSend}`
      );
      setProjects([...projects.filter((pro) => pro.id !== data.id), data]);
      setFilteredProjects([
        ...projects.filter((pro) => pro.id !== data.id),
        data,
      ]);
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        projects: projects,
        filteredProjects: filteredProjects,
        user: user,
        unit: unit,
        allStatus: allStatus,
        setProjects: setProjects,
        setFilteredProjects: setFilteredProjects,
        setUser: setUser,
        setAllStatus: setAllStatus,
        getProjectsByUnit: getProjectsByUnit,
        getAllStatus: getAllStatus,
        getUnitById: getUnitById,
        filterProjectsByDate: filterProjectsByDate,
        orderProjectsByDate: orderProjectsByDate,
        filterProjectsByStatus: filterProjectsByStatus,
        orderProjectsByStatus: orderProjectsByStatus,
        filterProjectsByName: filterProjectsByName,
        orderProjectsByName: orderProjectsByName,
        clearFilters: clearFilters,
        createProject: createProject,
        updateProject: updateProject,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
