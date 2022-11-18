CREATE DATABASE Logs;

use Logs;

CREATE TABLE Logs.LOG(id int AUTO_INCREMENT, fecha_eve DATE, evento varchar(256), tipo varchar(12), servicio varchar(64), usuario varchar(128), PRIMARY KEY (id));

CREATE USER 'opdataLogs' IDENTIFIED BY 'wikitiLogs';

GRANT ALL PRIVILEGES ON Logs.* TO 'opdataLogs';

/* Crear datos para probar */