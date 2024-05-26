CREATE DATABASE  IF NOT EXISTS `b0ugzjkogcuw0zusl2np` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `b0ugzjkogcuw0zusl2np`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: b0ugzjkogcuw0zusl2np-mysql.services.clever-cloud.com    Database: b0ugzjkogcuw0zusl2np
-- ------------------------------------------------------
-- Server version	8.0.15-5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f41d366d-91e5-11e9-8525-cecd028ee826:1-140041961';

--
-- Table structure for table `ASSINATURA`
--

DROP TABLE IF EXISTS `ASSINATURA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ASSINATURA` (
  `ID_ASSINATURA` int(11) NOT NULL,
  `ID_PAGAMENTO` int(11) DEFAULT NULL,
  `ID_PLANO` int(11) DEFAULT NULL,
  `ID_CLIENTE` int(11) DEFAULT NULL,
  `DATA_FINAL_ASSINATURA` date NOT NULL,
  `PLANOS_ID_PLANOS` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  PRIMARY KEY (`ID_ASSINATURA`),
  UNIQUE KEY `ID_PIX_UNIQUE` (`ID_ASSINATURA`),
  UNIQUE KEY `EMAIL_PIX_UNIQUE` (`ID_CLIENTE`),
  UNIQUE KEY `COPIA_COLA_PIX_UNIQUE` (`ID_PLANO`),
  UNIQUE KEY `CELULAR_PIX_UNIQUE` (`ID_PAGAMENTO`),
  KEY `fk_ASSINATURA_PLANOS1_idx` (`PLANOS_ID_PLANOS`),
  KEY `fk_ASSINATURA_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_ASSINATURA_PLANOS1` FOREIGN KEY (`PLANOS_ID_PLANOS`) REFERENCES `PLANOS` (`ID_PLANOS`),
  CONSTRAINT `fk_ASSINATURA_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ASSINATURA`
--

LOCK TABLES `ASSINATURA` WRITE;
/*!40000 ALTER TABLE `ASSINATURA` DISABLE KEYS */;
/*!40000 ALTER TABLE `ASSINATURA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AVALIACAO_FICHA`
--

DROP TABLE IF EXISTS `AVALIACAO_FICHA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AVALIACAO_FICHA` (
  `ID_AVALIACAO` int(11) NOT NULL,
  `COMENTARIO_AVALIACAO` text,
  `NOTA_AVALIACAO` decimal(2,1) DEFAULT NULL,
  `FICHAS_ID_OBRA` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  PRIMARY KEY (`ID_AVALIACAO`),
  KEY `fk_AVALIACAO_FICHA_FICHAS1_idx` (`FICHAS_ID_OBRA`),
  KEY `fk_AVALIACAO_FICHA_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_AVALIACAO_FICHA_FICHAS1` FOREIGN KEY (`FICHAS_ID_OBRA`) REFERENCES `FICHAS` (`ID_OBRA`),
  CONSTRAINT `fk_AVALIACAO_FICHA_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AVALIACAO_FICHA`
--

LOCK TABLES `AVALIACAO_FICHA` WRITE;
/*!40000 ALTER TABLE `AVALIACAO_FICHA` DISABLE KEYS */;
/*!40000 ALTER TABLE `AVALIACAO_FICHA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AVALIACAO_RESENHA`
--

DROP TABLE IF EXISTS `AVALIACAO_RESENHA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AVALIACAO_RESENHA` (
  `ID_AVALIACAO_RESENHA` int(11) NOT NULL,
  `COMENTARIO_AVALIACAO_RESENHA` text NOT NULL,
  `NOTA_AVALIACAO` decimal(2,1) NOT NULL,
  `RESENHAS_ID_RESENHAS` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  PRIMARY KEY (`ID_AVALIACAO_RESENHA`),
  KEY `fk_AVALIACAO_RESENHA_RESENHAS1_idx` (`RESENHAS_ID_RESENHAS`),
  KEY `fk_AVALIACAO_RESENHA_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_AVALIACAO_RESENHA_RESENHAS1` FOREIGN KEY (`RESENHAS_ID_RESENHAS`) REFERENCES `RESENHAS` (`ID_RESENHAS`),
  CONSTRAINT `fk_AVALIACAO_RESENHA_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AVALIACAO_RESENHA`
--

LOCK TABLES `AVALIACAO_RESENHA` WRITE;
/*!40000 ALTER TABLE `AVALIACAO_RESENHA` DISABLE KEYS */;
/*!40000 ALTER TABLE `AVALIACAO_RESENHA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AVALIACAO_VIDEO`
--

DROP TABLE IF EXISTS `AVALIACAO_VIDEO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AVALIACAO_VIDEO` (
  `ID_AVALIACAO` int(11) NOT NULL,
  `COMENTARIO_AVALIACAO` text,
  `NOTA_AVALIACAO` decimal(2,1) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  `VIDEOS_ID_VIDEOS` int(11) NOT NULL,
  PRIMARY KEY (`ID_AVALIACAO`),
  KEY `fk_AVALIACAO_VIDEO_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  KEY `fk_AVALIACAO_VIDEO_VIDEOS1_idx` (`VIDEOS_ID_VIDEOS`),
  CONSTRAINT `fk_AVALIACAO_VIDEO_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`),
  CONSTRAINT `fk_AVALIACAO_VIDEO_VIDEOS1` FOREIGN KEY (`VIDEOS_ID_VIDEOS`) REFERENCES `VIDEOS` (`ID_VIDEOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AVALIACAO_VIDEO`
--

LOCK TABLES `AVALIACAO_VIDEO` WRITE;
/*!40000 ALTER TABLE `AVALIACAO_VIDEO` DISABLE KEYS */;
/*!40000 ALTER TABLE `AVALIACAO_VIDEO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CATEGORIA`
--

DROP TABLE IF EXISTS `CATEGORIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CATEGORIA` (
  `ID_CATEGORIA` int(11) NOT NULL,
  `TITULO_CATEGORIA` varchar(45) NOT NULL,
  `FICHAS_ID_OBRA` int(11) NOT NULL,
  PRIMARY KEY (`ID_CATEGORIA`),
  UNIQUE KEY `ID_CATEGORIA_UNIQUE` (`ID_CATEGORIA`),
  UNIQUE KEY `TITULO_CATEGORIA_UNIQUE` (`TITULO_CATEGORIA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CATEGORIA`
--

LOCK TABLES `CATEGORIA` WRITE;
/*!40000 ALTER TABLE `CATEGORIA` DISABLE KEYS */;
/*!40000 ALTER TABLE `CATEGORIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CATEGORIA_has_GENEROS`
--

DROP TABLE IF EXISTS `CATEGORIA_has_GENEROS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CATEGORIA_has_GENEROS` (
  `CATEGORIA_ID_CATEGORIA` int(11) NOT NULL,
  `GENEROS_ID_GENEROS` int(11) NOT NULL,
  PRIMARY KEY (`CATEGORIA_ID_CATEGORIA`,`GENEROS_ID_GENEROS`),
  KEY `fk_CATEGORIA_has_GENEROS_GENEROS1_idx` (`GENEROS_ID_GENEROS`),
  KEY `fk_CATEGORIA_has_GENEROS_CATEGORIA1_idx` (`CATEGORIA_ID_CATEGORIA`),
  CONSTRAINT `fk_CATEGORIA_has_GENEROS_CATEGORIA1` FOREIGN KEY (`CATEGORIA_ID_CATEGORIA`) REFERENCES `CATEGORIA` (`ID_CATEGORIA`),
  CONSTRAINT `fk_CATEGORIA_has_GENEROS_GENEROS1` FOREIGN KEY (`GENEROS_ID_GENEROS`) REFERENCES `GENEROS` (`ID_GENEROS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CATEGORIA_has_GENEROS`
--

LOCK TABLES `CATEGORIA_has_GENEROS` WRITE;
/*!40000 ALTER TABLE `CATEGORIA_has_GENEROS` DISABLE KEYS */;
/*!40000 ALTER TABLE `CATEGORIA_has_GENEROS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FAVORITO_FICHAS`
--

DROP TABLE IF EXISTS `FAVORITO_FICHAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FAVORITO_FICHAS` (
  `ID_FAVORITOS` int(11) NOT NULL,
  `FICHAS_ID_OBRA` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  `DATA_FAV` datetime NOT NULL,
  PRIMARY KEY (`ID_FAVORITOS`),
  UNIQUE KEY `ID_FAVORITOS_UNIQUE` (`ID_FAVORITOS`),
  KEY `fk_FAVORITO_FICHAS_FICHAS1_idx` (`FICHAS_ID_OBRA`),
  KEY `fk_FAVORITO_FICHAS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_FAVORITO_FICHAS_FICHAS1` FOREIGN KEY (`FICHAS_ID_OBRA`) REFERENCES `FICHAS` (`ID_OBRA`),
  CONSTRAINT `fk_FAVORITO_FICHAS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FAVORITO_FICHAS`
--

LOCK TABLES `FAVORITO_FICHAS` WRITE;
/*!40000 ALTER TABLE `FAVORITO_FICHAS` DISABLE KEYS */;
/*!40000 ALTER TABLE `FAVORITO_FICHAS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FAVORITO_RESENHA`
--

DROP TABLE IF EXISTS `FAVORITO_RESENHA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FAVORITO_RESENHA` (
  `ID_FAVORITOS` int(11) NOT NULL,
  `RESENHAS_ID_RESENHAS` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  `DATA_FAV` datetime NOT NULL,
  PRIMARY KEY (`ID_FAVORITOS`),
  UNIQUE KEY `ID_FAVORITOS_UNIQUE` (`ID_FAVORITOS`),
  KEY `fk_FAVORITO_RESENHA_RESENHAS1_idx` (`RESENHAS_ID_RESENHAS`),
  KEY `fk_FAVORITO_RESENHA_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_FAVORITO_RESENHA_RESENHAS1` FOREIGN KEY (`RESENHAS_ID_RESENHAS`) REFERENCES `RESENHAS` (`ID_RESENHAS`),
  CONSTRAINT `fk_FAVORITO_RESENHA_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FAVORITO_RESENHA`
--

LOCK TABLES `FAVORITO_RESENHA` WRITE;
/*!40000 ALTER TABLE `FAVORITO_RESENHA` DISABLE KEYS */;
/*!40000 ALTER TABLE `FAVORITO_RESENHA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FAVORITO_VIDEOS`
--

DROP TABLE IF EXISTS `FAVORITO_VIDEOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FAVORITO_VIDEOS` (
  `ID_FAVORITO` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  `VIDEOS_ID_VIDEOS` int(11) NOT NULL,
  `data_fav` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_FAVORITO`),
  KEY `fk_FAVORITO_VIDEOS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  KEY `fk_FAVORITO_VIDEOS_VIDEOS1_idx` (`VIDEOS_ID_VIDEOS`),
  CONSTRAINT `fk_FAVORITO_VIDEOS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`),
  CONSTRAINT `fk_FAVORITO_VIDEOS_VIDEOS1` FOREIGN KEY (`VIDEOS_ID_VIDEOS`) REFERENCES `VIDEOS` (`ID_VIDEOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FAVORITO_VIDEOS`
--

LOCK TABLES `FAVORITO_VIDEOS` WRITE;
/*!40000 ALTER TABLE `FAVORITO_VIDEOS` DISABLE KEYS */;
/*!40000 ALTER TABLE `FAVORITO_VIDEOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FICHAS`
--

DROP TABLE IF EXISTS `FICHAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FICHAS` (
  `ID_OBRA` int(11) NOT NULL,
  `NOME_OBRA` varchar(45) NOT NULL,
  `DESCR_OBRA` varchar(400) NOT NULL,
  `HASHTAG_OBRA` varchar(30) NOT NULL,
  `NOTA_OBRA` decimal(4,0) NOT NULL,
  `IMG_OBRA` blob,
  `CATEGORIA_ID_CATEGORIA` int(11) NOT NULL,
  `ID_CATEGORIA` int(11) DEFAULT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  PRIMARY KEY (`ID_OBRA`),
  UNIQUE KEY `ID_FICHAS_UNIQUE` (`ID_OBRA`),
  KEY `fk_FICHAS_CATEGORIA1_idx` (`CATEGORIA_ID_CATEGORIA`),
  KEY `fk_FICHAS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_FICHAS_CATEGORIA1` FOREIGN KEY (`CATEGORIA_ID_CATEGORIA`) REFERENCES `CATEGORIA` (`ID_CATEGORIA`),
  CONSTRAINT `fk_FICHAS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FICHAS`
--

LOCK TABLES `FICHAS` WRITE;
/*!40000 ALTER TABLE `FICHAS` DISABLE KEYS */;
/*!40000 ALTER TABLE `FICHAS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GENEROS`
--

DROP TABLE IF EXISTS `GENEROS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GENEROS` (
  `ID_GENEROS` int(11) NOT NULL,
  `TITULO_GENERO` varchar(30) NOT NULL,
  PRIMARY KEY (`ID_GENEROS`),
  UNIQUE KEY `ID_GENEROS_UNIQUE` (`ID_GENEROS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GENEROS`
--

LOCK TABLES `GENEROS` WRITE;
/*!40000 ALTER TABLE `GENEROS` DISABLE KEYS */;
/*!40000 ALTER TABLE `GENEROS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAGAMENTO`
--

DROP TABLE IF EXISTS `PAGAMENTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAGAMENTO` (
  `ID_PAGAMENTOS` int(11) NOT NULL,
  `FORMA_PAGAMENTO` varchar(40) NOT NULL,
  `DATA_PAGAMENTO` date NOT NULL,
  `ASSINATURA_ID_ASSINATURA` int(11) NOT NULL,
  PRIMARY KEY (`ID_PAGAMENTOS`),
  UNIQUE KEY `ID_PLANO_UNIQUE` (`DATA_PAGAMENTO`),
  UNIQUE KEY `ID_PIX_UNIQUE` (`FORMA_PAGAMENTO`),
  UNIQUE KEY `ID_PAGAMENTOS_UNIQUE` (`ID_PAGAMENTOS`),
  KEY `fk_PAGAMENTO_ASSINATURA1_idx` (`ASSINATURA_ID_ASSINATURA`),
  CONSTRAINT `fk_PAGAMENTO_ASSINATURA1` FOREIGN KEY (`ASSINATURA_ID_ASSINATURA`) REFERENCES `ASSINATURA` (`ID_ASSINATURA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAGAMENTO`
--

LOCK TABLES `PAGAMENTO` WRITE;
/*!40000 ALTER TABLE `PAGAMENTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PAGAMENTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PLANOS`
--

DROP TABLE IF EXISTS `PLANOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PLANOS` (
  `ID_PLANOS` int(11) NOT NULL,
  `NOME_PLANO` varchar(30) NOT NULL,
  `PRAZO_PLANO` date NOT NULL,
  `VALOR_PLANO` decimal(3,2) NOT NULL,
  `DESCR_PLANO` text NOT NULL,
  PRIMARY KEY (`ID_PLANOS`),
  UNIQUE KEY `ID_PLANOS_UNIQUE` (`ID_PLANOS`),
  UNIQUE KEY `NOME_PLANO_UNIQUE` (`NOME_PLANO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PLANOS`
--

LOCK TABLES `PLANOS` WRITE;
/*!40000 ALTER TABLE `PLANOS` DISABLE KEYS */;
/*!40000 ALTER TABLE `PLANOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RECOMENDACOES_FICHAS`
--

DROP TABLE IF EXISTS `RECOMENDACOES_FICHAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RECOMENDACOES_FICHAS` (
  `ID_RECOMENDACOES` int(11) NOT NULL,
  `FICHAS_ID_OBRA` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  PRIMARY KEY (`ID_RECOMENDACOES`),
  KEY `fk_RECOMENDACOES_FICHAS_FICHAS1_idx` (`FICHAS_ID_OBRA`),
  KEY `fk_RECOMENDACOES_FICHAS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_RECOMENDACOES_FICHAS_FICHAS1` FOREIGN KEY (`FICHAS_ID_OBRA`) REFERENCES `FICHAS` (`ID_OBRA`),
  CONSTRAINT `fk_RECOMENDACOES_FICHAS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RECOMENDACOES_FICHAS`
--

LOCK TABLES `RECOMENDACOES_FICHAS` WRITE;
/*!40000 ALTER TABLE `RECOMENDACOES_FICHAS` DISABLE KEYS */;
/*!40000 ALTER TABLE `RECOMENDACOES_FICHAS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RECOMENDACOES_RESENHA`
--

DROP TABLE IF EXISTS `RECOMENDACOES_RESENHA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RECOMENDACOES_RESENHA` (
  `ID_RECOMENDACOES_RESENHA` int(11) NOT NULL,
  `RESENHAS_ID_RESENHAS` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  PRIMARY KEY (`ID_RECOMENDACOES_RESENHA`),
  KEY `fk_RECOMENDACOES_RESENHA_RESENHAS1_idx` (`RESENHAS_ID_RESENHAS`),
  KEY `fk_RECOMENDACOES_RESENHA_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_RECOMENDACOES_RESENHA_RESENHAS1` FOREIGN KEY (`RESENHAS_ID_RESENHAS`) REFERENCES `RESENHAS` (`ID_RESENHAS`),
  CONSTRAINT `fk_RECOMENDACOES_RESENHA_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RECOMENDACOES_RESENHA`
--

LOCK TABLES `RECOMENDACOES_RESENHA` WRITE;
/*!40000 ALTER TABLE `RECOMENDACOES_RESENHA` DISABLE KEYS */;
/*!40000 ALTER TABLE `RECOMENDACOES_RESENHA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RECOMENDACOES_VIDEOS`
--

DROP TABLE IF EXISTS `RECOMENDACOES_VIDEOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RECOMENDACOES_VIDEOS` (
  `ID_RECOMENDACOES_VIDEOS` int(11) NOT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_VIDEO` int(11) DEFAULT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  `VIDEOS_ID_VIDEOS` int(11) NOT NULL,
  PRIMARY KEY (`ID_RECOMENDACOES_VIDEOS`),
  UNIQUE KEY `ID_USUARIO_UNIQUE` (`ID_USUARIO`),
  UNIQUE KEY `ID_VIDEO_UNIQUE` (`ID_VIDEO`),
  KEY `fk_RECOMENDACOES_VIDEOS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  KEY `fk_RECOMENDACOES_VIDEOS_VIDEOS1_idx` (`VIDEOS_ID_VIDEOS`),
  CONSTRAINT `fk_RECOMENDACOES_VIDEOS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`),
  CONSTRAINT `fk_RECOMENDACOES_VIDEOS_VIDEOS1` FOREIGN KEY (`VIDEOS_ID_VIDEOS`) REFERENCES `VIDEOS` (`ID_VIDEOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RECOMENDACOES_VIDEOS`
--

LOCK TABLES `RECOMENDACOES_VIDEOS` WRITE;
/*!40000 ALTER TABLE `RECOMENDACOES_VIDEOS` DISABLE KEYS */;
/*!40000 ALTER TABLE `RECOMENDACOES_VIDEOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESENHAS`
--

DROP TABLE IF EXISTS `RESENHAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESENHAS` (
  `ID_RESENHAS` int(11) NOT NULL,
  `TITULO_RESENHA` varchar(30) NOT NULL,
  `DESCR_RESENHAl` varchar(400) NOT NULL,
  `HASHTAG_RESENHA` varchar(30) NOT NULL,
  `NOTA_RESENHA` decimal(4,0) NOT NULL,
  `IMG_RESENHA` blob,
  `CATEGORIA_ID_CATEGORIA` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  PRIMARY KEY (`ID_RESENHAS`),
  UNIQUE KEY `TITULO_RESENHA_UNIQUE` (`TITULO_RESENHA`),
  KEY `fk_RESENHAS_CATEGORIA1_idx` (`CATEGORIA_ID_CATEGORIA`),
  KEY `fk_RESENHAS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_RESENHAS_CATEGORIA1` FOREIGN KEY (`CATEGORIA_ID_CATEGORIA`) REFERENCES `CATEGORIA` (`ID_CATEGORIA`),
  CONSTRAINT `fk_RESENHAS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESENHAS`
--

LOCK TABLES `RESENHAS` WRITE;
/*!40000 ALTER TABLE `RESENHAS` DISABLE KEYS */;
/*!40000 ALTER TABLE `RESENHAS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIOS`
--

DROP TABLE IF EXISTS `USUARIOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIOS` (
  `ID_USUARIO` int(11) NOT NULL AUTO_INCREMENT,
  `NOME_USUARIO` varchar(70) NOT NULL,
  `NICKNAME_USUARIO` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `CONTATO` char(11) NOT NULL,
  `SENHA_USUARIO` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `DATA_NASC_USUARIO` date NOT NULL,
  `CPF_USUARIO` char(11) NOT NULL,
  `RECOMENDACOES_ID_RECOMENDACOES` int(11) DEFAULT NULL,
  `EMAIL_USUARIO` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE KEY `ID_USUARIO_UNIQUE` (`ID_USUARIO`),
  UNIQUE KEY `NICKNAME_USUARIO_UNIQUE` (`NICKNAME_USUARIO`),
  UNIQUE KEY `CONTATO_UNIQUE` (`CONTATO`),
  UNIQUE KEY `SENHA_USUARIO_UNIQUE` (`SENHA_USUARIO`),
  UNIQUE KEY `CPF_USUARIO_UNIQUE` (`CPF_USUARIO`),
  UNIQUE KEY `CONTATO` (`CONTATO`),
  UNIQUE KEY `CONTATO_2` (`CONTATO`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIOS`
--

LOCK TABLES `USUARIOS` WRITE;
/*!40000 ALTER TABLE `USUARIOS` DISABLE KEYS */;
INSERT INTO `USUARIOS` VALUES (26,'Beto','Bet0','1333606088','$2a$08$QRQQPGB/in.haiXeoDsl0.Rm.dFyxSew7/DgSxRkxDH1/qWE/fF4W','1995-08-19','62321678801',NULL,'bet0@gmail.com'),(27,'Carlos','C4rlos','15 20828126','$2a$08$QRQQPGB/in.haiXeoDsl0.7THaE8YVrMHZiZD1D9xYrFhjb.O3Euu','1993-02-17','44459374013',NULL,'carlao@hotmail.com'),(28,'Gabi','G4b1Dantas','16 23782986','$2a$08$aI6KSNAPwBm6b8HYAvXsheL3BTiHUgX8EakFtznNDD36Pf4CTX9Ba','2006-04-06','04376313033',NULL,'gabi@gmail.com'),(29,'Gabriella Dantas Figueiredo','Dantas.Web','1431107687','$2a$08$3bAG/1X2qJnKrVsW97c5ru1jHO3DygDPUCZ8VuiWCdOVcXgJH1dua','2006-04-06','10154784419',NULL,'dantas@gmail.com'),(30,'Thomaz Vasconcelos Mendes','Gast3r','11940129090','$2a$08$tx1IrhK.N9liSrXo6221Z.nKYNVpA2ZtOUKhJWa66d7ppp3xlSru2','2006-08-26','47488089854',NULL,'gaster@gmail.com'),(31,'Giovani','Giov4ni','8134578863','$2a$08$siJQTtTLknLXsO/8g839oeuiBXRqxZdsZOplt9V6WJ1RO3SEH/G5O','2000-01-01','25204384014',NULL,'giovani@gmail.com'),(32,'Tupac Shakur','2pac','83992259905','$2a$08$GcK.1OH7aHTdupwWIR/FJeE8Hgi.2b8W3oQ3IvGZD0ig6FQtsmS7K','1995-11-21','74486630203',NULL,'2pac@hotmail.com'),(33,'Teste','teste','11942509494','$2a$08$bdH1Zy7XNxM/qZH8Tx5ixuvn3DAWOP2Vm9k30E8/wvdzjwim6ZpR.','1990-11-11','29558613835',NULL,'teste@gmail.com'),(34,'Teste','test3','11940129037','$2a$08$/qPuOFhoOevN4tWnwnkuMuutNSSEzC4Y0wqg23M3IwHV5qweRtIgm','2000-05-01','44444444455',NULL,'teste3@hotmail.com'),(35,'Teste','t3st3','11940129038','$2a$08$bezxAVZWl3.Fg0JgzdLT..HDZM1cA86gC/lP.EmGrjkVf4W1dTmKa','2000-05-01','43444444455',NULL,'t2ste3@hotmail.com'),(36,'Thomaz','Th0mzzz','11940129027','$2a$08$nAtQavt2JsgtluTnuKLAR.Uq3/bdAJQHu9sS43S7OVx26rX47FZ0G','2006-08-26','47488089855',NULL,'thomazvmendes@gmail.com');
/*!40000 ALTER TABLE `USUARIOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VIDEOS`
--

DROP TABLE IF EXISTS `VIDEOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VIDEOS` (
  `ID_VIDEOS` int(11) NOT NULL,
  `NOME_VIDEO` varchar(45) NOT NULL,
  `HASHTAG_VIDEO` varchar(30) DEFAULT NULL,
  `DESCR_VIDEO` varchar(300) DEFAULT NULL,
  `CAPA_VIDEO` blob,
  `CATEGORIA_ID_CATEGORIA` int(11) NOT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  PRIMARY KEY (`ID_VIDEOS`),
  KEY `fk_VIDEOS_CATEGORIA1_idx` (`CATEGORIA_ID_CATEGORIA`),
  KEY `fk_VIDEOS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_VIDEOS_CATEGORIA1` FOREIGN KEY (`CATEGORIA_ID_CATEGORIA`) REFERENCES `CATEGORIA` (`ID_CATEGORIA`),
  CONSTRAINT `fk_VIDEOS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VIDEOS`
--

LOCK TABLES `VIDEOS` WRITE;
/*!40000 ALTER TABLE `VIDEOS` DISABLE KEYS */;
/*!40000 ALTER TABLE `VIDEOS` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-25 17:37:31
