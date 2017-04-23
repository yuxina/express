/*
SQLyog Ultimate v8.53 
MySQL - 5.6.34-log : Database - express
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`express` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `express`;

/*Table structure for table `car` */

DROP TABLE IF EXISTS `car`;

CREATE TABLE `car` (
  `car_id` varchar(32) NOT NULL COMMENT '订单编号',
  `uid` varchar(32) NOT NULL COMMENT '用户编号',
  `total` decimal(8,2) DEFAULT '0.00' COMMENT '总价',
  `contacts` varchar(20) DEFAULT '' COMMENT '联系人',
  `phone` varchar(20) DEFAULT '' COMMENT '电话',
  `address` varchar(200) DEFAULT '' COMMENT '地址',
  `proof` varchar(50) DEFAULT '' COMMENT '取件凭证(例如取件编号)',
  `submitTime` datetime DEFAULT NULL COMMENT '提交订单时间',
  `expressFirm` varchar(20) DEFAULT '' COMMENT '快递公司',
  `deliveryDate` varchar(10) DEFAULT '' COMMENT '配送日期',
  `deliveryTime` varchar(20) DEFAULT NULL COMMENT '配送时间点',
  `car_desc` varchar(200) DEFAULT '' COMMENT '订单备注',
  `car_sid` int(11) NOT NULL COMMENT '订单状态编号',
  PRIMARY KEY (`car_id`),
  KEY `FK_car_user` (`uid`),
  KEY `FK_car_state` (`car_sid`),
  CONSTRAINT `FK_car_state` FOREIGN KEY (`car_sid`) REFERENCES `car_state` (`car_sid`),
  CONSTRAINT `FK_car_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `car` */

insert  into `car`(`car_id`,`uid`,`total`,`contacts`,`phone`,`address`,`proof`,`submitTime`,`expressFirm`,`deliveryDate`,`deliveryTime`,`car_desc`,`car_sid`) values ('20170222113207','8a8c81c359b4ab1e0159b4b2d4600002','0.00','','','','',NULL,'','',NULL,'',1),('20170222119200','8a8c81c359b531110159b53179b40000','0.00','','','','',NULL,'','',NULL,'',2),('20170324032139','4028808b5ae62af8015ae62afba90000','7.50','4','13800000000','4','4','2017-03-26 23:38:01','4','4','4','4',2),('20170325045855','ff8080815b0480bf015b04b010420003','11.00','5','13800000000','00','0','2017-03-26 23:30:31','0','0','0','0',2),('20170326114040','4028808b5ae62af8015ae62afba90000','5.00','4','13800000000','0','0','2017-03-26 23:41:03','0','0','0','0',2),('20170326114619','4028808b5ae62af8015ae62afba90000','1.50','1','13800000000','1','1','2017-03-27 15:21:21','1','1','1','1',2),('20170327032852','4028808b5ae62af8015ae62afba90000','25.00','zheng','13800000000','12号宿舍楼','A459','2017-03-27 15:30:46','圆通','今天','中午','衣服',2),('20170327033502','4028808b5ae62af8015ae62afba90000','5.00','1','13800000000','2','2','2017-03-27 15:39:17','2','2','2','2',2),('20170327043917','4028808b5ae62af8015ae62afba90000','6.50','2','13800000000','3','2','2017-03-27 16:55:42','2','2','2','2',2),('20170327045820','4028808b5ae62af8015ae62afba90000','6.50','12','13800000000','1','1','2017-03-27 17:00:44','1','1','1','1',2),('20170329112948','4028808b5ae62af8015ae62afba90000','0.00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5);

/*Table structure for table `car_item` */

DROP TABLE IF EXISTS `car_item`;

CREATE TABLE `car_item` (
  `car_item_id` varchar(32) NOT NULL,
  `car_id` varchar(32) NOT NULL,
  `pro_id` varchar(32) NOT NULL,
  `pro_name` varchar(20) DEFAULT NULL,
  `pro_price` decimal(8,2) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`car_item_id`),
  KEY `FK_car_item_car` (`car_id`),
  KEY `FK_car_item_product` (`pro_id`),
  CONSTRAINT `FK_car_item_car` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_car_item_product` FOREIGN KEY (`pro_id`) REFERENCES `product` (`pro_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `car_item` */

insert  into `car_item`(`car_item_id`,`car_id`,`pro_id`,`pro_name`,`pro_price`,`quantity`) values ('8a8c81c35b0ea285015b0ea444df0000','20170326114619','8a8c81c35acbaf43015acbb8d9340004','超重补差费','1.50',1),('8a8c81c35b0ea7c0015b0eacccc30000','20170327032852','8a8c81c35acbaf43015acbb65c340003','超大件(大于6kg)','10.00',1),('8a8c81c35b0ea7c0015b0eaccd060001','20170327032852','8a8c81c35acbaf43015acbb390dc0001','中件(2-4kg)','5.00',3),('8a8c81c35b0eb39a015b0eb46eb00000','20170327033502','8a8c81c35acbaf43015acbb390dc0001','中件(2-4kg)','5.00',1),('8a8c81c35b0ef9e6015b0efb2cb70000','20170327043917','8a8c81c35acbaf43015acbb390dc0001','中件(2-4kg)','5.00',1),('8a8c81c35b0ef9e6015b0efb2d4a0001','20170327043917','8a8c81c35aa7ea67015aa7ecc0c10001','小件(1kg以内)','1.50',1),('8a8c81c35b0ef9e6015b0efeff920002','20170327045820','8a8c81c35aa7ea67015aa7ecc0c10001','小件(1kg以内)','1.50',1),('8a8c81c35b0ef9e6015b0efeffa80003','20170327045820','8a8c81c35acbaf43015acbb390dc0001','中件(2-4kg)','5.00',1);

/*Table structure for table `car_state` */

DROP TABLE IF EXISTS `car_state`;

CREATE TABLE `car_state` (
  `car_sid` int(11) NOT NULL AUTO_INCREMENT,
  `car_state_info` varchar(50) NOT NULL,
  PRIMARY KEY (`car_sid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `car_state` */

insert  into `car_state`(`car_sid`,`car_state_info`) values (1,'未提交'),(2,'待接单'),(3,'已接单'),(4,'配送中'),(5,'已送达'),(6,'待评价'),(7,'已完成'),(8,'取消订单');

/*Table structure for table `evaluation` */

DROP TABLE IF EXISTS `evaluation`;

CREATE TABLE `evaluation` (
  `assid` varchar(32) NOT NULL,
  `content` varchar(200) NOT NULL,
  `addTime` datetime NOT NULL,
  `car_id` varchar(32) NOT NULL,
  PRIMARY KEY (`assid`),
  KEY `FK_assessment_car` (`car_id`),
  CONSTRAINT `FK_assessment_car` FOREIGN KEY (`car_id`) REFERENCES `car` (`car_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `evaluation` */

/*Table structure for table `pro_type` */

DROP TABLE IF EXISTS `pro_type`;

CREATE TABLE `pro_type` (
  `pro_type_id` varchar(32) NOT NULL,
  `pro_type_name` varchar(32) NOT NULL,
  `pro_type_desc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`pro_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `pro_type` */

insert  into `pro_type`(`pro_type_id`,`pro_type_name`,`pro_type_desc`) values ('8a8c81c35aa7ea67015aa7eaeeaa0000','快递代领','快递代领'),('8a8c81c35af8fc3e015af9024b2d0004','上门取件','上门取件'),('8a8c81c35af9d555015afa34a4030000','上门1',''),('8a8c81c35af9d555015afa34c6b20001','上门2',''),('8a8c81c35af9d555015afa3500000002','上门3',''),('8a8c81c35af9d555015afa351c120003','上门4',''),('8a8c81c35af9d555015afa357ee00004','上门6',''),('8a8c81c35af9d555015afa359a550005','上门5',''),('8a8c81c35af9d555015afa35b0e90006','上门7',''),('8a8c81c35af9d555015afa35d0340007','上门8',''),('8a8c81c35af9d555015afa35e9130008','上门9','');

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `pro_id` varchar(32) NOT NULL,
  `pro_type_id` varchar(32) NOT NULL,
  `pro_name` varchar(100) NOT NULL,
  `pro_price` decimal(10,2) NOT NULL,
  `pro_amount` int(11) NOT NULL,
  `pro_desc` varchar(200) DEFAULT NULL,
  `pro_img_path` varchar(200) DEFAULT NULL,
  `pro_state` int(11) NOT NULL DEFAULT '0',
  `pro_addTime` datetime NOT NULL,
  PRIMARY KEY (`pro_id`),
  KEY `FK50C664CF8E1A7C4D` (`pro_type_id`),
  KEY `FKED8DCCEF8E1A7C4D` (`pro_type_id`),
  CONSTRAINT `FK_product_type` FOREIGN KEY (`pro_type_id`) REFERENCES `pro_type` (`pro_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`pro_id`,`pro_type_id`,`pro_name`,`pro_price`,`pro_amount`,`pro_desc`,`pro_img_path`,`pro_state`,`pro_addTime`) values ('8a8c81c35aa7ea67015aa7ecc0c10001','8a8c81c35aa7ea67015aa7eaeeaa0000','小件(1kg以内)','1.50',99,'2kg以内的快递、包裹等。','pages/images/product/20170307043955.png',3,'2017-03-07 16:39:55'),('8a8c81c35acbaf43015acbb390dc0001','8a8c81c35aa7ea67015aa7eaeeaa0000','中件(2-4kg)','5.00',29,'','pages/images/product/20170314032347.png',2,'2017-03-14 15:23:47'),('8a8c81c35acbaf43015acbb585070002','8a8c81c35aa7ea67015aa7eaeeaa0000','大件(4-6kg)','6.00',50,'','pages/images/product/20170314032555.png',2,'2017-03-14 15:25:55'),('8a8c81c35acbaf43015acbb65c340003','8a8c81c35aa7ea67015aa7eaeeaa0000','超大件(大于6kg)','10.00',40,'','pages/images/product/20170314032650.png',2,'2017-03-14 15:26:50'),('8a8c81c35acbaf43015acbb8d9340004','8a8c81c35aa7ea67015aa7eaeeaa0000','超重补差费','1.50',30,'','pages/images/product/20170314032933.png',2,'2017-03-14 15:29:33'),('8a8c81c35af8fc3e015af902f1540005','8a8c81c35af8fc3e015af9024b2d0004','上门取件','4.00',4444,'上门取件','pages/images/product/20170323103324.png',2,'2017-03-23 10:33:24');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `uid` varchar(32) NOT NULL,
  `uname` varchar(40) NOT NULL,
  `upwd` varchar(40) NOT NULL,
  `usex` int(11) NOT NULL DEFAULT '0',
  `uphone` varchar(13) DEFAULT NULL,
  `uaddress` varchar(200) DEFAULT NULL,
  `uemail` varchar(40) DEFAULT NULL,
  `utId` int(11) NOT NULL,
  `ustate` int(11) NOT NULL DEFAULT '0',
  `addTime` datetime NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `FK285FEBC3B5E289` (`utId`),
  CONSTRAINT `FK_user_ut` FOREIGN KEY (`utId`) REFERENCES `usertype` (`utId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`uid`,`uname`,`upwd`,`usex`,`uphone`,`uaddress`,`uemail`,`utId`,`ustate`,`addTime`) values ('4028808b5ae62af8015ae62afba90000','zhangsan','123456',1,'','',NULL,2,1,'2017-03-19 18:44:20'),('8a8c81c359af619b0159af61fd9e0000','admin','admin',0,'','','',1,0,'2017-01-18 00:00:00'),('8a8c81c359b4ab1e0159b4b2d4600002','赵六','123456',0,'13800000000','北京市 海淀区',NULL,2,0,'2017-01-19 00:00:00'),('8a8c81c359b531110159b53179b40000','海燕','11111',1,'13800000000','北京市 海淀区',NULL,2,1,'2017-01-19 13:27:15'),('8a8c81c359b5a3470159b5b4cd7a0000','王宏','123456',0,'13800000000','北京市 海淀区','948224647@qq.com',2,0,'2017-01-19 15:50:42'),('8a8c81c359b5a3470159b5ba5dd60001','赵月','123456',1,'13800000000','北京市 海淀区','584583@qq.com',2,0,'2017-01-19 15:56:46'),('8a8c81c359b5a3470159b5bba3fe0002','李四','123456',0,'13800000000','北京市 海淀区','584583@qq.com',2,0,'2017-01-19 15:58:10'),('8a8c81c359b5a3470159b5bc3af30003','张雯雨','123456',0,'13800000000','北京市 海淀区','584583@qq.com',2,0,'2017-01-19 15:58:49'),('8a8c81c359b5a3470159b5bce2a40004','杨艳','123456',1,'13800000000','北京市 海淀区','584583@qq.com',2,0,'2017-01-19 15:59:32'),('8a8c81c359b5a3470159b5bd6c6a0005','杨勇','123456',0,'13800000000','北京市 海淀区','584583@qq.com',2,0,'2017-01-19 16:00:07'),('8a8c81c359b5a3470159b5bdec560006','范阳','123456',0,'13800000000','北京市 海淀区','584583@qq.com',2,0,'2017-01-19 16:00:40'),('8a8c81c359b5a3470159b5be653e0007','王海云','123456',0,'13800000000','北京市 海淀区','584583@qq.com',2,0,'2017-01-19 16:01:10'),('8a8c81c35a69dc7c015a69dd8acd0000','admin2','admin2',0,'18706447250','','54854888@qq.com',1,0,'2017-02-23 15:26:51'),('8a8c81c35a69dc7c015a69e727fb0001','admin3','admin3',0,'18706447250','','3435349@qq.com',1,0,'2017-02-23 15:37:21'),('8a8c81c35a69dc7c015a69e898db0002','王峰','123456',0,'13800000000','555','47s88@qq.com',2,0,'2017-02-23 15:38:55'),('8a8c81c35adb529f015adb55d7390000','admin4','123456',0,'13800000000','','584583@qq.com',1,0,'2017-03-17 16:15:20'),('8a8c81c35af07d1c015af07dc5840000','hiMyLove','ss1234',0,'13800000000',NULL,NULL,2,0,'2017-03-21 18:50:58'),('8a8c81c35af07d1c015af080048c0001','hiMylovee','as1234',1,'13800000000',NULL,NULL,2,0,'2017-03-21 18:53:26'),('8a8c81c35af07d1c015af08169ef0002','tom34','as1234',1,'13800000000',NULL,NULL,2,0,'2017-03-21 18:54:57'),('ff8080815af11b00015af132aa640000','Ysdhs','admin123',0,'15800000000','','584583@qq.com',2,0,'2017-03-21 22:08:33'),('ff8080815af11b00015af13effa60001','admin55','admin55',0,'13800000000','','584583@qq.com',1,0,'2017-03-21 22:22:02'),('ff8080815af11b00015af14088d30002','admin6','admin12',0,'13800000000','','584583@qq.com',1,0,'2017-03-21 22:23:42'),('ff8080815b0480bf015b04ac05a30000','zhttty','wsxedc',0,'18706447250',NULL,NULL,2,0,'2017-03-25 16:53:54'),('ff8080815b0480bf015b04ae7b100001','vvgg','qazwsx',1,'18706447250',NULL,NULL,2,0,'2017-03-25 16:56:35'),('ff8080815b0480bf015b04af2f910002','dbhfj','qazwsx',1,'18706447550',NULL,NULL,2,0,'2017-03-25 16:57:21'),('ff8080815b0480bf015b04b010420003','eeex','zx1234',0,'13800000000',NULL,NULL,2,0,'2017-03-25 16:58:19');

/*Table structure for table `usertype` */

DROP TABLE IF EXISTS `usertype`;

CREATE TABLE `usertype` (
  `utId` int(11) NOT NULL AUTO_INCREMENT,
  `utName` varchar(40) NOT NULL,
  PRIMARY KEY (`utId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `usertype` */

insert  into `usertype`(`utId`,`utName`) values (1,'admin'),(2,'member'),(3,'expressman');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
