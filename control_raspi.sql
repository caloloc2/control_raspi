/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : control_raspi

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2018-08-13 11:03:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for control
-- ----------------------------
DROP TABLE IF EXISTS `control`;
CREATE TABLE `control` (
  `id_control` int(11) NOT NULL AUTO_INCREMENT,
  `led1` tinyint(4) DEFAULT '0',
  `led2` tinyint(4) DEFAULT NULL,
  `led3` tinyint(4) DEFAULT '0',
  `led4` tinyint(4) DEFAULT '0',
  `texto` varchar(100) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `audio` tinyint(4) DEFAULT '0',
  `mime` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_control`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
