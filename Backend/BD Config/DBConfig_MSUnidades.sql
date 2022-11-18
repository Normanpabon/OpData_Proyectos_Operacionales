DROP DATABASE unidades;
DROP USER 'opdataUnidades';

/* Creacion BD y tablas */

CREATE DATABASE unidades;

USE unidades;

CREATE TABLE unidad(id INT AUTO_INCREMENT, nombre_unidad VARCHAR(64), uid_jefe INT, habilitado TINYINT default 1, PRIMARY KEY(id));

/* Creacion usuario y asignacion de permisos */

CREATE USER 'opdataUnidades' IDENTIFIED BY 'wikitiUnidades';

GRANT ALL PRIVILEGES ON unidades.unidad TO 'opdataUnidades';


/* Creacion registros de prueba */


INSERT INTO unidad(nombre_unidad, uid_jefe) VALUES ('Unidad software', 2201000);
INSERT INTO unidad(nombre_unidad, uid_jefe) VALUES ('Unidad servicio al usuario', 2201001);
INSERT INTO unidad(nombre_unidad, uid_jefe) VALUES ('Unidad infrastructura', 2201002);
INSERT INTO unidad(nombre_unidad, uid_jefe) VALUES ('Unidad arquitectura', 22013);


INSERT INTO unidades.unidad(nombre_unidad, uid_jefe) VALUES ('Unidad software', 2201000);
INSERT INTO unidades.unidad(nombre_unidad, uid_jefe) VALUES ('Unidad servicio al usuario', 2201001);
INSERT INTO unidades.unidad(nombre_unidad, uid_jefe) VALUES ('Unidad infrastructura', 2201002);
INSERT INTO unidades.unidad(nombre_unidad, uid_jefe) VALUES ('Unidad arquitectura', 22013);