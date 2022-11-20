
# **Proyectos operacionales - Prodata**

Sistema de gestion de proyectos operacionales.



### **Requisitos**
- Apache Maven 3.8.5 +
- Mysql Server 5.7 + 
- Java JDK 8 +
- Node-JS 18 +
- Postman (Opcional) -- Para importar colleciones que permiten probar el backend e interactuar con el.
- UMLet (Opcional) -- Para cargar los archivos *.UXF pertenecientes a los diagramas.



### **Directorios**

#### Backend

Contiene la API REST de Opdata, asi como sus microservicios requeridos para funcionar y la configuracion de las bases de datoss de estos. 


>  **BD Config**
> Contiene los archivos de configuracion de la BD
>> -- **Colleciones MSUsuarios** -- Carpeta con colecciones de postman con metodos para probar los microservicios.
>> -- **BDConfig_MSLogs.sql** -- PL/SQL de configuracion para base de datos de microservicio logs.
>> -- **BDConfig_MSProyectos.sql** -- PL/SQL de configuracion para base de datos de microservicio proyectos.
>> -- **BDConfig_MSUnidades.sql** -- PL/SQL de configuracion para base de datos de microservicio unidades.
>> -- **BDConfig_MSUsuarios.sql** -- PL/SQL de configuracion para base de datos de microservicio usuarios.
>> -- **ER diagram opdata.jpg** -- Diagrama entidad-relacion de la base de datos.
>> -- **MS ER diagram opDatta.uxf** -- Archivo editable diagrama ER de la base de datos, se requiere UMLet.
>
>
>
> **MSLogs**
> NOTA: Implementacion pendiente. 
> Carpeta con proyecto de springboot con source code (codigo fuente) del microservicio de logs.
>
> **MSProyectos**
> Carpeta con proyecto de springboot con source code (codigo fuente) del microservicio de proyectos
>
> **MSUnidades**
> Carpeta con proyecto de springboot con source code (codigo fuente) del microservicio de unidades.
>
> **MSUsuarios**
> Carpeta con proyecto de springboot con source code (codigo fuente) del microservicio de usuarios.
>
> **OpdataAPI** 
> Carpeta con protecto de springboot con source de API REST Opdata, esta es la encargada de consumir los microservicios, exponiendo sus comportamientos.
>
> **Tests**
> Contiene las pruebas de software a realizar en el aplicativo asi como los resultados
>> -- **Planteamiento de pruebas de software.xlsx** -- Borrador de pruebas de software.
>> -- **Resultados Testing OpData REST.postman** -- Resultados de test ejecutados a la API REST atravez de postman.
>> -- **Testing OpData REST.postman** -- Colecion de pruebas para la API a ejecutar desde postman.
> -- **OpData REST API - Proyectos.postman** -- Coleccion de postman para consumir proyectos de la api.
> -- **Opdata REST API - Unidades.postman** --  Coleccion de postman para consumir unidades de la api.
> -- **Opdata REST API - Usuarios.postman** -- Coleccion de postman para consumir usuarios de la api.

#### Docs 
>
>  **Arquitectura**
> Contiene diagrama UML de la arquitectura de opdata.
>> -- **Arquitectura MS prodata.uxf** -- Editable de diagrama de arquitectura, requiere UMLet.
>> -- **Arquitectura MS prodata.jpg** -- Imagen de la arquitectura de opdata.
>
> **ER**
> Contiene descripcion de entidades de la base de datos
>> -- **Entidades.xlsx** -- Hoja electronica con descripcion de las tablas de las bases de datos y valores esperados.
>> -- **Casos de uso.uxf** -- Archivo editable con casos de uso del sistema, debe abrirse con UMlet.

#### frontend
>
> **Opdata React**
> En su interior esta el sourcecode (codigo fuente) del frontend del proyecto desarrollado con react.
> -- **Instrucciones.txt** -- Breve guia de como ejecutar el proyecto, se deben instalar las dependencias requeridas usando npm.
