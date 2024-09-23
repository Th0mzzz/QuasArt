CREATE DATABASE  IF NOT EXISTS `b0ugzjkogcuw0zusl2np` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `b0ugzjkogcuw0zusl2np`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f41d366d-91e5-11e9-8525-cecd028ee826:1-142601293';

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
  `ID_AVALIACAO_RESENHA` int(11) NOT NULL AUTO_INCREMENT,
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
  `CATEGORIA_ID_CATEGORIA` int(11) DEFAULT NULL,
  `ID_CATEGORIA` int(11) DEFAULT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  `CAMINHO_CAPA` varchar(60) NOT NULL,
  `DATA_FICHA` date NOT NULL,
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
-- Table structure for table `PREVIAS`
--

DROP TABLE IF EXISTS `PREVIAS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PREVIAS` (
  `ID_PREVIAS` int(11) NOT NULL,
  `CAMINHO_PREVIA` varchar(50) NOT NULL,
  `FICHAS_ID_OBRA` int(11) NOT NULL,
  UNIQUE KEY `ID_PREVIAS_UNIQUE` (`ID_PREVIAS`),
  KEY `fk_PREVIAS_FICHAS1_idx` (`FICHAS_ID_OBRA`),
  CONSTRAINT `fk_PREVIAS_FICHAS1` FOREIGN KEY (`FICHAS_ID_OBRA`) REFERENCES `FICHAS` (`ID_OBRA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PREVIAS`
--

LOCK TABLES `PREVIAS` WRITE;
/*!40000 ALTER TABLE `PREVIAS` DISABLE KEYS */;
/*!40000 ALTER TABLE `PREVIAS` ENABLE KEYS */;
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
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  `VIDEOS_ID_VIDEOS` int(11) NOT NULL,
  PRIMARY KEY (`ID_RECOMENDACOES_VIDEOS`),
  KEY `fk_RECOMENDACOES_VIDEOS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  KEY `fk_RECOMENDACOES_VIDEOS_VIDEOS_idx` (`VIDEOS_ID_VIDEOS`),
  CONSTRAINT `fk_RECOMENDACOES_VIDEOS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`),
  CONSTRAINT `fk_RECOMENDACOES_VIDEOS_VIDEOS` FOREIGN KEY (`VIDEOS_ID_VIDEOS`) REFERENCES `VIDEOS` (`ID_VIDEOS`)
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
  `ID_RESENHAS` int(11) NOT NULL AUTO_INCREMENT,
  `TITULO_RESENHA` varchar(45) NOT NULL,
  `DESCR_RESENHA` varchar(400) NOT NULL,
  `TEXTO_RESENHA` mediumtext NOT NULL,
  `HASHTAG_RESENHA` varchar(1000) DEFAULT NULL,
  `NOTA_RESENHA` decimal(5,0) DEFAULT NULL,
  `CAPA_CAMINHO` varchar(30) DEFAULT NULL,
  `CATEGORIA_ID_CATEGORIA` int(11) DEFAULT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  PRIMARY KEY (`ID_RESENHAS`),
  KEY `fk_RESENHAS_CATEGORIA1_idx` (`CATEGORIA_ID_CATEGORIA`),
  KEY `fk_RESENHAS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_RESENHAS_CATEGORIA1` FOREIGN KEY (`CATEGORIA_ID_CATEGORIA`) REFERENCES `CATEGORIA` (`ID_CATEGORIA`),
  CONSTRAINT `fk_RESENHAS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESENHAS`
--

LOCK TABLES `RESENHAS` WRITE;
/*!40000 ALTER TABLE `RESENHAS` DISABLE KEYS */;
INSERT INTO `RESENHAS` VALUES (4,'Resenha teste','AAAAAAAAAAAA','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','#A1,#A2,#A3',NULL,'capaResenha-1719254132946.png',NULL,36),(5,'Creed, ele é muito daora','aaaaaaaaaa','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and','#aaaaaaaaaa a,#aaaaaaaaaa a,#aaaaaaaaaa',NULL,'capaResenha-1719258692646.png',NULL,36),(6,'God of War Valhalla é mt legal','Desfbrteghwrtnwymnytmmntmtumumu','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and','#god,#of,#war,#valhalla,#jogo,#bao,#mesmo,#eba,#eba',NULL,'capaResenha-1719258950126.png',NULL,36),(7,'Resenha do mcqueen','descrição','RESENHA MUITO LEGAL AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','#aaaaa,#aaa aa,#aaaaaaa a,#aa a,#aaaaaa',NULL,'capaResenha-1719449634846.png',NULL,36),(8,'God Of War Valhalla: MUITO DAORA MESMO','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','AASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','#cleitos',NULL,'capaResenha-1722195203033.png',NULL,36),(9,'AAAAA','AAAAAA','wdwdw','#AAAAAAA',NULL,'capaResenha-1723831494340.png',NULL,46),(10,'God of War Valhalla: Muito Bom!','aaaaaaaaaaaaaaaaa','KRATOSSSSSSSSSSSSSSSSSS ZEUSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ATENAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ARIEESSSSSSSSSSSSSSSSSSSSS','#aaa,#bomdeguerra,#kratos',NULL,'capaResenha-1723831638395.png',NULL,46),(11,'CREED','aaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ','#aaaaaaaaaa,#aaaaaaaaa',NULL,'capaResenha-1724247517199.png',NULL,36),(16,'Resenha teste','aaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','#aaaaaaaaaaaaaaaaaaaa',NULL,'capaResenha-1724960202978.png',NULL,36),(17,'Resenha teste','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA   AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','#AAAAAAAAAAAAAAAAAAAA',NULL,'capaResenha-1724960494853.png',NULL,36),(18,'Resenha teste','aaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','#aaaaaaaaaaaaaaaaaaaa',NULL,'capaResenha-1724960611891.png',NULL,36),(19,'God Of War Valhalla: MUITO DAORA MESMO','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','aaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAaa','#./app/public/img/ima',NULL,'capaResenha-1725042059815.png',NULL,36),(20,'Resenha teste','Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','#aaaaaaaaa,#aaaaaaaaaaaaaa',NULL,'capaResenha-1725303017275.png',NULL,36),(21,'aaaaa','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','',NULL,'capaResenha-1725992372643.png',NULL,36),(22,'aaaaa','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','',NULL,'capaResenha-1725992391340.png',NULL,36),(23,'Shadow o Ouriço','A estrela de todos os filmes e sagas do Sonic','O SHADOW!!!! É O SHADOW CARA\r\n\r\nShadow the Hedgehog[a] é um personagem que aparece na franquia de videogame Sonic the Hedgehog da Sega. Shadow foi criado por Takashi Iizuka e Shiro Maekawa, e estreou na edição de 2001 da série Sonic Adventure 2.[1] Embora essa fosse sua única aparição, Shadow provou ser tão popular entre os fãs que o desenvolvedor Sonic Team decidiu incluí-lo em Sonic Heroes de 2003.[2] Shadow desde então apareceu em várias entradas na franquia, incluindo um jogo spin-off autointitulado em 2005.[3] Ele também apareceu em adaptações para a televisão de Sonic, quadrinhos e mercadorias.\r\n\r\nDentro do universo fictício da franquia Sonic, Shadow é um ouriço preto antropomórfico imortal criado pelo Professor Gerald Robotnik, o avô do antagonista da série Doutor Eggman. Depois de testemunhar o assassinato de sua melhor amiga Maria, Shadow jura manter sua promessa a ela de que ele protegeria o mundo do perigo. Como um anti-herói, Shadow tem boas intenções, mas fará o que for preciso para atingir seus objetivos, colocando-o em conflito com o protagonista da série Sonic the Hedgehog. Shadow compartilha muitos atributos com Sonic e, portanto, controla de forma semelhante em jogos, mas se distingue pelo uso de veículos e armas de fogo.\r\n\r\nA ideia para Shadow teve origem durante o desenvolvimento do Sonic Adventure original em 1998, com Iizuka e Maekawa garantindo que ele seria um personagem sutil e \"legal\" com o qual os jogadores se importariam. Seu design foi influenciado por filmes como Underworld, Constantine e Terminator. Embora Shadow seja um dos personagens mais populares da série e tenha sido eleito um dos maiores personagens de videogame pelo Guinness World Records em 2011, ele provou ser um divisor de águas entre os jornalistas de videogame. Alguns elogiaram seu papel em Sonic Adventure 2 e a preservação de seus níveis do tema Sonic, mas outros criticaram sua caracterização sombria e exagerada. O jogo Shadow vendeu bem e recebeu críticas geralmente desfavoráveis.','#shadow,#sonic,#clereston,#arthur,#bruna,#ouriço,#shadowoouriço',NULL,'capaResenha-1726148351264.jpg',NULL,37);
/*!40000 ALTER TABLE `RESENHAS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TIPOS_DE_USUARIO`
--

DROP TABLE IF EXISTS `TIPOS_DE_USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TIPOS_DE_USUARIO` (
  `ID_TIPO_USUARIO` int(11) NOT NULL AUTO_INCREMENT,
  `TIPO_USUARIO` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_TIPO_USUARIO`),
  UNIQUE KEY `ID_TIPO_USUARIO_UNIQUE` (`ID_TIPO_USUARIO`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIPOS_DE_USUARIO`
--

LOCK TABLES `TIPOS_DE_USUARIO` WRITE;
/*!40000 ALTER TABLE `TIPOS_DE_USUARIO` DISABLE KEYS */;
INSERT INTO `TIPOS_DE_USUARIO` VALUES (1,'Viajante'),(2,'Tripulante'),(3,'Comandante'),(4,'ADMIN');
/*!40000 ALTER TABLE `TIPOS_DE_USUARIO` ENABLE KEYS */;
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
  `CAMINHO_FOTO` varchar(120) NOT NULL,
  `ID_TIPO_USUARIO` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE KEY `ID_USUARIO_UNIQUE` (`ID_USUARIO`),
  UNIQUE KEY `NICKNAME_USUARIO_UNIQUE` (`NICKNAME_USUARIO`),
  UNIQUE KEY `CONTATO_UNIQUE` (`CONTATO`),
  UNIQUE KEY `CPF_USUARIO_UNIQUE` (`CPF_USUARIO`),
  UNIQUE KEY `CONTATO` (`CONTATO`),
  UNIQUE KEY `CONTATO_2` (`CONTATO`),
  KEY `ID_TIPO_USUARIO_idx` (`ID_TIPO_USUARIO`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIOS`
--

LOCK TABLES `USUARIOS` WRITE;
/*!40000 ALTER TABLE `USUARIOS` DISABLE KEYS */;
INSERT INTO `USUARIOS` VALUES (26,'Beto','Bet0','1333606088','$2a$08$QRQQPGB/in.haiXeoDsl0.Rm.dFyxSew7/DgSxRkxDH1/qWE/fF4W','1995-08-19','62321678801',NULL,'bet0@gmail.com','perfil-padrao.webp',NULL),(27,'Carlos','C4rlos','15 20828126','$2a$08$QRQQPGB/in.haiXeoDsl0.7THaE8YVrMHZiZD1D9xYrFhjb.O3Euu','1993-02-17','44459374013',NULL,'carlao@hotmail.com','perfil-padrao.webp',NULL),(28,'Gabi','G4b1Dantas','16 23782986','$2a$08$aI6KSNAPwBm6b8HYAvXsheL3BTiHUgX8EakFtznNDD36Pf4CTX9Ba','2006-04-06','04376313033',NULL,'gabi@gmail.com','perfil-padrao.webp',NULL),(29,'Gabriella Dantas Figueiredo','Dantas.Web','1431107687','$2a$08$3bAG/1X2qJnKrVsW97c5ru1jHO3DygDPUCZ8VuiWCdOVcXgJH1dua','2006-04-06','10154784419',NULL,'dantas@gmail.com','perfil-padrao.webp',NULL),(30,'Thomaz Vasconcelos Mendes','Gast3r','11940129090','$2a$08$tx1IrhK.N9liSrXo6221Z.nKYNVpA2ZtOUKhJWa66d7ppp3xlSru2','2006-08-26','47488089854',NULL,'gaster@gmail.com','perfil-padrao.webp',NULL),(31,'Giovani','Giov4ni','8134578863','$2a$08$siJQTtTLknLXsO/8g839oeuiBXRqxZdsZOplt9V6WJ1RO3SEH/G5O','2000-01-01','25204384014',NULL,'giovani@gmail.com','perfil-padrao.webp',NULL),(32,'Tupac Shakur','2pac','83992259905','$2a$08$GcK.1OH7aHTdupwWIR/FJeE8Hgi.2b8W3oQ3IvGZD0ig6FQtsmS7K','1995-11-21','74486630203',NULL,'2pac@hotmail.com','perfil-padrao.webp',NULL),(33,'Teste','teste','11942509494','$2a$08$bdH1Zy7XNxM/qZH8Tx5ixuvn3DAWOP2Vm9k30E8/wvdzjwim6ZpR.','1990-11-11','29558613835',NULL,'teste@gmail.com','perfil-padrao.webp',NULL),(34,'Teste','test3','11940129037','$2a$08$/qPuOFhoOevN4tWnwnkuMuutNSSEzC4Y0wqg23M3IwHV5qweRtIgm','2000-05-01','44444444455',NULL,'teste3@hotmail.com','perfil-padrao.webp',NULL),(35,'Teste','t3st3','11940129038','$2a$08$bezxAVZWl3.Fg0JgzdLT..HDZM1cA86gC/lP.EmGrjkVf4W1dTmKa','2000-05-01','43444444455',NULL,'t2ste3@hotmail.com','perfil-padrao.webp',NULL),(36,'Thomaz','Th0mzzz','11940129027','$2a$08$eHdQw2CjaXqD7vsQfmB2nOiFF8GLvKn9kRE2LCv.OMvp1u/AqJ5hu','2006-08-26','47488089855',NULL,'thomazzzz@gmail.com','imgPerfil-1726590639835.png',NULL),(37,'Bruna Lopes Rodrigues','Bruna','11954531234','$2a$08$4klLuIqGtBdTux4Niy7XcuF414z6JH8Ln.kXPVile35yenEWgDotO','2006-09-15','47511840833',NULL,'rm86701@estudante.fieb.edu.br','imgPerfil-1726570748753.jpg',NULL),(38,'Thomaz vasconcelos Mendes','TesteUsuario','1299156160','$2a$08$0wPSb3PAAIW5iSlQVlieNufw.EeokernCDuEgpW/qiLOzNQWCTdWG','1997-12-28','95454371033',NULL,'testeusuario@gmail.com','perfil-padrao.webp',NULL),(39,'Gabi','UserTest','11961169509','$2a$08$JQSZO.ETxaXT61m4OSO.au.JGGQ3DNm.b/nX3LhMYEzbUrp4qXoLW','2003-06-28','37252671976',NULL,'test@gmail.com','perfil-padrao.webp',NULL),(40,'GIOVANNI','GiovanniProf','8235857887','$2a$08$MTCNIQOcNo4nN28AW9l2jOA0yMW.sybaBlfsEJCBLMkMdd5KwdKOq','2000-11-11','03206301025',NULL,'Giovanni@gmail.com','perfil-padrao.webp',NULL),(41,'Tifanny','tifanny','11957852648','$2a$08$6wNzI19OR2eJP/nqUh9mWuqSh0Qb9fwMhIq6wewOdBMOnmwrH9SRK','2006-06-28','56012095880',NULL,'tifannysouza@gmail.com','perfil-padrao.webp',NULL),(42,'Mariana Ferraz','F3rraz','6128777523','$2a$08$Zwg6ThVcUqj4/AELftD9.ulEV/wUA6GrKAXjOGP2LEQFdam/0ILHa','2000-01-19','83473643033',NULL,'mariana@gmail.com','imgPerfil-1723560694380.png',NULL),(44,'Sophia Ferreira de Araújo','SosoLinda','11975270585','$2a$08$Zwg6ThVcUqj4/AELftD9.uyUcopue8czhwewd.ChQAmujvxfe8cYC','2007-03-29','51943996857',NULL,'sosolinda@gmail.com','imgPerfil-1723561977003.jpg',NULL),(45,'Dwayne Johnson','TheRock','1735315687','$2a$08$Hdegr16IC2jDPl7UcleWz.NMiGe/Ib3dY.LWjgDErVOv4TX9Nokfy','1972-05-02','12479012034',NULL,'theRock@gmail.com','imgPerfil-1723643265585.jpg',NULL),(46,'Filipe dos Santos Inácio','F1l1pus','11942509495','$2a$08$EC7dWNT1ZN.bqWKf5zRR0.d5YL3HMQKbLCter8onhGtfD6Txm8taS','2007-04-07','43238713841',NULL,'flpus92@gmail.com','perfil-padrao.webp',NULL),(47,'Teste','TesteUser','6398163496','$2a$08$UQD0xgMo5aLTpQ17QAxj2OnAgTX4z5muez7gKRgSdM9MQ68HvhoJq','2000-05-02','43152779089',NULL,'testeuser@gmail.com','perfil-padrao.webp',NULL),(48,'teteu','mateteu','11997285877','$2a$08$xqe0rWQtOnbxl317AXRVje04d23MCSC5UmNK8auOqR1MUGYgQqhhq','2006-10-01','54090993890',NULL,'matheus_morais06@gmail.com','perfil-padrao.webp',NULL),(49,'marcos','marcus1','1105075977','$2a$08$zNLAxWZ6/iHsTXg1UrPLKOr4yDc42.bD9FtxRwRGgZ6AJ1PylSq5y','2006-10-01','43675181839',NULL,'matheus_morais06@yahoo.com.br','perfil-padrao.webp',NULL),(50,'Arthur Mendes','Lazully','1194304578','$2a$08$Ns6huLgYX6yLrrbnI1aOi.Wdqq8/mG8kbEY5PAAULuH.N/VKJoT6y','2007-05-09','93248092025',NULL,'Lazully@gmail.com','perfil-padrao.webp',NULL),(51,'Teste da silva','T3ste','8520884359','$2a$08$rVSS7CN7T0zJihMBsQcc0.Jv1OfjbGKDCAVwfq5LmTuu3sCUReAHC','2000-12-20','97805509921',NULL,'testedasilva@gmail.com','imgPerfil-1725307017098.png',NULL),(52,'Thulio Gordo da Silva','G0rdoRs','9525616242','$2a$08$yhvwPsPaY2.hSq/O9PLX0uqcO2ZcnEXfTrWAa5UPZP6DieJuH..Xu','2000-02-08','26388938388',NULL,'thuliogordin@gmail.com','imgPerfil-1725492711528.jpg',NULL),(55,'Thais','th4t4','2725968385','$2a$08$yhvwPsPaY2.hSq/O9PLX0uqcO2ZcnEXfTrWAa5UPZP6DieJuH..Xu','2007-04-27','86260151861',NULL,'thais@gmail.com','perfil-padrao.webp',NULL),(56,'Thomaz Vasconcelos Mendes','TESTEEE','6236634312','$2a$08$Yr.41ekzqR.caGFqr2RmHeTUXaCr4Swshtg41yj2R6xKuVO4depTC','2000-02-01','68764645800',NULL,'teste02@gmail.com','perfil-padrao.webp',NULL),(57,'Thomaz Vasconcelos Mendes','TESTE03','8934833572','$2a$08$VfcenYPI241XRCuo6Q0FYuS3UZOihutNYz22d3E5euzaLyBRGqBea','2000-02-20','64817917156',NULL,'teste03@gmail.com','imgPerfil-1725493579369.png',NULL),(58,'Teste da silva ','Teste04','7927609377','$2a$08$VfcenYPI241XRCuo6Q0FYuS3UZOihutNYz22d3E5euzaLyBRGqBea','2000-02-02','03711208452',NULL,'teste04@gmail.com','perfil-padrao.webp',NULL),(59,'Soso Linda','S0s0Lind4','9699979811','$2a$08$xJC9ysZ0vM9T2UIu86OfAebvJKXr5BFiT/dea.ohO8eOIRDSICUvG','2000-12-30','34102406409',NULL,'sosolindateste@gmail.com','imgPerfil-1725621624959.jpg',NULL),(60,'Thomaz Vasconcelos Mendes','Teste10','6332657012','$2a$08$UV0kXCY82hMon2rpX/Up6e0stRzNafT/ZAaDSd7QqqJ3IYPWMUjDW','2000-02-12','30936366800',NULL,'teste10@gmail.com','imgPerfil-1725747138326.jpg',NULL),(61,'Thais Vasconcelos Mendes Linda','thaiismorango','11940842194','$2a$08$obDNE8zo13JWnrfuJrgWq.xHUoAX/gUWSImvsUl/jBAn7AskYtmKy','2000-04-27','47488076877',NULL,'thaiisvasconcelosmendess@gmail.com','perfil-padrao.webp',NULL),(62,'Fernanda Rodrigues da Silva','Fernanda','11983606681','$2a$08$BJEzBbM2wOnjQ6FmmLAwPutLx6myaehcM0TlttuX57d9jM/9Kzyu.','1999-04-10','24328330829',NULL,'fernanda.rodrigues22012@gmail.com','perfil-padrao.webp',NULL),(63,'Shadow o Ouriço','Shadow','11954696329','$2a$08$dpa1GhKAYzFG59ujbX5tgOCta.tgiCKqR4/R6RC.qhMehe7yS5j5i','2001-09-13','00814471080',NULL,'shadow@gmail.com','imgPerfil-1726571038219.jpg',NULL),(66,'Knuckles','Knukcles','11943214321','$2a$08$TXR3niVVF0O/g7omBkk/suMPnhvD20yhmrk6e.If/MJARofWJq32O','2006-05-01','42131187033',NULL,'knuckles@gmail.com','imgPerfil-1726571528109.png',NULL),(67,'Sonic o Ouriço','Sonic','11912344321','$2a$08$TXR3niVVF0O/g7omBkk/sun0a0o00ESlHKCo08hBId4QSBq.YwMrS','2006-09-15','48461384024',NULL,'sonic@gmail.com','imgPerfil-1726582562277.jpg',NULL),(68,'Arthur Lourenço','Lazullyz','11943014578','$2a$08$TXR3niVVF0O/g7omBkk/suh9TzksoHpq2PI793Zd7FH8GuWUAkz9K','2007-05-09','79463863036',NULL,'Lazullyz@gmail.com','perfil-padrao.webp',NULL);
/*!40000 ALTER TABLE `USUARIOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VIDEOS`
--

DROP TABLE IF EXISTS `VIDEOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VIDEOS` (
  `ID_VIDEOS` int(11) NOT NULL AUTO_INCREMENT,
  `NOME_VIDEO` varchar(120) NOT NULL,
  `HASHTAG_VIDEO` varchar(100) DEFAULT NULL,
  `DESCR_VIDEO` varchar(400) NOT NULL,
  `CAPA_VIDEO` varchar(60) NOT NULL,
  `CATEGORIA_ID_CATEGORIA` int(11) DEFAULT NULL,
  `USUARIOS_ID_USUARIO` int(11) NOT NULL,
  `CAMINHO_VIDEO` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_VIDEOS`),
  KEY `fk_VIDEOS_CATEGORIA1_idx` (`CATEGORIA_ID_CATEGORIA`),
  KEY `fk_VIDEOS_USUARIOS1_idx` (`USUARIOS_ID_USUARIO`),
  CONSTRAINT `fk_VIDEOS_CATEGORIA1` FOREIGN KEY (`CATEGORIA_ID_CATEGORIA`) REFERENCES `CATEGORIA` (`ID_CATEGORIA`),
  CONSTRAINT `fk_VIDEOS_USUARIOS1` FOREIGN KEY (`USUARIOS_ID_USUARIO`) REFERENCES `USUARIOS` (`ID_USUARIO`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VIDEOS`
--

LOCK TABLES `VIDEOS` WRITE;
/*!40000 ALTER TABLE `VIDEOS` DISABLE KEYS */;
INSERT INTO `VIDEOS` VALUES (1,'harry potter','#AAAAAAAAAAAAAAA,#AAAAAAAAAAAAAA','AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA','capaVideo-1726190573260.png',NULL,36,'video-1726190573262.mp4'),(2,'Ponte sombria','#A,#AAAAAAAAAAA','AAAAAAAAAAAAA','capaVideo-1726191216691.png',NULL,36,'video-1726191216694.mp4'),(3,'Above the clouds','#travis','AAAAAAAAAAAAAAAAAAAAA','capaVideo-1726250041459.png',NULL,36,'video-1726250041465.mp4');
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

-- Dump completed on 2024-09-17 13:56:26