CREATE DATABASE Usuarios;

use Usuarios;

CREATE TABLE Usuarios.USUARIO(id int AUTO_INCREMENT, cod_ins int, nombre varchar(16),
    apellido varchar(16), username varchar(16), correo varchar(32), rol varchar(2),
    hashed_pass varchar(256), PRIMARY KEY(id));

CREATE TABLE Usuarios.PREFERENCIA(id int AUTO_INCREMENT, uid int, orden_pro int, tema int, fuente int,
    PRIMARY KEY(id), FOREIGN KEY (uid) REFERENCES USUARIO(id));


/*Creacion de usuario para uso de la bd*/

CREATE USER 'opdataUsuarios' IDENTIFIED BY 'wikitiUsuarios';

GRANT ALL PRIVILEGES ON Usuarios.* to 'opdataUsuarios';

/* Creacion datos de prueba */

INSERT INTO USUARIO(cod_ins, nombre, apellido, username, correo, rol, hashed_pass) VALUES (2201000,
    'Juan', 'Gallego', 'juan.gallego', 'juan.gallego@uao.edu.com', 'JU', 'juan123' );

INSERT INTO USUARIO(cod_ins, nombre, apellido, username, correo, rol, hashed_pass) VALUES (2201001,
    'Miguel', 'Gallego', 'Miguel.gallego', 'Miguel.gallego@uao.edu.com', 'JU', 'miguel123' );

INSERT INTO USUARIO(cod_ins, nombre, apellido, username, correo, rol, hashed_pass) VALUES (2201002,
    'Admin', 'ApellidoAdmin', 'admin.opdata', 'admin.opdata@uao.edu.com', 'AD', 'toor' );

/*Creacion de preferencia default  */

INSERT INTO PREFERENCIA(orden_pro, tema, fuente) VALUES (1, 1, 1,);