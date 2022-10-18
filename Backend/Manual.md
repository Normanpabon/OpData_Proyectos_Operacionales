## --**Documentacion API REST OpData**--



## **Puertos de microservicios y api rest**

Asumiendo que se creen en localhost:

Puertos de red:

**API:**
- localhost:8090

**MSProyectos:**
- localhost:8086

**MSUnidades:**
- localhost:8084

**MSUsuarios:**
- localhost:8088

##  **Como ejecutar backend**

- 1. Ejecutar los pasos del archivo .sql ubicado en la carpeta "BD Config".

- 2. Ejecutar MSUsuarios, MSUnidades y MSProyectos; Puede usarse intellij y ejecutarse como proyectos separados. Verificar que se ejecute bien y no saque mensajes de error.

- 3. Ejecutar opDataAPI, contactamos con este servicio directamente. Cuando termine de iniciar la API REST entrara en funcionamiento.


## **Ejemplos consumo REST API**

### **/PROYECTOS**

- GET - devuelve todos los proyectos

### http://localhost:8090/opData/API/V1/proyectos/

- GET - Devolver proyecto por id de unidad

### http//localhost:8090/opData/API/V1/proyectos/unidad/{id unidad}
eje : localhost:8090/opData/API/V1/proyectos/unidad/1

- GET - Devolver proyecto por id proyecto

### http://localhost:8090/opData/API/V1/proyectos/{id pro}
eje : http://localhost:8090/opData/API/V1/proyectos/1


- POST - Crear un nuevo proyecto

### http://localhost:8090/opData/API/V1/proyectos/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}"
eje: http://localhost:8090/opData/API/V1/proyectos/2/2020-10-05/2021-10-05/2023-12-05/V2 Proyecto mandado a api desde postman/2/NA

- PUT - Actualizar datos de proyecto
### http://localhost:8090/opData/API/V1/proyectos/{id}/{unidad}/{feReg}/{feIni}/{feEnd}/{desc}/{id_estado}/{obs}

(Verificar previamente que el ID exista)
eje: http://localhost:8090/opData/API/V1/proyectos/6/2/2022-10-05/2022-10-05/2023-12-05/ProyectoDesdePostman/2/Modificado con put desde api

### **ESTADOS**

- GET - Obtener estado por id 

### http://localhost:8090/opData/API/V1/proyectos/estado/{id}

- GET - Obtener todos los estados

### http://localhost:8090/opData/API/V1/proyectos/estado/all

- POST - Crear un nuevo estado para proyecto

### http://localhost:8090/opData/API/V1/proyectos/estado/{est}

### **/UNIDADES**

- GET - Obtener todas las unidades

### http://localhost:8090/opData/API/V1/unidades/

- GET - Obtener unidad por id

### http://localhost:8090/opData/API/V1/unidades/{id}

eje: http://localhost:8090/opData/API/V1/unidades/3

- GET - Obtener unidad por uid del jefe a cargo

### http://localhost:8090/opData/API/V1/unidades/jefe/{uid}

eje: http://localhost:8090/opData/API/V1/unidades/jefe/22010

- POST - Crear una nueva unidad (esta fallando en el API)

### http://localhost:8090/opData/API/V1/unidades/{nombre}/{uid_jefe}

- PUT - Actualizar datos de una unidad

### http://localhost:8090/opData/API/V1/unidades/{id}/{nombre}/{new_uid}

eje: http://localhost:8090/opData/API/V1/unidades/1/Cambio de datos unidad/11111

### **/USUARIOS**

- POST - Login: Retorna el id del usuario o -1 si es invalido

### http://localhost:8090/opData/API/V1/users/login/{user}/{pass}}

eje: http://localhost:8090/opData/API/V1/users/login/Miguel.gallego/miguel123

- GET - Obtener la lista de usuarios

### http://localhost:8090/opData/API/V1/users/all

- GET - Obtener usuario por id

### http://localhost:8090/opData/API/V1/users/{id}

eje: http://localhost:8090/opData/API/V1/users/2

- POST - Crear un nuevo usuario:

### http://localhost:8090/opData/API/V1/users/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}

- PUT - Modificar usuario existente:
  
### http://localhost:8090/opData/API/V1/users/{id}/{cod_ins}/{nombre}/{apellido}/{username}/{correo}/{rol}/{pass}

### **Roles**

- GET - Obtener todos los roles

### http://localhost:8090/opData/API/V1/users/rol/roles

- GET - Obtener rol por id del rol

### http://localhost:8090/opData/API/V1/users/rol/{id}

eje : http://localhost:8090/opData/API/V1/users/rol/2

- POST - Crear un nuevo rol

### http://localhost:8090/opData/API/V1/users/rol/{ nombre del nuevo rol}

eje : http://localhost:8090/opData/API/V1/users/rol/Nuevo rol de prueba/

- PUT - Modificar rol

### http://localhost:8090/opData/API/V1/users/rol/{id del rol}/{ nombre del nuevo rol}

eje : http://localhost:8090/opData/API/V1/users/rol/5/Nuevo rol modificado de prueba/

### **Preferencias**

- GET - Obtener preferencias por default

### http://localhost:8090/opData/API/V1/users/preferencia/

- GET - Obtener preferencia de usuario por UID de usuario

### http://localhost:8090/opData/API/V1/users/preferencia/user/{UID}

eje http://localhost:8090/opData/API/V1/users/preferencia/user/1

- POST - Crear una nueva preferencia para un usuario

### http://localhost:8090/opData/API/V1/users/preferencia/{uid}/{orden_pro}/{tema}/{fuente}

- PUT - Modificar preferencias de usuario 

### http://localhost:8090/opData/API/V1/users/preferencia/{id}/{uid}/{orden_pro}/{tema}/{fuente}



