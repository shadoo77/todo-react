-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Gegenereerd op: 19 nov 2018 om 18:52
-- Serverversie: 5.7.23
-- PHP-versie: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactdb`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `hashes`
--

DROP TABLE IF EXISTS `hashes`;
CREATE TABLE IF NOT EXISTS `hashes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hash` (`hash`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `hashes`
--

INSERT INTO `hashes` (`id`, `hash`) VALUES
(5, '$2a$10$c.5FEBOhmCpsKeKhrk71qeYdIeqAM/HghoEzKKZL7EXDK6XWfvqAS'),
(3, '$2a$10$ierDJtXnUHi6reTbNvR2UuRzeaCI/LoqWfA7cpZmBL7Pn2khoXYye'),
(2, '$2a$10$KE0F3bedYUg.2vDsknvkxu2MzPD82DEJHRAVak9tV9y46WAd1DHu2'),
(7, '$2a$10$KNXzCnk/CFHp88ISwqrNVubmIVG4NdiZDImNpxfuorYFj5AYTz3Mm'),
(6, '$2a$10$uWizb2F6/XS2FcjoH50i7uZM5k1b6FenQVO6bV8sADFZ8hJ8uz5iW'),
(4, '$2a$10$XY7FKUaDXzdXk/hyWqw3NeTNkSa0Ro9YEKkgWr7jaRDnXjOjUJd0S');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` varchar(255) NOT NULL,
  `task` varchar(255) NOT NULL,
  `done` tinyint(1) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `items`
--

INSERT INTO `items` (`id`, `task`, `done`, `user_id`) VALUES
('1', 'Going to huisarts dr. Tuna', 0, '215cbfd8-d3cc-4c0b-8fe4-24108b2737a1'),
('10', 'Let\'s try it Nour!', 1, '215cbfd8-d3cc-4c0b-8fe4-24108b2737a1'),
('1893df66-8ec4-4d48-b16e-e411143d362b', 'And now', 0, '215cbfd8-d3cc-4c0b-8fe4-24108b2737a1'),
('2', 'Learning React js', 1, '98fd9dc8-de43-4b6a-b64e-e65e1e41af6d'),
('3', 'Finishing the homework for this week', 0, '98fd9dc8-de43-4b6a-b64e-e65e1e41af6d'),
('693ec691-a54d-4bf2-a269-1d7ae39e08a5', 'watching match between Netherlands and Germany', 1, '215cbfd8-d3cc-4c0b-8fe4-24108b2737a1'),
('7', 'Welcome!', 1, '98fd9dc8-de43-4b6a-b64e-e65e1e41af6d'),
('9', 'hoi shadoo weer!', 1, '98fd9dc8-de43-4b6a-b64e-e65e1e41af6d');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(255) NOT NULL,
  `firstname` char(32) DEFAULT NULL,
  `lastname` char(32) DEFAULT NULL,
  `username` char(32) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `pass_id` (`pass_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `email`, `pass_id`) VALUES
('215cbfd8-d3cc-4c0b-8fe4-24108b2737a1', 'Nour', 'Omar', 'Nour', 'test@gmail.com', 3),
('98fd9dc8-de43-4b6a-b64e-e65e1e41af6d', 'Shadi', 'Amr', 'shadi', 'shadi.omar077@gmail.com', 2),
('cf8f20c9-ea09-4e8c-9d6c-4580bf27ac22', 'Lana', 'Omar', 'Lana', 'test1@gmail.com', 5),
('f20783e0-2c3b-4aa2-9e77-13a6067c44d9', 'Belal', 'Hamzeh', 'Bolbol', 'belal85@hotmail.com', 4),
('f5015661-9358-4cc2-928a-6f2292f792e7', 'Piet', '123456', 'Peter', 'test@gmail.ney', 7);

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `fk_item_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Beperkingen voor tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_pass` FOREIGN KEY (`pass_id`) REFERENCES `hashes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
