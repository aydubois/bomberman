# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Hôte: 127.0.0.1 (MySQL 5.5.5-10.4.6-MariaDB-1:10.4.6+maria~bionic)
# Base de données: mydatabase
# Temps de génération: 2019-11-14 12:44:11 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Affichage de la table bomber_score
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bomber_score`;

CREATE TABLE `bomber_score` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `best_score` int(11) DEFAULT NULL,
  `date_best` timestamp NULL DEFAULT NULL,
  `actual_score` int(11) DEFAULT NULL,
  `nb_game` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `bomber ` FOREIGN KEY (`id`) REFERENCES `bomber_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Affichage de la table bomber_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bomber_user`;

CREATE TABLE `bomber_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(20) DEFAULT NULL,
  `password` char(250) DEFAULT NULL,
  `mail` varchar(25) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `last_connexion` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `bomber_user` WRITE;
/*!40000 ALTER TABLE `bomber_user` DISABLE KEYS */;

INSERT INTO `bomber_user` (`id`, `pseudo`, `password`, `mail`, `start_date`, `last_connexion`)
VALUES
	(1,'ayfguis','$2y$10$5KKyPubh4jVGEsXs0b7hmuP76lPkaGy0XsZxCJnpbRth6oNt591EK','ay.dubois@gmail.com','2019-09-27 08:51:39','2019-09-27 16:13:47'),
	(2,'aydubois','$2y$10$nUgzeJ.l2.cTzrQtwXLxdObxFlPZzJsYwiQU94OhaCZk/NWbzFZ62','afguis37@gmail.com','2019-09-27 12:39:40',NULL),
	(5,'audrey','$2y$10$RE8JTplU6JOD.BhoZ9Zar.3q6J5w1heEr0WwG82V12hD2nE.wbMTO','patate@gmail.com','2019-11-14 08:06:05','2019-11-14 08:06:14');

/*!40000 ALTER TABLE `bomber_user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
