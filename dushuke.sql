/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100119
 Source Host           : localhost:3306
 Source Schema         : dushuke

 Target Server Type    : MySQL
 Target Server Version : 100119
 File Encoding         : 65001

 Date: 04/03/2023 17:58:10
*/

DROP DATABASE IF EXISTS `dushuke`;
CREATE DATABASE `dushuke` DEFAULT CHARSET UTF8;
USE `dushuke`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', '9c7cc2cde1939666d314378b18857721');

-- ----------------------------
-- Table structure for book_author
-- ----------------------------
DROP TABLE IF EXISTS `book_author`;
CREATE TABLE `book_author`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID\r\n',
  `author_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '作家名称\r\n',
  `author_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '作家头像路径',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of book_author
-- ----------------------------
INSERT INTO `book_author` VALUES (1, '佐野洋子', 'https://s1.ax1x.com/2023/02/18/pSLutMQ.jpg');
INSERT INTO `book_author` VALUES (2, '测试员', 'https://s1.ax1x.com/2023/02/28/ppP3g2T.jpg');
INSERT INTO `book_author` VALUES (3, '测试员', 'https://s1.ax1x.com/2023/02/28/ppP3g2T.jpg');
INSERT INTO `book_author` VALUES (4, '测试员', 'https://s1.ax1x.com/2023/02/28/ppP3g2T.jpg');
INSERT INTO `book_author` VALUES (5, '测试员', 'https://s1.ax1x.com/2023/02/28/ppP3g2T.jpg');
INSERT INTO `book_author` VALUES (6, '测试员', 'https://s1.ax1x.com/2023/02/28/ppP3g2T.jpg');
INSERT INTO `book_author` VALUES (8, '测试员', 'https://s1.ax1x.com/2023/02/28/ppP3g2T.jpg');
INSERT INTO `book_author` VALUES (9, '测试员2.27', 'https://s1.ax1x.com/2023/02/28/ppP3g2T.jpg');
INSERT INTO `book_author` VALUES (10, '测试员2.2720', 'https://s1.ax1x.com/2023/02/18/pSLutMQ.jpg');
INSERT INTO `book_author` VALUES (14, '测试员2.28', 'https://s1.ax1x.com/2023/02/28/ppP3g2T.jpg');
INSERT INTO `book_author` VALUES (16, '测试员2', 'https://s1.ax1x.com/2023/02/28/ppP8aJx.jpg');
INSERT INTO `book_author` VALUES (17, '测试员3', 'https://s1.ax1x.com/2023/02/28/ppP8dW6.jpg');
INSERT INTO `book_author` VALUES (20, '莫言', 'http://localhost:9000/40ee4550-1e10-4698-86a2-f809032c4663.jpg');

-- ----------------------------
-- Table structure for book_details
-- ----------------------------
DROP TABLE IF EXISTS `book_details`;
CREATE TABLE `book_details`  (
  `bid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `type_id` int(11) DEFAULT NULL COMMENT '类型id',
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图书封面图片路径',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图书标题',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图书类型（冗余字段）',
  `author_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '图书作者（冗余字段）',
  `publish_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '出版日期（冗余字段）',
  `score` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '评分（冗余字段）',
  `description` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT '简介',
  PRIMARY KEY (`bid`) USING BTREE,
  INDEX `typeId`(`type_id`) USING BTREE,
  INDEX `type`(`type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of book_details
-- ----------------------------
INSERT INTO `book_details` VALUES (1, 3, 'https://s1.ax1x.com/2023/02/24/pSzHgMT.jpg', '活了一百万次的猫', '武侠', '佐野洋子', '2004-10-10', '9.2', '有一只100万年也不死的猫。\r\n其实猫死了100万次，又活了100万次。\r\n是一只漂亮的虎斑猫。 有100万个人宠爱过这只猫，有100万个人在这只猫死的时候哭过。\r\n可是猫连一次也没有哭过。\r\n有一回，猫是国王的猫。\r\n猫讨厌什么国王。\r\n国王爱打仗，总是发动战争。而且，他还把猫用一个漂亮的篮子装起来，带到战场上。有一天，猫被一支飞来的箭射死了。\r\n正打着仗，国王却抱着猫哭了起来。\r\n国王仗也不打了，回到了王宫，然后，把猫埋到了王宫的院子里。\r\n有一回，猫是水手的猫。');
INSERT INTO `book_details` VALUES (2, 1, 'https://s1.ax1x.com/2023/02/24/pSzLoJs.jpg', '后台测试修改3.2', '文学／叙事／古代', '测试员2', '2023-03-02', '3.2', '测试修改图书描述内容11111,3.2');
INSERT INTO `book_details` VALUES (3, 2, 'https://s1.ax1x.com/2023/02/24/pSzLoJs.jpg', '测试修改3.2', '武侠／推理／穿越', '测试修改员', '1977-01-01', '6', '测试修改图书描述内容3.2');
INSERT INTO `book_details` VALUES (4, 2, 'https://s1.ax1x.com/2023/02/24/pSzLoJs.jpg', '测试图书标题', '玄幻', '新增接口测试员', '1970-03-01', '9.9', '测试新增图书描述内容');
INSERT INTO `book_details` VALUES (5, 1, 'https://s1.ax1x.com/2023/02/24/pSzLoJs.jpg', '测试图书标题', '玄幻／武侠／游戏', '测试员3', '1979-11-30', '3.1', '测试新增图书描述内容3.1');
INSERT INTO `book_details` VALUES (6, 1, 'http://localhost:9000/80163b91-7600-4504-b0ff-51c07134c576.jpg', '生死疲劳', '叙事／文学／散文', '莫言', '2023-03-02', '9.9', '讲述了一个被冤杀的地主经历了六道轮回，变成驴、牛、猪、狗、猴，最后终于又转生为一个带着先天性不可治愈疾病的大头婴儿；这个大头婴儿滔滔不绝地讲述着他身为畜牲时的种种奇特感受，以及地主西门闹一家和农民蓝解放一家半个多世纪生死疲劳的悲欢故事。小说透过各种动物的眼睛，观照并体味了五十多年来中国乡村社会的庞杂喧哗、充满苦难的蜕变历史。');

-- ----------------------------
-- Table structure for book_store
-- ----------------------------
DROP TABLE IF EXISTS `book_store`;
CREATE TABLE `book_store`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `bookstore_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '书店名称',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '书店地址',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '省份（北京市，河北省）',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '书店所在城市名称（北京市、石家庄市）',
  `district` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '区（海淀区、桥西区）',
  `longitude` double NOT NULL COMMENT '经度',
  `latitude` double NOT NULL COMMENT '纬度',
  `types` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '书店支持的标签（用/分隔，例如：退/换/自习室/）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of book_store
-- ----------------------------
INSERT INTO `book_store` VALUES (1, '读书阁', '河南省郑州市金水区经八路街道上都国际A座', '河南省', '郑州市', '金水区', 113.664927, 34.769863, '读书室');
INSERT INTO `book_store` VALUES (2, '测试房修改了', '河南省郑州市金水区大石桥街道金水路27号地矿大厦', '河南省', '郑州市', '金水区', 113.661807, 34.764963, '借书,购书');
INSERT INTO `book_store` VALUES (3, '测试修改房', '修改省修改市修改区修改小区', '修改省', '修改市', '修改区', 117.33653, 45.993204, '读书室');
INSERT INTO `book_store` VALUES (5, '测试房4', '测试省测试市测试区测试小区2', '测试省', '测试市', '测试区', 113.659652, 34.772182, '借书,购书');
INSERT INTO `book_store` VALUES (6, '新增书店', '河南省郑州市金水区经八路街道联盛大厦A座', '河南省', '郑州市', '金水区', 113.6673, 34.77145, '借书,购书');
INSERT INTO `book_store` VALUES (7, '新增测试', '河南省郑州市金水区花园路街道花园路84号院新闻大厦', '河南省', '郑州市', '金水区', 113.681698, 34.767566, '读书室 / 自习室');

-- ----------------------------
-- Table structure for book_store_type
-- ----------------------------
DROP TABLE IF EXISTS `book_store_type`;
CREATE TABLE `book_store_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图书id',
  `typename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `typename`(`typename`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of book_store_type
-- ----------------------------
INSERT INTO `book_store_type` VALUES (3, '借书,购书');
INSERT INTO `book_store_type` VALUES (2, '自习室');
INSERT INTO `book_store_type` VALUES (1, '读书室');

-- ----------------------------
-- Table structure for book_type
-- ----------------------------
DROP TABLE IF EXISTS `book_type`;
CREATE TABLE `book_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图书id',
  `typename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `typename`(`typename`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of book_type
-- ----------------------------
INSERT INTO `book_type` VALUES (17, '体育');
INSERT INTO `book_type` VALUES (32, '儿童');
INSERT INTO `book_type` VALUES (15, '军事');
INSERT INTO `book_type` VALUES (24, '剧情');
INSERT INTO `book_type` VALUES (14, '历史');
INSERT INTO `book_type` VALUES (1, '叙事');
INSERT INTO `book_type` VALUES (9, '古代');
INSERT INTO `book_type` VALUES (19, '恐怖');
INSERT INTO `book_type` VALUES (30, '戏剧');
INSERT INTO `book_type` VALUES (26, '战争');
INSERT INTO `book_type` VALUES (21, '推理');
INSERT INTO `book_type` VALUES (10, '散文');
INSERT INTO `book_type` VALUES (22, '文学');
INSERT INTO `book_type` VALUES (3, '武侠');
INSERT INTO `book_type` VALUES (16, '游戏');
INSERT INTO `book_type` VALUES (12, '漫画');
INSERT INTO `book_type` VALUES (18, '灵异');
INSERT INTO `book_type` VALUES (20, '爱情');
INSERT INTO `book_type` VALUES (2, '玄幻');
INSERT INTO `book_type` VALUES (28, '生活');
INSERT INTO `book_type` VALUES (29, '神话');
INSERT INTO `book_type` VALUES (8, '科幻');
INSERT INTO `book_type` VALUES (25, '穿越');
INSERT INTO `book_type` VALUES (11, '绘本');
INSERT INTO `book_type` VALUES (31, '西方');
INSERT INTO `book_type` VALUES (23, '诗歌');
INSERT INTO `book_type` VALUES (13, '都市');
INSERT INTO `book_type` VALUES (27, '青春');

-- ----------------------------
-- Table structure for book_user
-- ----------------------------
DROP TABLE IF EXISTS `book_user`;
CREATE TABLE `book_user`  (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `user_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '头像地址',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '密码',
  `validate_code` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '短信验证码',
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of book_user
-- ----------------------------
INSERT INTO `book_user` VALUES (1, NULL, 'Remm', '9c7cc2cde1939666d314378b18857721', NULL);
INSERT INTO `book_user` VALUES (2, 'https://s1.ax1x.com/2023/02/28/ppP3g2T.jpg', 'test', 'e10adc3949ba59abbe56e057f20f883e', NULL);

-- ----------------------------
-- Table structure for user_visited_log
-- ----------------------------
DROP TABLE IF EXISTS `user_visited_log`;
CREATE TABLE `user_visited_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `bid` int(11) DEFAULT NULL COMMENT '用户想看的图书ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_visited_log
-- ----------------------------
INSERT INTO `user_visited_log` VALUES (1, 1, 1);

-- ----------------------------
-- Table structure for user_want_log
-- ----------------------------
DROP TABLE IF EXISTS `user_want_log`;
CREATE TABLE `user_want_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `bid` int(11) DEFAULT NULL COMMENT '用户收藏的图书ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_want_log
-- ----------------------------
INSERT INTO `user_want_log` VALUES (1, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
