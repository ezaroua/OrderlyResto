-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 23 nov. 2024 à 18:13
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `order_service`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`client_id`, `phone`, `address`, `city`, `postal_code`, `user_id`) VALUES
(1, '+330638714263', '18 Rue Voltaire', 'Lyon', '69008', 1),
(2, '+33063871424', '35c Rue Avion', 'Villeurbanne', '69100', 2),
(4, '+33607353421', '10 Rue Je sais pas', 'Ville-sur-Fleuve', '17890', 3);

-- --------------------------------------------------------

--
-- Structure de la table `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `delivery_id` int(11) DEFAULT NULL,
  `status` enum('draft','pending','preparing','out_for_delivery','delivered','canceled') NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `client_note` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `order`
--

INSERT INTO `order` (`order_id`, `shop_id`, `client_id`, `delivery_id`, `status`, `total_amount`, `items`, `order_date`, `client_note`) VALUES
(1, 1, 1, 2, 'draft', '19.99', '[{\"product_id\": 37, \"quantity\": 2}, {\"product_id\": 58, \"quantity\": 1, \"special_demand\": \"Pas de champignons\"}]', '2024-11-17 15:00:37', 'code de la porte : 78b9'),
(2, 2, 1, 3, 'pending', '14.99', '[{\"product_id\": 3, \"quantity\": 1}]', '2024-11-17 15:01:35', 'code de la porte : 78b97777'),
(3, 1, 2, 3, 'pending', '13.99', '[{\"product_id\":37,\"quantity\":2},{\"product_id\":18,\"quantity\":1}]', '2024-11-23 15:41:24', 'Pas de vinaigre'),
(7, 1, 0, 3, 'draft', '9.99', '[{\"product_id\":37,\"quantity\":2},{\"product_id\":18,\"quantity\":1}]', '2024-11-23 16:28:43', 'Pas de vinaigre'),
(8, 0, 2, 5, 'draft', '9.99', '[{\"product_id\":37,\"quantity\":2},{\"product_id\":18,\"quantity\":1}]', '2024-11-23 17:11:14', 'Full vinaigre');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`);

--
-- Index pour la table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
