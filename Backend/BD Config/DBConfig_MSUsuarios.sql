CREATE DATABASE Usuarios;

use Usuarios;


/* Esta sin probar la de aca abajo*/

CREATE TABLE Usuarios.USUARIO(id int AUTO_INCREMENT, cod_ins int, nombre varchar(64),
    apellido varchar(64), username varchar(64), correo varchar(64), rol varchar(32),
    hashed_pass varchar(1024), habilitado TINYINT,PRIMARY KEY(id),  CONSTRAINT UNQ_username UNIQUE(username, correo, cod_ins));

CREATE TABLE Usuarios.PREFERENCIA(id int AUTO_INCREMENT, uid int, orden_pro int, tema int, fuente int,
    PRIMARY KEY(id), FOREIGN KEY (uid) REFERENCES USUARIO(id));


/*Creacion de usuario para uso de la bd*/

CREATE USER 'opdataUsuarios' IDENTIFIED BY 'wikitiUsuarios';

GRANT ALL PRIVILEGES ON Usuarios.* to 'opdataUsuarios';

/*Creacion de preferencia default  */

INSERT INTO Usuarios.PREFERENCIA(orden_pro, tema, fuente) VALUES (1, 1, 1);

/* Creacion datos de prueba */

INSERT INTO Usuarios.USUARIO(cod_ins, nombre, apellido, username, correo, rol, hashed_pass, habilitado) VALUES (2201000,
    'Juan', 'Gallego', 'juan.gallego', 'juan.gallego@uao.edu.com', "ROLE_JefeUnidad", 'juan123', 1 );

INSERT INTO Usuarios.USUARIO(cod_ins, nombre, apellido, username, correo, rol, hashed_pass, habilitado) VALUES (2201001,
    'Miguel', 'Gallego', 'Miguel.gallego', 'Miguel.gallego@uao.edu.com', "ROLE_JefeUnidad", 'miguel123', 1 );

INSERT INTO Usuarios.USUARIO(cod_ins, nombre, apellido, username, correo, rol, hashed_pass, habilitado) VALUES (2201002,
    'Fulano', 'Rodriguez', 'Fulano.Rodriguez', 'Fulano.Rodriguez@uao.edu.com', "ROLE_JefeUnidad", 'fulano123', 1 );


INSERT INTO Usuarios.USUARIO(cod_ins, nombre, apellido, username, correo, rol, hashed_pass, habilitado) VALUES (2201003,
    'Admin', 'Admin', 'Admin.opdata', 'admin.opdata@uao.edu.com', "ROLE_Administrador", 'toor', 1 );