/* Creacion BD y tablas */

CREATE DATABASE proyectos;

USE proyectos;

/*CREATE TABLE estado(id int NOT NULL AUTO_INCREMENT, estado VARCHAR(18), PRIMARY KEY(id));*/
CREATE TABLE estado(id int AUTO_INCREMENT, estado VARCHAR(18), PRIMARY KEY(id));

CREATE TABLE proyecto(id int NOT NULL AUTO_INCREMENT, unidad_p int, fecha_reg DATE, fecha_ini DATE, fecha_fin DATE, desc_pro VARCHAR(500),id_estado int , observaciones VARCHAR(12000), PRIMARY KEY(id), FOREIGN KEY (id_estado) REFERENCES estado(id));



/*Creacion de usuario para uso de la bd*/

CREATE USER 'opdataProyectos' IDENTIFIED BY 'wikitiProyectos';

GRANT ALL PRIVILEGES ON proyectos.* TO 'opdataProyectos';

INSERT INTO estado(estado) VALUES ('Activo');
INSERT INTO estado(estado) VALUES ('En espera');
INSERT INTO estado(estado) VALUES ('Cerrado');
INSERT INTO estado(estado) VALUES ('ANULADO');

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado) VALUES();

/*Datos de prueba para la bd */

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado) VALUES(
    1, '2022-10-05','2022-10-05', '2022-12-05', "Proyecto No 1 prueba", 1
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado) VALUES(
    2, '2021-10-05','2021-10-05', '2023-12-05', "Proyecto No 2 prueba", 2
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado) VALUES(
    2, '2020-10-05', '2020-10-05', '2024-12-05', "Proyecto No 3 prueba", 2
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado, observaciones) VALUES(
    4, '2022-10-05', '2022-10-05', '2022-12-05', "Proyecto No 4 prueba", 4, "Anulado por pruebas"
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado, observaciones) VALUES(4, '2020-07-09', '2020-07-09', '2020-07-17',3 ,"Entendimiento e Implementacion inicial de Guacamole");

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado, observaciones) VALUES(4, '2020-07-09', '2020-07-12', '2020-08-22',3 ,"Depuración Programas Academicos - Chatbot estudiantes nuevos");

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado, observaciones) VALUES(4, '2020-07-09', '2020-08-12', '2020-09-22',3 ,"Implementación Salas de Computo Virtual x Clases(No incluye Practica Libre) - Salas de Computo Virtual - Guacamole", 3, "Se indica que el producto tecnicamente si es capas de permitir el acceso a las maquinas remotas, sin embargo tiene algunas limitantes(Montaje de unidades, Copiado y pegado a traves de la papelera) si se compara con soluciones tipo Citrix o VMWare Horizont.");

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado, observaciones) VALUES(4, '2020-08-31', '2020-08-31', '2020-09-04',1 ,"Mejoramiento y Optimizacion de los depliegues de los POC con Docker");

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado, observaciones) VALUES(4, '2020-08-11', '2020-08-11', '2020-08-22',1 ,"Integracion Formularios con API de Marketing Cloud Salesforce");

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado, observaciones) VALUES(4, '2022-01-10', '2022-01-23', '2022-08-19',1 ,"Alternativas entrega infraestructura a estudiantes a traves de Contenerizacion"VICTOR> 
Julio 28
   * Se Presenta la implementacion de la BD MOngo usando un cluster de 3 nodos usando replication a la academia e indican que es funcional.
   * Se programa capacitacion a los profesores(9 Agosto).
   * Se solicita por parte de la academia la construccion de un cluster de Haddoop + Spark como siguiente paso.
Se re-programa(EL profesor no podia asistir a la reunion planteada) la 1era sesion de revision con el profe Diego Diaz para el martes 2 de Agosto.
La academia indica que para iniciar se debe crear como minimo un nodo de MongoDB y posteriormente hacer cluster de dos nodos (Prof. Diego Diaz).
 Julio 22
   * Se esta. la espera de la implementacion de una imagen con Docker(Segun experto de VMWare es posible), ademas nos indica que para este fin podemos usar RANCHER.
   * Se va a crear una imagen desde cero para mejorar el desempeño de la maquina virtual de Docker.
 Julio 11-15
   * Pruebas Motores de BD:
      * Se hacen pruebas Locales (Portatil VIctor) de uno de los motores de BD (Mongo), usando partitioning usando Docker.
      * Se esta a la espera de respuesta de USU sobre implementacion de Escritorio con Docker Instalado para hacer pruebas de DOcker Locales(Victor).
 Julio 4 - 8
- Se crea Infraestructura usando contenedores (Docker-compose) de MongoDB con 1 nodo. (OK)
 Junio 20-24
- Investigando como construir infraestructura de MongoDB con multiples nodos.
  - Se crean cluster de 3 nodos con replicacion, sisn embargo se esta valindado el acceso desde fuera de los contenedores.
  - Pendiente generacion de cluster de 3 nodos para hacer sharding.
");

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado, observaciones) VALUES(4, '2022-01-10', '2022-01-23', '2022-08-19', "Verificación Kubernetes (K8S) x Gestion Docker-engine (Open Source)", 1, "Se valida si es posible tener una plataforma de gestion de Contenedores Estable y Open Source:
- Rancher");

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado, observaciones) VALUES(4, '2022-08-05', '2022-08-08', '2022-08-19', "POC Diseño de APi's con OpenApi(Incremento en el desempeño de equipos Back & Front)
", 1, "Diseño de Soluciones de Software mas eficientes.");