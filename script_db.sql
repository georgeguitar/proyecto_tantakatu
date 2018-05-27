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

Date: 2018-05-26 22:24:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `tipo` int(11) NOT NULL DEFAULT '1',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;