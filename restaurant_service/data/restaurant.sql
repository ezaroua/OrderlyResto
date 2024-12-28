-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3377
-- Généré le : dim. 22 déc. 2024 à 15:51
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `restaurant`
--

-- --------------------------------------------------------

--
-- Structure de la table `joinshopuser`
--

CREATE TABLE `joinshopuser` (
  `id_shop` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `joinshopuser`
--

INSERT INTO `joinshopuser` (`id_shop`, `id_user`, `firstname`, `lastname`) VALUES
(1, 1, 'José', 'Murinho'),
(1, 2, 'Sergio', 'Périt'),
(2, 3, 'Anne', 'Franck');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `id_shop` int(11) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id_product`, `product_name`, `description`, `id_shop`, `stock_quantity`, `price`) VALUES
(1, 'pates pesto', 'pates fraiches, pesto, parmesan', 1, 10, 7),
(2, 'nouilles sautees', 'nouilles, sauce soja, boeuf, haricots', 1, 12, 9),
(3, 'napolitaine', 'base tomate, champignon, mozzarella, basilic', 2, 3, 15),
(4, '4 fromages', 'mozzarella, bleu, emmental, gruyère', 2, 0, 14),
(5, 'empanadas poulet', 'pates maison, poulet, sauce curry, fromage', 3, 8, 6);

-- --------------------------------------------------------

--
-- Structure de la table `shop`
--

CREATE TABLE `shop` (
  `id_shop` int(11) NOT NULL,
  `shop_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `rating_count` int(11) DEFAULT NULL,
  `shop_rate` decimal(3,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `shop`
--

INSERT INTO `shop` (`id_shop`, `shop_name`, `address`, `city`, `postal_code`, `phone`, `rating_count`, `shop_rate`) VALUES
(1, 'restaurant 1', '10 Avenue Jean Jaurès', 'Lyon', 69007, '0406883377', 12, '3.0'),
(2, 'restaurant 2', '10 rue de la Paix', 'Lyon', 69006, '0411223344', 3, '2.9'),
(3, 'restaurant 3', '55 rue de la republique', 'Lyon', 69003, '0479523149', 0, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `foreign_key` (`id_shop`);

--
-- Index pour la table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id_shop`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `shop`
--
ALTER TABLE `shop`
  MODIFY `id_shop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_shop`) REFERENCES `shop` (`id_shop`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
