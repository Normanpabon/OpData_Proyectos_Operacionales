import { createContext, useContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export function UserContextProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [disabledUsers, setDisabledUsers] = useState(false);
  const [disabledUnits, setDisabledUnits] = useState(false);
  const [disabledStatus, setDisabledStatus] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState([]);
  const [unit, setUnit] = useState("");
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const opDataRestApi = "http://192.168.2.138:8090/opData/API/V2";
  const [alert, setAlert] = useState(" hidden");
  const [userTitle, setUserTitle] = useState("Proyectos Activos");

  const clearFilters = () => {
    setFilteredProjects(() => [...projects]);
  };

  const formatDate = (fecha) => {
    let formatedDate;
    if (typeof fecha == "object") {
      formatedDate = new Date(`${fecha[0]}/${fecha[1]}/${fecha[2]}`);
    } else {
      formatedDate = new Date(
        `${fecha.slice(0, 4)}/${fecha.slice(5, 7)}/${fecha.slice(8)}`
      );
    }

    return formatedDate;
  };

  const userAuth = async (user, password) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${opDataRestApi}/login`,
        headers: {},
        data: { username: user, password: password },
      });
      setToken(data.token);
      const userGet = await axios({
        method: "get",
        url: `${opDataRestApi}/users/username/${user}`,
        headers: { Authorization: `Opdata ${data.token}` },
      });
      const { nombre, apellido, rol, cod_ins } = userGet.data;
      const unit = await axios({
        method: "get",
        url: `${opDataRestApi}/unidades/jefe/${cod_ins}`,
        headers: { Authorization: `Opdata ${data.token}` },
      });
      setUser({
        nombre: nombre,
        apellido: apellido,
        rol: rol,
        nombre_unidad: unit.data.nombre_unidad,
        id_unidad: unit.data.id,
        cod_ins: cod_ins,
      });
      return [rol, true];
    } catch (error) {
      return error;
    }
  };

  const getUnitById = async () => {
    try {
      const { data } = await axios.get(
        `${opDataRestApi}/unidades/${user.id_unidad}`
      );
      setUnit(data.nombre_unidad);
    } catch (error) {}
  };

  //Obtener proyectos mostrados
  {/**Todo: Esta mandando todos los proyectos, no solo los mostrados actualmente al usuario */}
  const returnShowedProjects = () => {


    // Crear una variable global que contenga una copia del arreglo de proyectos luego de cada filtro

    var parsedProjects = parseProjects(filteredProjects);
    return parsedProjects;
  }

  // Crear metodo para parsear arreglo de proyectos, agregando el nombre del estado y unidad donde tiene su id respectivo

  // Quitar tambien el id del proyecto, pues no se requiere ese dato

  const parseProjects = (projectList) => {
    
    // recuperar nombre unidad y estado e iterar cambian la lista, 

    var parsedProjects = [];

    var keysArray = [];
    for (const key in allStatus) {
      if (allStatus[key]) {
        keysArray.push(key);
      }
    }

    for(const i in projectList){
      
      
      //var tmpProject = projectList[i];
      var tmpProject = {};
      
      // Pedir datos requeridos y guardar
      var tmpProjectFromList = projectList[i];
      tmpProject.fecha_registro = tmpProjectFromList.fecha_reg;
      tmpProject.fecha_inicio = tmpProjectFromList.fecha_ini;
      tmpProject.fecha_finalizacion = tmpProjectFromList.fecha_fin;
      tmpProject.Proyecto_operacional = tmpProjectFromList.desc_pro;
      

      // Optimizar, usar switch o similar
      for(const j in allStatus){

        
                    
          var tmpStatus = allStatus[j];
          

          if(tmpStatus.id == tmpProjectFromList.id_estado){
            
            tmpProject.Estado = tmpStatus.estado;
            break;
          }else{
            tmpProject.Estado = "Null";
          }

          
                    

      }

      tmpProject.Observaciones = tmpProjectFromList.observaciones;
      tmpProject.Unidad = user.nombre_unidad;


      // Asignamos estado

      
      parsedProjects.push(tmpProject);
    }
    


    
    return parsedProjects;
  }
  
  //Projects filters
  const filterProjectsSoonToExpire = () => {
    setFilteredProjects(
      projects.filter((project) => {
        const finDate = formatDate(project.fecha_fin);
        const today = new Date();
        const diff = (finDate - today) / (1000 * 60 * 60 * 24);
        if (diff < 7 && diff >= 0) {
          return true && (project.id_estado == 1 || project.id_estado == 2);
        }
        return false;
      })
    );
  };

  const filterProjectsExpired = () => {
    setFilteredProjects(
      projects.filter((project) => {
        const finDate = formatDate(project.fecha_fin);
        const today = new Date();
        const diff = (finDate - today) / (1000 * 60 * 60 * 24);
        if (diff <= 0) {
          return true && (project.id_estado == 1 || project.id_estado == 2);
        }
        return false;
      })
    );
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
    var keysArray = [];
    for (const key in status) {
      if (status[key]) {
        keysArray.push(key);
      }
    }
    setFilteredProjects(
      projects.filter((item) => {
        for (const key of keysArray) {
          if (item.id_estado == key) {
            return true;
          }
        }
        return false;
      })
    );
    console.log(filteredProjects);
  };

  const filterProjectsBySingleStatus = (status) => {
    setFilteredProjects(projects.filter((item) => item.id_estado === status));
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
      const { data } = await axios({
        method: "get",
        url: `${opDataRestApi}/proyectos/unidad/${user.id_unidad}`,
        headers: { Authorization: `Opdata ${token}` },
      });
      data.map((item) => {
        item.fecha_reg = `${item.fecha_reg[0]}-${
          item.fecha_reg[1] < 10 ? `0${item.fecha_reg[1]}` : item.fecha_reg[1]
        }-${
          item.fecha_reg[2] < 10 ? `0${item.fecha_reg[2]}` : item.fecha_reg[2]
        }`;
        item.fecha_ini = `${item.fecha_ini[0]}-${
          item.fecha_ini[1] < 10 ? `0${item.fecha_ini[1]}` : item.fecha_ini[1]
        }-${
          item.fecha_ini[2] < 10 ? `0${item.fecha_ini[2]}` : item.fecha_ini[2]
        }`;
        item.fecha_fin = `${item.fecha_fin[0]}-${
          item.fecha_fin[1] < 10 ? `0${item.fecha_fin[1]}` : item.fecha_fin[1]
        }-${
          item.fecha_fin[2] < 10 ? `0${item.fecha_fin[2]}` : item.fecha_fin[2]
        }`;
      });
      setProjects([...data]);
      setFilteredProjects([...data].filter((proy) => proy.id_estado == 1));
      return true;
    } catch (error) {
      throw error;
    }
  };

  //Projects crud
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
      let observacionesSend = "";
      if (observaciones == "" || observaciones == undefined) {
        observacionesSend = "na";
      } else {
        observacionesSend = observaciones;
      }
      const { data } = await axios({
        method: "post",
        url: `${opDataRestApi}/proyectos/${user.id_unidad}/${fecha_reg}/${fecha_ini}/${fecha_fin}/${desc_pro}/${id_estado}/`,
        headers: {
          Authorization: `Opdata ${token}`,
          "Content-Type": "text/plain",
        },
        data: observacionesSend,
      });
      setProjects([...projects, data]);
      if (data.id_estado == 1) {
        setFilteredProjects([
          ...projects.filter((pro) => pro.id !== data.id && pro.id_estado == 1),
          data,
        ]);
      } else {
        setFilteredProjects([
          ...projects.filter((pro) => pro.id !== data.id && pro.id_estado == 1),
        ]);
      }
      return true;
    } catch (error) {
      return error;
    }
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
        observacionesSend = "na";
      } else {
        observacionesSend = observaciones;
      }
      const { data } = await axios({
        method: "put",
        url: `${opDataRestApi}/proyectos/${id}/${user.id_unidad}/${fecha_reg}/${fecha_ini}/${fecha_fin}/${desc_pro}/${id_estado}/`,
        headers: {
          Authorization: `Opdata ${token}`,
          "Content-Type": "text/plain",
        },
        data: observacionesSend,
      });
      setProjects([...projects.filter((pro) => pro.id !== data.id), data]);
      if (data.id_estado == 1) {
        setFilteredProjects([
          ...projects.filter((pro) => pro.id !== data.id && pro.id_estado == 1),
          data,
        ]);
      } else {
        setFilteredProjects([
          ...projects.filter((pro) => pro.id !== data.id && pro.id_estado == 1),
        ]);
      }
      return true;
    } catch (error) {
      return error;
    }
  };

  const getAllStatus = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${opDataRestApi}/proyectos/estado/all`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setAllStatus(data);
      setFilteredStatus(data.filter((s) => s.habilitado == 1));
      return true;
    } catch (error) {
      throw error;
    }
  };

  //Admin only
  const getUsers = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${opDataRestApi}/users/all`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setUsers(data);
      setFilteredUsers(data.filter((u) => u.habilitado == 1));
      return true;
    } catch (error) {
      throw error;
    }
  };

  const createUser = async (newUser) => {
    try {
      const {
        cod_ins,
        nombre,
        apellido,
        username,
        correo,
        rol,
        hashed_pass,
        habilitado,
      } = newUser;
      const { data } = await axios({
        method: "post",
        url: `${opDataRestApi}/users/${cod_ins}/${nombre}/${apellido}/${username}/${correo}/${
          rol == undefined ? "ROLE_JefeUnidad" : rol
        }/${hashed_pass}/${habilitado ? 1 : 0}`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setUsers([...users.filter((us) => us.id !== data.id), data]);
      if (disabledUsers) {
        setFilteredUsers([...users.filter((us) => us.id !== data.id), data]);
      } else {
        if (data.habilitado == 1) {
          setFilteredUsers([
            ...users.filter((us) => us.id !== data.id && us.habilitado == true),
            data,
          ]);
        } else {
          setFilteredUsers([
            ...users.filter((us) => un.id !== data.id && un.habilitado == true),
          ]);
        }
      }
      return true;
    } catch (error) {
      return error;
    }
  };

  const updateUser = async (newUser) => {
    try {
      const {
        id,
        cod_ins,
        nombre,
        apellido,
        username,
        correo,
        rol,
        hashed_pass,
        habilitado,
      } = newUser;
      const { data } = await axios({
        method: "put",
        url: `${opDataRestApi}/users/${id}/${cod_ins}/${nombre}/${apellido}/${username}/${correo}/${
          rol == undefined ? "ROLE_JefeUnidad" : rol
        }/${hashed_pass}/${habilitado ? 1 : 0}`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setUsers([...users.filter((us) => us.id !== data.id), data]);

      if (disabledUsers) {
        setFilteredUsers([...users.filter((us) => us.id !== data.id), data]);
      } else {
        if (data.habilitado == 1) {
          setFilteredUsers([
            ...users.filter((us) => us.id !== data.id && us.habilitado == true),
            data,
          ]);
        } else {
          setFilteredUsers([
            ...users.filter((us) => us.id !== data.id && us.habilitado == true),
          ]);
        }
      }
      return true;
    } catch (error) {
      return error;
    }
  };

  const getUnits = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${opDataRestApi}/unidades/`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setUnits(data);
      setFilteredUnits(data.filter((u) => u.habilitado == 1));
      return true;
    } catch (error) {
      throw error;
    }
  };

  const createUnit = async (newUnit) => {
    try {
      const { nombre_unidad, uid_jefe, habilitado } = newUnit;
      const { data } = await axios({
        method: "post",
        url: `${opDataRestApi}/unidades/${nombre_unidad}/${uid_jefe}/${
          habilitado ? 1 : 0
        }`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setUnits([...units.filter((un) => un.id !== data.id), data]);
      if (disabledUnits) {
        setFilteredUnits([...units.filter((un) => un.id !== data.id), data]);
      } else {
        if (data.habilitado == 1) {
          setFilteredUnits([
            ...units.filter((un) => un.id !== data.id && un.habilitado == true),
            data,
          ]);
        } else {
          setFilteredUnits([
            ...units.filter((un) => un.id !== data.id && un.habilitado == true),
          ]);
        }
      }
      return true;
    } catch (error) {
      return error;
    }
  };

  const updateUnit = async (newUnit) => {
    try {
      const { id, nombre_unidad, uid_jefe, habilitado } = newUnit;
      const { data } = await axios({
        method: "put",
        url: `${opDataRestApi}/unidades/${id}/${nombre_unidad}/${uid_jefe}/${
          habilitado ? 1 : 0
        }`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setUnits([...units.filter((un) => un.id !== data.id), data]);
      if (disabledUnits) {
        setFilteredUnits([...units.filter((un) => un.id !== data.id), data]);
      } else {
        if (data.habilitado == 1) {
          setFilteredUnits([
            ...units.filter((un) => un.id !== data.id && un.habilitado == true),
            data,
          ]);
        } else {
          setFilteredUnits([
            ...units.filter((un) => un.id !== data.id && un.habilitado == true),
          ]);
        }
      }
      return true;
    } catch (error) {
      return error;
    }
  };

  const createStatus = async (newStatus) => {
    try {
      const { estado, habilitado } = newStatus;
      const { data } = await axios({
        method: "post",
        url: `${opDataRestApi}/proyectos/estado/${estado}/${
          habilitado ? 1 : 0
        }`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setAllStatus([...allStatus.filter((st) => st.id !== data.id), data]);
      if (disabledStatus) {
        setFilteredStatus([
          ...allStatus.filter((st) => st.id !== data.id),
          data,
        ]);
      } else {
        if (data.habilitado == 1) {
          setFilteredStatus([
            ...allStatus.filter(
              (st) => st.id !== data.id && st.habilitado == true
            ),
            data,
          ]);
        } else {
          setFilteredStatus([
            ...allStatus.filter(
              (st) => st.id !== data.id && st.habilitado == true
            ),
          ]);
        }
      }
      return true;
    } catch (error) {
      return error;
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const { id, estado, habilitado } = newStatus;
      const { data } = await axios({
        method: "put",
        url: `${opDataRestApi}/proyectos/estado/${id}/${estado}/${
          habilitado ? 1 : 0
        }`,
        headers: { Authorization: `Opdata ${token}` },
      });
      setAllStatus([...allStatus.filter((st) => st.id !== data.id), data]);
      if (disabledStatus) {
        setFilteredStatus([
          ...allStatus.filter((st) => st.id !== data.id),
          data,
        ]);
      } else {
        if (data.habilitado == 1) {
          setFilteredStatus([
            ...allStatus.filter(
              (st) => st.id !== data.id && st.habilitado == true
            ),
            data,
          ]);
        } else {
          setFilteredStatus([
            ...allStatus.filter(
              (st) => st.id !== data.id && st.habilitado == true
            ),
          ]);
        }
      }
      return true;
    } catch (error) {
      return error;
    }
  };

  //Admin filters
  const conmuteDisabledStatus = () => {
    setDisabledStatus(!disabledStatus);
    if (!disabledStatus) {
      setFilteredStatus(allStatus);
    } else {
      setFilteredStatus([...allStatus.filter((s) => s.habilitado == true)]);
    }
  };

  const conmuteDisabledUsers = () => {
    setDisabledUsers(!disabledUsers);
    if (!disabledUsers) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers([...users.filter((u) => u.habilitado == true)]);
    }
  };

  const conmuteDisabledUnits = () => {
    setDisabledUnits(!disabledUnits);
    if (!disabledUnits) {
      setFilteredUnits(units);
    } else {
      setFilteredUnits([...units.filter((u) => u.habilitado == true)]);
    }
  };

  const sortStatusByName = (order) => {
    let sortedArray;
    if (!disabledStatus) {
      sortedArray = [...allStatus.filter((status) => status.habilitado == 1)];
    } else {
      sortedArray = [...allStatus];
    }
    sortedArray.sort((a, b) =>
      sortStatusOperation(a.estado.toLowerCase(), b.estado.toLowerCase(), order)
    );
    setFilteredStatus(sortedArray);
  };

  const sortUnitsByName = (order) => {
    let sortedArray;
    if (!disabledUnits) {
      sortedArray = [...units.filter((u) => u.habilitado == 1)];
    } else {
      sortedArray = [...units];
    }
    sortedArray.sort((a, b) =>
      sortStatusOperation(
        a.nombre_unidad.toLowerCase(),
        b.nombre_unidad.toLowerCase(),
        order
      )
    );
    setFilteredUnits(sortedArray);
  };

  const sortUsersByCode = (order) => {
    let sortedArray;
    if (!disabledUsers) {
      sortedArray = [...users.filter((u) => u.habilitado == 1)];
    } else {
      sortedArray = [...users];
    }
    sortedArray.sort((a, b) =>
      sortStatusOperation(a.cod_ins, b.cod_ins, order)
    );
    setFilteredUsers(sortedArray);
  };

  const sortUsersByLastName = (order) => {
    let sortedArray;
    if (!disabledUsers) {
      sortedArray = [...users.filter((u) => u.habilitado == 1)];
    } else {
      sortedArray = [...users];
    }
    sortedArray.sort((a, b) =>
      sortStatusOperation(
        a.apellido.toLowerCase(),
        b.apellido.toLowerCase(),
        order
      )
    );
    setFilteredUsers(sortedArray);
  };

  const searchUserByUsername = (name) => {
    setFilteredUsers(users.filter((item) => item.username.includes(name)));
  };

  const sortStatusOperation = (a, b, order) => {
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

  const resetSearchUser = () => {
    if (disabledUsers) {
      setFilteredUsers([...users]);
    } else {
      setFilteredUsers([...users.filter((us) => us.habilitado == true)]);
    }
  };

  // const getProjects = async () => {
  //   try {
  //     const { data } = await axios({
  //       method: "get",
  //       url: `${opDataRestApi}/proyectos/`,
  //       headers: { Authorization: `Opdata ${token}` },
  //     });
  //     data.map((item) => {
  //       item.fecha_reg = `${item.fecha_reg[0]}-${
  //         item.fecha_reg[1] < 10 ? `0${item.fecha_reg[1]}` : item.fecha_reg[1]
  //       }-${
  //         item.fecha_reg[2] < 10 ? `0${item.fecha_reg[2]}` : item.fecha_reg[2]
  //       }`;
  //       item.fecha_ini = `${item.fecha_ini[0]}-${
  //         item.fecha_ini[1] < 10 ? `0${item.fecha_ini[1]}` : item.fecha_ini[1]
  //       }-${
  //         item.fecha_ini[2] < 10 ? `0${item.fecha_ini[2]}` : item.fecha_ini[2]
  //       }`;
  //       item.fecha_fin = `${item.fecha_fin[0]}-${
  //         item.fecha_fin[1] < 10 ? `0${item.fecha_fin[1]}` : item.fecha_fin[1]
  //       }-${
  //         item.fecha_fin[2] < 10 ? `0${item.fecha_fin[2]}` : item.fecha_fin[2]
  //       }`;
  //     });
  //     setProjects([...data]);
  //     setFilteredProjects(
  //       [...data].sort((a, b) => (a.id_estado > b.id_estado ? 1 : -1))
  //     );
  //   } catch (error) {}
  // };

  return (
    <UserContext.Provider
      value={{
        userAuth: userAuth,
        projects: projects,
        filteredProjects: filteredProjects,
        user: user,
        unit: unit,
        units: units,
        users: users,
        setUsers: setUsers,
        setUnits: setUnits,
        allStatus: allStatus,
        alert: alert,
        setProjects: setProjects,
        setFilteredProjects: setFilteredProjects,
        setUser: setUser,
        setAllStatus: setAllStatus,
        setAlert: setAlert,
        returnShowedProjects: returnShowedProjects,
        parseProjects: parseProjects,
        getProjectsByUnit: getProjectsByUnit,
        getAllStatus: getAllStatus,
        getUnitById: getUnitById,
        getUsers: getUsers,
        getUnits: getUnits,
        filterProjectsSoonToExpire: filterProjectsSoonToExpire,
        filterProjectsExpired: filterProjectsExpired,
        filterProjectsByDate: filterProjectsByDate,
        orderProjectsByDate: orderProjectsByDate,
        filterProjectsByStatus: filterProjectsByStatus,
        orderProjectsByStatus: orderProjectsByStatus,
        filterProjectsByName: filterProjectsByName,
        orderProjectsByName: orderProjectsByName,
        filterProjectsBySingleStatus: filterProjectsBySingleStatus,
        formatDate: formatDate,
        clearFilters: clearFilters,
        createProject: createProject,
        updateProject: updateProject,
        createUser: createUser,
        updateUser: updateUser,
        createUnit: createUnit,
        updateUnit: updateUnit,
        createStatus: createStatus,
        updateStatus: updateStatus,
        filteredUnits: filteredUnits,
        filteredStatus: filteredStatus,
        filteredUsers: filteredUsers,
        setFilteredUnits: setFilteredUnits,
        setFilteredStatus: setFilteredStatus,
        setFilteredUsers: setFilteredUsers,
        conmuteDisabledStatus: conmuteDisabledStatus,
        conmuteDisabledUnits: conmuteDisabledUnits,
        conmuteDisabledUsers: conmuteDisabledUsers,
        sortStatusByName: sortStatusByName,
        sortUnitsByName: sortUnitsByName,
        sortUsersByCode: sortUsersByCode,
        sortUsersByLastName: sortUsersByLastName,
        searchUserByUsername: searchUserByUsername,
        resetSearchUser: resetSearchUser,
        userTitle: userTitle,
        setUserTitle: setUserTitle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
