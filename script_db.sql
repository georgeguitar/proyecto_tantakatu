# DB Tantakatu
/*
Navicat MySQL Data Transfer

Source Server         : TANTAKATU
Source Server Version : 50719
Source Host           : y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306
Source Database       : hm2zt6g2m0gkaepr

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-05-22 23:21:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tipo` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table categoria (
	idCategoria int not null auto_increment,
    descripcion varchar(50),
    estado varchar(10),
    primary key (idCategoria)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;