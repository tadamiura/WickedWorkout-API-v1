-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: wicked_workout
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercice`
--

DROP TABLE IF EXISTS `exercice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `url_name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercice`
--

LOCK TABLES `exercice` WRITE;
/*!40000 ALTER TABLE `exercice` DISABLE KEYS */;
INSERT INTO `exercice` VALUES (1,'squat','https://youtu.be/EXFBExFRTBY'),(2,'pompe','https://youtu.be/mQM1h5AfqUE'),(3,'sit-up','https://youtu.be/ab48kqiD6WY'),(4,'burpee','https://youtu.be/-DguwI16-Jg'),(5,'up & down','https://youtu.be/4NRFUKgNhs8'),(6,'mountain climber','https://youtu.be/nuEeHhlWz2w'),(7,'gainage sur les avants-bras','https://youtu.be/aal0oMY-uQQ'),(8,'twist','https://youtu.be/HdrD898OREk'),(9,'fente alternée','https://youtu.be/osWJEjE4gb0'),(10,'squat sauté','https://youtu.be/tvRyLU36J2A'),(11,'fente sautée','https://youtu.be/osWJEjE4gb0'),(12,'gainage latéral','https://youtu.be/aal0oMY-uQQ'),(13,'montée de genou','https://youtu.be/YlcnJAJjfvA'),(14,'jumping jack','https://youtu.be/wxfa0HVPYBY'),(15,'tapping','https://youtu.be/YlcnJAJjfvA'),(16,'pompe + rotation buste','https://youtu.be/4hNPc37Ypsc'),(129,'squat pistol','https://youtu.be/Zw2xCvTepzI');
/*!40000 ALTER TABLE `exercice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exercice_id` int DEFAULT NULL,
  `url_name` text,
  `exercice_name` varchar(45) DEFAULT NULL,
  `media_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,1,'https://youtu.be/EXFBExFRTBY','squat','video'),(2,2,'https://youtu.be/mQM1h5AfqUE','pompe','video'),(3,3,'https://youtu.be/ab48kqiD6WY','sit-up','video'),(4,4,'https://youtu.be/-DguwI16-Jg','burpee','video'),(5,5,'https://youtu.be/4NRFUKgNhs8','up & down','video'),(6,6,'https://youtu.be/nuEeHhlWz2w','mountain climber','video'),(7,7,'https://youtu.be/aal0oMY-uQQ','gainage sur les avants-bras','video'),(8,8,'https://youtu.be/HdrD898OREk','twist','video'),(9,9,'https://youtu.be/osWJEjE4gb0','fente alternée','video'),(10,10,'https://youtu.be/tvRyLU36J2A','squat sauté','video'),(11,11,'https://youtu.be/osWJEjE4gb0','fente sauté','video'),(12,12,'https://youtu.be/aal0oMY-uQQ','gainage latéral','video'),(13,13,'https://youtu.be/YlcnJAJjfvA','montée de genou','video'),(14,14,'https://youtu.be/wxfa0HVPYBY','jumping jack','video'),(15,15,'https://youtu.be/YlcnJAJjfvA','tapping','video'),(16,16,'https://youtu.be/4hNPc37Ypsc','pompe + rotation buste','video');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prenom` varchar(80) NOT NULL,
  `nom` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (9,'Tadatoshi','MIURA','tadamiura@gmail.com','$2a$10$TTVyRx1yHjC2pD.efEayo.wp0MPctz1xaw6Na6w061s3V9aUEjmEO'),(14,'Tadatoshi','MIURA','devsport@us-metro.org','$2a$10$.xD.htwXmRjPfRT53/VoMuGMASd6Nu0oQpQd3tyRB6rGyPhn/Ef9u');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-29 12:31:40
