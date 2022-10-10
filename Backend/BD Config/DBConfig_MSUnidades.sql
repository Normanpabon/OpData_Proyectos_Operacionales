/* Creacion BD y tablas */

CREATE DATABASE unidades;

USE unidades;

CREATE TABLE unidad(id INT AUTO_INCREMENT, nombre_unidad VARCHAR(64), uid_jefe INT, PRIMARY KEY(id));

/* Creacion usuario y asignacion de permisos */

CREATE USER 'prodataUnidades' IDENTIFIED BY 'wikitiUnidades';

GRANT ALL PRIVILEGES ON unidades.unidad TO 'prodataUnidades';


/* Creacion registros de prueba */


INSERT INTO unidad(nombre_unidad, uid_jefe) VALUES ('Unidad software', 22010);
INSERT INTO unidad(nombre_unidad, uid_jefe) VALUES ('Unidad servicio al usuario', 22011);
INSERT INTO unidad(nombre_unidad, uid_jefe) VALUES ('Unidad infrastructura', 22012);
INSERT INTO unidad(nombre_unidad, uid_jefe) VALUES ('Unidad arquitectura', 22013);


INSERT INTO unidades.unidad(nombre_unidad, uid_jefe) VALUES ('Unidad software', 22010);
INSERT INTO unidades.unidad(nombre_unidad, uid_jefe) VALUES ('Unidad servicio al usuario', 22011);
INSERT INTO unidades.unidad(nombre_unidad, uid_jefe) VALUES ('Unidad infrastructura', 22012);
INSERT INTO unidades.unidad(nombre_unidad, uid_jefe) VALUES ('Unidad arquitectura', 22013);