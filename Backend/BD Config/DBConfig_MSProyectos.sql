/* Creacion BD y tablas */

CREATE DATABASE proyectos;

USE proyectos;

/*CREATE TABLE estado(id int NOT NULL AUTO_INCREMENT, estado VARCHAR(18), PRIMARY KEY(id));*/
CREATE TABLE estado(id int AUTO_INCREMENT, estado VARCHAR(18), PRIMARY KEY(id));

CREATE TABLE proyecto(id int NOT NULL AUTO_INCREMENT, unidad_p int, fecha_reg DATE, fecha_ini DATE, fecha_fin DATE, desc_pro VARCHAR(500),id_estado int , observaciones VARCHAR(12000) default 'NA', PRIMARY KEY(id), FOREIGN KEY (id_estado) REFERENCES estado(id));



/*Creacion de usuario para uso de la bd*/

CREATE USER 'opdataProyectos' IDENTIFIED BY 'wikitiProyectos';

GRANT ALL PRIVILEGES ON proyectos.* TO 'opdataProyectos';

INSERT INTO estado(estado) VALUES ('Activo');
INSERT INTO estado(estado) VALUES ('En espera');
INSERT INTO estado(estado) VALUES ('Cerrado');
INSERT INTO estado(estado) VALUES ('ANULADO');

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado) VALUES();



INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado) VALUES(
    1, '2022-10-05','2022-10-05', '2022-12-05', "Proyecto No 1 prueba", 2
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

/*Proyectos para unidad de servicio al usuario*/
INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado) VALUES(
    1, '2021-05-26', '2021-05-31', '2021-07-07', "Gestión de accesos - Capacitación a auxiliares de soporte (segunda parte)", 3);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado) VALUES(
    1, '2021-05-26', '2021-05-31', '2021-08-07', "Gestión de accesos - Revisión de contrato con RRHH
", 3
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado) VALUES(
    1, '2021-05-26', '2021-05-31', '2021-08-07', "Gestión de Salas - Revisión de contrato con RRHH
", 3
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado, observaciones) VALUES(
    1, '2021-05-26', '2021-05-31', '2021-07-23', "Gestión de soporte y mesa de servicios", 3, "Crear dos cuentas más de Hangouts (No correo--redirección automática a usu) adicional a usu (usu2 y usu3) para asignar a tres auxiliares de soporte"
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado, observaciones) VALUES(
    1, '2021-05-26', '2021-05-31', '2021-07-27', "Gestión de soporte y mesa de servicios", 3, "Diseño de una nueva mesa con la información mapeada en el punto anterior. Modelo que permita una mejor distribución de atención, responsabilidades y tiempos"
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado, observaciones) VALUES(
    1, '2021-05-26', '2021-05-31', '2021-08-09', "Gestión de Salas - Habilitar un canal permanente de soporte para usuarios de equipos remotos y escritorios virtuales", 3, "(bandeja colaborativa hangouts)"
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado, observaciones) VALUES(
    1, '2021-05-26', '2021-05-31', '2021-08-09', "Gestión de Salas - Habilitar un canal permanente de soporte para usuarios de equipos remotos y escritorios virtuales", 3, "(bandeja colaborativa hangouts)"
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado, observaciones) VALUES(
    1, '2021-05-26', '2021-05-31', '2023-08-09', "Gestión de soporte y mesa de servicios - Definir el balanceo de llamadas para el grupo de soporte de primer nivel (varios auxiliares al tiempo)", 1, "(bandeja colaborativa hangouts)"
);

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_ini, fecha_fin, desc_pro, id_estado, observaciones) VALUES(
    1, '2022-05-26', '2022-05-31', '2023-08-09', "Depuracion  almacenamiento Drive Google ", 1, "- Identificacion de usuarios
- Clasificacion de usuarios
- Creacion y aplicacion de reglas Directorio Activo - Panel Control Google
-  Depuracion almacenamiento de usuarios Inactivos
- Lanzar campañas de autodepuracion y buen uso del Drive
-  Contacto con usuarios con almacenamiento gran tamaño
-  Depuracion de almacenamiento de usuarios activos con gran tamaño 
- Verificacion y Monitoreo Drive Google"
);
/* No funcionan de aca hacia abajo*/