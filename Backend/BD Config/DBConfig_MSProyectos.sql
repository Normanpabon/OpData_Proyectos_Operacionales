/* Creacion BD y tablas */

CREATE DATABASE proyectos;

USE proyectos;

/*CREATE TABLE estado(id int NOT NULL AUTO_INCREMENT, estado VARCHAR(18), PRIMARY KEY(id));*/
CREATE TABLE estado(id int AUTO_INCREMENT, estado VARCHAR(18), PRIMARY KEY(id));

CREATE TABLE proyecto(id int NOT NULL AUTO_INCREMENT, unidad_p int, fecha_reg DATE, fecha_ini DATE, fecha_fin DATE, desc_pro VARCHAR(500),id_estado int , observaciones VARCHAR(12000), PRIMARY KEY(id), FOREIGN KEY (id_estado) REFERENCES estado(id));

CREATE TABLE proyectos.proyecto(id int NOT NULL AUTO_INCREMENT, unidad_p int, fecha_reg DATE, fecha_ini DATE, fecha_fin DATE, desc_pro VARCHAR(128),id_estado int , observaciones VARCHAR(256), PRIMARY KEY(id), FOREIGN KEY (id_estado) REFERENCES estado(id));

/*Creacion de usuario para uso de la bd*/

CREATE USER 'opdataProyectos' IDENTIFIED BY 'wikitiProyectos';

GRANT ALL PRIVILEGES ON proyectos.* TO 'opdataProyectos';

INSERT INTO estado(estado) VALUES ('Activo');
INSERT INTO estado(estado) VALUES ('En espera');
INSERT INTO estado(estado) VALUES ('Cerrado');
INSERT INTO estado(estado) VALUES ('ANULADO');

INSERT INTO proyecto(unidad_p, fecha_reg, fecha_fin, desc_pro, id_estado) VALUES();


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