//CREATE DATABASE hm2zt6g2m0gkaepr;

USE hm2zt6g2m0gkaepr;

SHOW TABLES;

/*CREATE TABLE user (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  login VARCHAR(100),
  name TEXT,
  data_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
DESCRIBE categorias;

INSERT INTO categorias (descripcion, estado ) values ('Celulares', '0');

SELECT * FROM categorias;
