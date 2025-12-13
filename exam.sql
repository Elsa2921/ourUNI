-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2025 at 01:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `exam_results`
--

CREATE TABLE `exam_results` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `time` date NOT NULL,
  `is_qualified` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `exam_results`
--

INSERT INTO `exam_results` (`id`, `exam_id`, `student_id`, `points`, `time`, `is_qualified`) VALUES
(1, 1, 11, 7, '2025-12-12', 1),
(2, 1, 1, 12, '2025-12-12', 1),
(3, 1, 41, 7, '2025-12-12', 0),
(4, 2, 41, 24, '2025-12-13', 1),
(5, 2, 11, 15, '2025-12-13', 1),
(6, 2, 1, 8, '2025-12-13', 0);

-- --------------------------------------------------------

--
-- Table structure for table `exam_start`
--

CREATE TABLE `exam_start` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `exam_duration` int(3) NOT NULL,
  `min_points` int(1) NOT NULL,
  `max_points` int(3) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `exam_name` varchar(50) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `exam_start`
--

INSERT INTO `exam_start` (`id`, `test_id`, `exam_duration`, `min_points`, `max_points`, `start_time`, `end_time`, `exam_name`, `status`) VALUES
(1, 1, 8, 7, 18, '2025-12-12 15:48:38', '2025-12-12 12:17:00', 'programming exam 1', '0'),
(2, 2, 4, 10, 24, '2025-12-12 18:37:53', '2025-12-12 14:40:21', 'PHP exam 1', '0');

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

CREATE TABLE `faculties` (
  `id` int(11) NOT NULL,
  `faculty` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `faculties`
--

INSERT INTO `faculties` (`id`, `faculty`) VALUES
(9, 'Faculty of Agriculture & Environmental Studies'),
(8, 'Faculty of Architecture & Urban Planning'),
(7, 'Faculty of Arts & Design'),
(2, 'Faculty of Business & Economics'),
(6, 'Faculty of Education'),
(4, 'Faculty of Health & Life Sciences'),
(3, 'Faculty of Humanities & Social Sciences'),
(10, 'Faculty of International Relations & Diplomacy'),
(5, 'Faculty of Law'),
(1, 'Faculty of Science & Technology');

-- --------------------------------------------------------

--
-- Table structure for table `professors`
--

CREATE TABLE `professors` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `phone_code` varchar(5) DEFAULT NULL,
  `pin_code` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `professors`
--

INSERT INTO `professors` (`id`, `full_name`, `email`, `password`, `phone`, `phone_code`, `pin_code`) VALUES
(1, 'Arman Petrosyan', 'arman.petrosyan@example.com', '$2y$10$VGKWoxQhr9dAF.2WIM4z8u8jGY8VmtawbEqbJ3PmIrFZgm1EKWcgm', '90300001', '+374', 482915),
(2, 'Lilit Harutyunyan', 'lilit.harutyunyan@example.com', '$2y$10$Q17n5X3lNgmLFU5y6p8NlO0HYCluiuoPrhRkt7kUUgDI1RvHGSqwa', '90300002', '+374', 719284),
(3, 'Gor Sargsyan', 'gor.sargsyan@example.com', '$2y$10$cgrnnLCvRBwOhQLBEFVvWeyIzpOsntRnHBG0UdF31r4XEd2qQgtNS', '90300003', '+374', 159487),
(4, 'Anahit Mkrtchyan', 'anahit.mkrtchyan@example.com', '$2y$10$66QNZ7VOV45b8cF3/9/equ91LzJljH6ZaX6VLhK7Dd6A17lWxn4my', '90300004', '+374', 824693),
(5, 'Tigran Avetisyan', 'tigran.avetisyan@example.com', '$2y$10$R0xxGmZqHuTmemqz3dOQj.HhBulBwuQHNfaMnYbBzOfChO/JA0MNi', '90300005', '+374', 962841),
(6, 'Sona Khachatryan', 'sona.khachatryan@example.com', '$2y$10$QSwiSl4F4pDC8LFtyz6iMOf.IZ4enQbrnwe.FmzhbKxUxul2nUF5m', '90300006', '+374', 358426),
(7, 'Karen Hovhannisyan', 'karen.hovhannisyan@example.com', '$2y$10$LPI6Ww/aPuMhOvAnDnDHMeju7nHU.qRRAW46AsbeTj1B3EtFre5X6', '90300007', '+374', 284619),
(8, 'Nare Vardanyan', 'nare.vardanyan@example.com', '$2y$10$8.eKJ27MSYVC5WBjyQImZeyooSIqjiO/QSTdFxejuTTRP0XWoG79S', '90300008', '+374', 693571),
(9, 'Hayk Hakobyan', 'hayk.hakobyan@example.com', '$2y$10$ErYmqtGEbDdeakEp9NQt4O99eE3Fz/PdDg8skLBgR7b4cbAH7pzEa', '90300009', '+374', 571924),
(10, 'Mariam Galstyan', 'mariam.galstyan@example.com', '$2y$10$2PPx3dtwjjfMeKeS.QbHhuET9XuCDpCGzh2fDybKhQhQXBosGTwU2', '90300010', '+374', 947215),
(11, 'Edgar Minasyan', 'edgar.minasyan@example.com', '$2y$10$lGOc3sYvClYV33AEKBFS4e66bmcHZeVRUX8jB5zGS/8Kkz8PmmXnS', '90300011', '+374', 284715),
(12, 'Ani Stepanyan', 'ani.stepanyan@example.com', '$2y$10$qUFvSCesF3ai.E1bUli6feAXIYcA/vagywwD9w5YxG4QYFWUr/2gy', '90300012', '+374', 185942),
(13, 'Levon Danielyan', 'levon.danielyan@example.com', '$2y$10$XDc/juJiIdKPaKgzp7qCrOL2mRnooQVePt1LNgRbEGt64bpb4PbWu', '90300013', '+374', 692844),
(14, 'Tatevik Simonyan', 'tatevik.simonyan@example.com', '$2y$10$y7qaU2WaSaKnfJtzUspi4..uy5ujRmYc9aPQeD1RMNh29klih0ngW', '90300014', '+374', 461928),
(15, 'Artur Gevorgyan', 'artur.gevorgyan@example.com', '$2y$10$EMFbaXdM6Y5e3jB5TmDqlewhxHWpq.WqheFoAl83rCA2LltC.ttrK', '90300015', '+374', 918437),
(16, 'Eliza Sahakyan', 'eliza.sahakyan@example.com', '$2y$10$gBeODABGmrNy4wx8.31psuN7xbKF5vZeyVpqqf63zIH50tKgSu0x2', '90300016', '+374', 734826),
(17, 'Hrach Martirosyan', 'hrach.martirosyan@example.com', '$2y$10$ORVt.dcQqXfoW5oqtAauWuJJtHhT0nWU4.iyIr3qJUUaEFZSXEXhO', '90300017', '+374', 268349),
(18, 'Liana Arakelyan', 'liana.arakelyan@example.com', '$2y$10$1bWYGNF.GC1UQ3f4wgXGyesFE6w3PwKh9fU1qJM8jS8TrTfyUTl2W', '90300018', '+374', 954128),
(19, 'Samvel Karapetyan', 'samvel.karapetyan@example.com', '$2y$10$y5.pdg3oYvgmG18fE8ebJuJdTBN8dPjqVmKvS1oGzQZdFRP9ggJim', '90300019', '+374', 842691),
(20, 'Arpi Melkonyan', 'arpi.melkonyan@example.com', '$2y$10$DYXbmxaEGOqjPumqY/wCSeoM2r6bNSoZ1PTv3ql0013H4ohHjhg5G', '90300020', '+374', 163489);

-- --------------------------------------------------------

--
-- Table structure for table `prof_subjects`
--

CREATE TABLE `prof_subjects` (
  `id` int(11) NOT NULL,
  `prof_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `prof_subjects`
--

INSERT INTO `prof_subjects` (`id`, `prof_id`, `subject_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 4),
(5, 3, 5),
(6, 3, 6),
(7, 4, 7),
(8, 4, 8),
(9, 5, 9),
(10, 5, 10),
(11, 6, 11),
(12, 6, 12),
(13, 7, 13),
(14, 7, 14),
(15, 8, 15),
(16, 8, 16),
(17, 9, 17),
(18, 9, 18),
(19, 10, 19),
(20, 10, 20),
(21, 11, 21),
(22, 11, 22),
(23, 12, 23),
(24, 12, 24),
(25, 13, 25),
(26, 13, 26),
(27, 14, 27),
(28, 14, 28),
(29, 15, 29),
(30, 15, 30),
(31, 16, 31),
(32, 16, 32),
(33, 17, 33),
(34, 17, 34),
(35, 18, 35),
(36, 18, 36),
(37, 19, 37),
(38, 19, 38),
(39, 20, 39),
(40, 20, 40);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `faculty_id` int(11) DEFAULT NULL,
  `phone_code` varchar(5) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `distance_learning` tinyint(1) NOT NULL,
  `pin_code` int(11) NOT NULL,
  `year_level` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `full_name`, `email`, `password`, `faculty_id`, `phone_code`, `phone`, `distance_learning`, `pin_code`, `year_level`) VALUES
(1, 'Arman Hakobyan', 'arman.hakobyan@example.com', '$2y$10$SWUs0q2LEU9tEU.ljRWN8.DL.s7se8HT0Jdv3XWwOm8UfZcPUu6VS', 1, '+374', '90000001', 0, 482915, 1),
(2, 'Lilit Grigoryan', 'lilit.grigoryan@example.com', '$2y$10$N8xxJ5Y2i.WY.P7jj8MHMuEFCcVSKVuF17UQH73FU/VCNCxGi8MjW', 2, '+374', '90000002', 1, 625323, 2),
(3, 'Narek Sargsyan', 'narek.sargsyan@example.com', '$2y$10$tdi3Py81p8o.2DsFKSL2AeyMEkUoc0mrCvICChvCmqcOGmSqBcanu', 3, '+374', '90000003', 0, 760231, 1),
(4, 'Mariam Petrosyan', 'mariam.petrosyan@example.com', '$2y$10$ODl5RzSeWfm872p78FBaJ.ye7PRB3wrJNMYHVZfVj0kv9xkTfudyq', 4, '+374', '90000004', 1, 550009, 3),
(5, 'Hayk Mkrtchyan', 'hayk.mkrtchyan@example.com', '$2y$10$xJfNCiL0MD7BTb8ELHXts.Tmk6EZlQ8EK3Q/4AE/paBmQW.0THR3q', 5, '+374', '90000005', 0, 120987, 2),
(6, 'Sona Danielyan', 'sona.danielyan@example.com', '$2y$10$N9NUBGQCYv3OPU0CSlYN1uFQjQZPuPDeTRKxteT5W4b80kQJyOOty', 6, '+374', '90000006', 0, 998877, 1),
(7, 'Tigran Khachatryan', 'tigran.khachatryan@example.com', '$2y$10$tKzhlYsN9VmzuSrkJR5DG.JUnESmrXc4a/NUvczwXXCzOz.gmbtge', 7, '+374', '90000007', 1, 123434, 2),
(8, 'Ani Simonyan', 'ani.simonyan@example.com', '$2y$10$pVoQ82ULqwy1k.gKOlwzNufwRwankvhSMpkqvMnJYKBuqeTXJEZ.m', 8, '+374', '90000008', 0, 445566, 3),
(9, 'Levon Babayan', 'levon.babayan@example.com', '$2y$10$NYs/KUbKCiESJioybA1YH.h4uncCvuPZMwxTAZ8hS.pUrnM5oJKR.', 9, '+374', '90000009', 1, 223344, 1),
(10, 'Hasmik Vardanyan', 'hasmik.vardanyan@example.com', '$2y$10$AkPvWH6ysVYaXSuqMRHA1.M0xsUUWQsJDiuAW8/SaFzGvGp3fd7zi', 10, '+374', '90000010', 0, 667788, 2),
(11, 'Gohar Arshakyan', 'gohar.arshakyan@example.com', '$2y$10$o08lBc/Q9JNvQnpfAoRNAOJGUTx9LL/NHztVT8NT5o2v.2CzWNfiy', 1, '+374', '90000011', 0, 314159, 1),
(12, 'Artur Meliksetyan', 'artur.meliksetyan@example.com', '$2y$10$08.upXJz9MfRNQOXvvwIpO7dQdDuIKvUzEAvRdYEarwD5e7NMow72', 2, '+374', '90000012', 1, 271828, 3),
(13, 'Vardan Karapetyan', 'vardan.karapetyan@example.com', '$2y$10$ctLM/jW2/8eorQHNAl1toeWpI7lN0iuKtDiVlbzjIyxLZrN8nK1fi', 3, '+374', '90000013', 0, 141421, 2),
(14, 'Sofi Nazaryan', 'sofi.nazaryan@example.com', '$2y$10$0XsQrP0bGefO1QU0Vvv69.qHmNDoKhLC/WqWyngzTUwzpvMMdMf3y', 4, '+374', '90000014', 1, 867530, 1),
(15, 'Kristina Mirzoyan', 'kristina.mirzoyan@example.com', '$2y$10$/SfxOOVoM.IdTyXYiLD9d.VanP6qnLFjxU.tYHbtpkwOiYh6NaD8.', 5, '+374', '90000015', 0, 555000, 3),
(16, 'Arsen Hovsepyan', 'arsen.hovsepyan@example.com', '$2y$10$Si/oAdaxCVdCulEuh06EkuXgf5Uj.m8glXc/Mg/cXsKLR7zIZ.crG', 6, '+374', '90000016', 1, 100200, 2),
(17, 'Marina Sargsyan', 'marina.sargsyan@example.com', '$2y$10$i3eiWOy5UZ3tIiO8LrUDFe9rerYewFqyFL9Dq.Rwk9DYeXFjYAD1.', 7, '+374', '90000017', 0, 333666, 1),
(18, 'Petros Martirosyan', 'petros.martirosyan@example.com', '$2y$10$r53l4IKSrhjaUt7rQB7QcuLDvdTBW2bgfoxDrXl47KC/n6Gkfy5SG', 8, '+374', '90000018', 1, 777777, 2),
(19, 'Elena Hovhannisyan', 'elena.hovhannisyan@example.com', '$2y$10$pEGECu399Y0yvt3ycjplL.UvG8LkKy8WQs.EjaoK9zXnr.K32xVU.', 9, '+374', '90000019', 0, 864209, 3),
(20, 'David Galstyan', 'david.galstyan@example.com', '$2y$10$JFg2jIZLiYjaeuukbQ7OluxnIcJo2eK2NCpbKYkkGKbd/2IQAkpUe', 10, '+374', '90000020', 1, 424242, 1),
(21, 'Araks Yeritsyan', 'araks.yeritsyan@example.com', '$2y$10$TfjoGL2fMIN2w2jRdYkYZefeoL139JwXvO7j5vP44QRdf6.mwLqeW', 1, '+374', '90000021', 0, 781244, 2),
(22, 'Karen Manukyan', 'karen.manukyan@example.com', '$2y$10$jWR095yQp2byrIp8rTmXS.V0ZqQJ022pYwOzM5qZcFeO51z0F4ZF.', 2, '+374', '90000022', 1, 442200, 3),
(23, 'Nune Avetisyan', 'nune.avetisyan@example.com', '$2y$10$emzFXATSGGy2emJohW5GmOzSie.p1nAFMqGYGF8iLjQFY/NAzPADK', 3, '+374', '90000023', 0, 909090, 1),
(24, 'Aram Koryunyan', 'aram.koryunyan@example.com', '$2y$10$qCWpqOcTefMTYqFMm9c42.8P0NIaNwoTHHjmWHW.8bL4sONSrysgy', 4, '+374', '90000024', 1, 650001, 2),
(25, 'Inesa Stepanyan', 'inesa.stepanyan@example.com', '$2y$10$jNqPeCJK/5miB91YmRfUlu35v0yDyW21er/P9ho3deo3GqKjnpKAe', 5, '+374', '90000025', 0, 123450, 3),
(26, 'Vazgen Arzumanyan', 'vazgen.arzumanyan@example.com', '$2y$10$c7ZL7Zw535bk38Wok2XBCe5VxF3IU15nbqIKNRASXl8bS1KDLeOx.', 6, '+374', '90000026', 1, 234561, 2),
(27, 'Lika Melkumyan', 'lika.melkumyan@example.com', '$2y$10$/NtLp4reiCfMDxkgoyNieeYo1am1yt/UBgIRfe5FZ/Rhr9upl3n1q', 7, '+374', '90000027', 0, 345672, 1),
(28, 'Garegin Avagyan', 'garegin.avagyan@example.com', '$2y$10$xelv8XjwOjtKcbsliH4vMuR0fuKSctf3bR7DJOaFLI13BfYOZJ0dO', 8, '+374', '90000028', 1, 456783, 3),
(29, 'Armine Poghosyan', 'armine.poghosyan@example.com', '$2y$10$13WzTpP1evz9ZQFZRsayxezN.PmfHMkTbMx7qgSQOBxihfvEqPv3K', 9, '+374', '90000029', 0, 567894, 2),
(30, 'Hakob Musayelyan', 'hakob.musayelyan@example.com', '$2y$10$SJqvNc.mpu1A42uO7XTu6eJp9gJ8ug8BlmDotE/vunRxq/2sd3vNC', 10, '+374', '90000030', 1, 678905, 1),
(31, 'Meline Alaverdyan', 'meline.alaverdyan@example.com', '$2y$10$ca5rInHVAYET25phjKUBjep6U82Kr0u1wlRhBaN2c/TPtq8j1vCXC', 1, '+374', '90000031', 0, 789016, 3),
(32, 'Arthur Gasparyan', 'arthur.gasparyan@example.com', '$2y$10$LkC0wF4yY.VxP9ibSKQY/eihARpSb3h7SkrYHFMXGbTgpo4QIN0sS', 2, '+374', '90000032', 1, 890127, 1),
(33, 'Gayane Chobanyan', 'gayane.chobanyan@example.com', '$2y$10$R7q3HigAVOk64usnmh4pXOdVlalnm2emXvr4EeSzW2iMmo9wynQHi', 3, '+374', '90000033', 0, 901238, 2),
(34, 'Samvel Mkrtchyan', 'samvel.mkrtchyan@example.com', '$2y$10$GwSt9vGFO6IEnmaIkWsHX.eivSfnDITPELy0n8f3e9MPwgWfy.2We', 4, '+374', '90000034', 1, 345987, 3),
(35, 'Mari Amirkhanyan', 'mari.amirkhanyan@example.com', '$2y$10$iwyWgLBO8JLiuPYn8vmI..2JJKQAIbTg9W7PTMD5HO2i8rZnzuf6e', 5, '+374', '90000035', 0, 210394, 2),
(36, 'Gor Hovsepyan', 'gor.hovsepyan@example.com', '$2y$10$oAkc2HOTRUSaM7biDWPvCeiX.7fbcGwIAoNSX9OGMrFvfDMPljLO.', 6, '+374', '90000036', 1, 900145, 1),
(37, 'Armida Kirakosyan', 'armida.kirakosyan@example.com', '$2y$10$3gnimnDz15AFVueJT6qOR.Zif1MeYHTj.S.Rqdco1Iaj0Wp/VOTcC', 7, '+374', '90000037', 0, 998541, 3),
(38, 'Tatev Movsisyan', 'tatev.movsisyan@example.com', '$2y$10$8IyVzFnbpNEAyqLmhQ2KSO5MA539oXS.eeWMrnZU8SeR8895lwnXe', 8, '+374', '90000038', 1, 778899, 2),
(39, 'Suren Petikyan', 'suren.petikyan@example.com', '$2y$10$Lvd73f1ifAuuXbqBsg4ZVe.wVyFfw51qI0czySzJ5bYGVnMSL6q4y', 9, '+374', '90000039', 0, 100200, 1),
(40, 'Elen Hambardzumyan', 'elen.hambardzumyan@example.com', '$2y$10$J/VBM.Qr.kGja.X/4EZyDeBpfXTjXU2bYmAjDvtKL50hko2pUTEYO', 10, '+374', '90000040', 1, 202020, 3),
(41, 'Ashot Zakaryan', 'ashot.zakaryan@example.com', '$2y$10$yNbLfIuWbSGobea3LHFyoeufJBgOIEhgHIsuIv4LK8OqpGcgx8526', 1, '+374', '90000041', 0, 333444, 1),
(42, 'Karine Torosyan', 'karine.torosyan@example.com', '$2y$10$/46LYY3l9wRvJk2S9s/akuJlIYzXKMAWrOTVkBLw4yJEtgZWeenxS', 2, '+374', '90000042', 1, 444555, 2),
(43, 'Ruben Hambartsumyan', 'ruben.hambartsumyan@example.com', '$2y$10$QD0BuRDMbKzZhBFwVqgNRel3bd9od80osSYQyUGy50e4xbcd/Vc0a', 3, '+374', '90000043', 0, 555666, 3),
(44, 'Susanna Jraghatspanyan', 'susanna.jraghatspanyan@example.com', '$2y$10$7RswLOOeoLO4Np6ed/QjiuChpHYK86oiVWjiVolBWjdQSH99kiA2S', 4, '+374', '90000044', 1, 666777, 1),
(45, 'Karen Voskanyan', 'karen.voskanyan@example.com', '$2y$10$lzjtGvBFYikrbrA6PgX7j.d/D0pa5BlyaLIo.MLxxTXUYy5x77LSS', 5, '+374', '90000045', 0, 777888, 3),
(46, 'Arusyak Qocharyan', 'arusyak.qocharyan@example.com', '$2y$10$/1u1WhkTJkERzdcNKuOKEOtOsl15I6HvjYlUIAHKijfJUc86vCBzK', 6, '+374', '90000046', 1, 888999, 2),
(47, 'Mher Gevorgyan', 'mher.gevorgyan@example.com', '$2y$10$mPDvNMvQFF7MqLXPzCj0xuEYyYy670hgYd.50W.i7EUgGb5LzKD8a', 7, '+374', '90000047', 0, 999000, 1),
(48, 'Seda Danielyan', 'seda.danielyan@example.com', '$2y$10$MipTg9Nivj2VEeLQHKTWeuP9Q9EHDdxnVvCWoCZxKdgYVz8mvodAe', 8, '+374', '90000048', 1, 112233, 2),
(49, 'Vahram Hovhannisyan', 'vahram.hovhannisyan@example.com', '$2y$10$ZZSZPlQJRE0M8NQt7N2iEuH5VnH8i9MfDt.RUNMF.GCRCMACieZvO', 9, '+374', '90000049', 0, 445566, 3),
(50, 'Nairi Karapetyan', 'nairi.karapetyan@example.com', '$2y$10$2snTiewDLUDKr9xftjzs/e2IOYqlPbVYzgHV.5FexFUNQdMP1uC4S', 10, '+374', '90000050', 1, 778899, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_answers`
--

CREATE TABLE `student_answers` (
  `id` int(11) NOT NULL,
  `student_exam_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student_answers`
--

INSERT INTO `student_answers` (`id`, `student_exam_id`, `question_id`, `answer`) VALUES
(1, 3, 1, 3),
(2, 3, 2, 2),
(3, 3, 3, 1),
(4, 3, 4, 2),
(5, 3, 5, 3),
(6, 3, 6, 3),
(7, 3, 7, 2),
(8, 3, 8, 2),
(9, 3, 9, 2),
(10, 3, 10, 3),
(11, 1, 1, 1),
(12, 1, 2, 3),
(13, 1, 4, 3),
(14, 1, 6, 1),
(15, 1, 10, 4),
(16, 1, 7, 2),
(17, 1, 5, 1),
(19, 1, 3, 2),
(20, 1, 9, 4),
(26, 4, 1, 3),
(27, 4, 2, 2),
(28, 4, 6, 1),
(29, 4, 8, 2),
(31, 5, 11, 2),
(32, 5, 12, 2),
(34, 5, 13, 1),
(35, 5, 14, 3),
(37, 5, 15, 1),
(38, 5, 16, 2),
(43, 5, 17, 4),
(44, 5, 18, 1),
(46, 5, 21, 1),
(47, 5, 22, 3),
(48, 5, 19, 1),
(49, 5, 20, 4),
(50, 5, 23, 4),
(51, 5, 25, 3),
(52, 5, 24, 3),
(54, 6, 11, 2),
(55, 6, 12, 2),
(56, 6, 14, 3),
(57, 6, 13, 2),
(58, 6, 16, 2),
(59, 6, 18, 1),
(60, 6, 20, 4),
(61, 6, 23, 4),
(62, 6, 21, 1),
(64, 6, 15, 1),
(65, 7, 11, 2),
(66, 7, 12, 2),
(68, 7, 14, 3),
(69, 7, 24, 3),
(70, 7, 21, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student_exam`
--

CREATE TABLE `student_exam` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `process` int(11) NOT NULL DEFAULT 1,
  `start` timestamp NOT NULL DEFAULT current_timestamp(),
  `end` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student_exam`
--

INSERT INTO `student_exam` (`id`, `exam_id`, `student_id`, `process`, `start`, `end`) VALUES
(1, 1, 11, 0, '2025-12-12 11:50:52', '2025-12-12 11:53:05'),
(3, 1, 1, 0, '2025-12-12 11:51:18', '2025-12-12 11:53:08'),
(4, 1, 41, 1, '2025-12-12 12:03:39', NULL),
(5, 2, 41, 0, '2025-12-12 14:37:59', '2025-12-12 14:39:14'),
(6, 2, 11, 0, '2025-12-12 14:39:18', '2025-12-12 14:39:47'),
(7, 2, 1, 0, '2025-12-12 14:39:59', '2025-12-12 14:40:31');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subject` varchar(70) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `year_level` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subject`, `faculty_id`, `year_level`) VALUES
(1, 'Programming (Python, Java, C++)', 1, 1),
(2, 'Software Engineering', 1, 2),
(3, 'Web & Mobile App Development', 1, 2),
(4, 'Cybersecurity', 1, 3),
(5, 'Robotics & AI', 1, 3),
(6, 'Physics & Chemistry', 1, 1),
(7, 'Electrical & Mechanical Systems', 1, 2),
(8, 'Data Structures & Algorithms', 1, 2),
(9, 'Network Systems', 1, 3),
(10, 'Environmental Science', 1, 1),
(11, 'Accounting & Financial Management', 2, 1),
(12, 'Business Strategy & Operations', 2, 2),
(13, 'Microeconomics & Macroeconomics', 2, 1),
(14, 'Marketing Principles', 2, 1),
(15, 'Entrepreneurship & Innovation', 2, 2),
(16, 'Human Resource Management', 2, 3),
(17, 'E-commerce & Digital Business', 2, 2),
(18, 'International Trade', 2, 3),
(19, 'Business Ethics', 2, 1),
(20, 'Organizational Behavior', 2, 2),
(21, 'Psychology (Cognitive, Clinical, Behavioral)', 3, 1),
(22, 'Sociology & Anthropology', 3, 2),
(23, 'History (World, Regional, Political)', 3, 1),
(24, 'Philosophy & Critical Thinking', 3, 1),
(25, 'Political Science & Governance', 3, 2),
(26, 'Ethics & Social Justice', 3, 2),
(27, 'Journalism & Media Studies', 3, 3),
(28, 'Linguistics & Literature', 3, 1),
(29, 'Public Policy', 3, 3),
(30, 'Cultural Studies', 3, 2),
(31, 'Human Anatomy & Physiology', 4, 1),
(32, 'Microbiology & Immunology', 4, 2),
(33, 'Public Health & Epidemiology', 4, 3),
(34, 'Clinical Nursing Skills', 4, 2),
(35, 'Biochemistry & Genetics', 4, 1),
(36, 'Health Psychology', 4, 2),
(37, 'Nutrition & Dietetics', 4, 3),
(38, 'Pharmacology', 4, 3),
(39, 'Medical Ethics', 4, 1),
(40, 'First Aid & Emergency Care', 4, 1),
(41, 'Constitutional & Administrative Law', 5, 1),
(42, 'Criminal Law', 5, 2),
(43, 'Civil Law & Tort Law', 5, 2),
(44, 'International Human Rights', 5, 3),
(45, 'Contract & Commercial Law', 5, 2),
(46, 'Legal Writing & Research', 5, 1),
(47, 'Environmental Law', 5, 3),
(48, 'Cyber Law', 5, 2),
(49, 'Legal Ethics', 5, 1),
(50, 'Courtroom Procedures', 5, 3),
(51, 'Pedagogy & Learning Theories', 6, 1),
(52, 'Classroom Management', 6, 2),
(53, 'Educational Psychology', 6, 1),
(54, 'Curriculum Design', 6, 2),
(55, 'Special Education Methods', 6, 3),
(56, 'Child Development', 6, 1),
(57, 'Instructional Technology', 6, 2),
(58, 'Language Teaching', 6, 3),
(59, 'Assessment & Evaluation', 6, 2),
(60, 'Educational Leadership', 6, 3),
(61, 'Drawing & Painting', 7, 1),
(62, 'Graphic & Web Design', 7, 1),
(63, 'Photography & Visual Communication', 7, 2),
(64, 'Interior & Fashion Design', 7, 2),
(65, 'Art History & Theory', 7, 1),
(66, 'Animation & 3D Modeling', 7, 3),
(67, 'Branding & Typography', 7, 2),
(68, 'Digital Media Production', 7, 3),
(69, 'Theater & Performing Arts', 7, 1),
(70, 'Film Studies', 7, 2),
(71, 'Architectural Design', 8, 1),
(72, 'Building Materials & Construction', 8, 2),
(73, 'Urban Planning & Development', 8, 3),
(74, 'CAD & 3D Visualization', 8, 1),
(75, 'History of Architecture', 8, 1),
(76, 'Sustainable Design', 8, 2),
(77, 'Structural Systems', 8, 3),
(78, 'Interior Architecture', 8, 2),
(79, 'Landscape Architecture', 8, 3),
(80, 'Smart Cities & Future Planning', 8, 3),
(81, 'Soil Science & Agronomy', 9, 1),
(82, 'Plant Biology & Crop Production', 9, 1),
(83, 'Animal Science', 9, 2),
(84, 'Food Safety & Technology', 9, 2),
(85, 'Environmental Impact Assessment', 9, 3),
(86, 'Climate Change & Sustainability', 9, 3),
(87, 'Agricultural Machinery', 9, 2),
(88, 'Organic Farming', 9, 1),
(89, 'Resource Management', 9, 2),
(90, 'Water & Soil Conservation', 9, 3),
(91, 'Global Politics & Diplomacy', 10, 1),
(92, 'International Organizations (UN, NATO, etc.)', 10, 2),
(93, 'Conflict Resolution', 10, 3),
(94, 'Migration & Refugee Policy', 10, 2),
(95, 'Geopolitics', 10, 1),
(96, 'Foreign Policy Analysis', 10, 3),
(97, 'Global Economy', 10, 1),
(98, 'Comparative Political Systems', 10, 2),
(99, 'Peace & Security Studies', 10, 3),
(100, 'Human Rights & International Law', 10, 2);

-- --------------------------------------------------------

--
-- Table structure for table `test_names`
--

CREATE TABLE `test_names` (
  `id` int(11) NOT NULL,
  `prof_subject_id` int(11) NOT NULL,
  `test_name` varchar(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `test_names`
--

INSERT INTO `test_names` (`id`, `prof_subject_id`, `test_name`, `date`) VALUES
(1, 1, 'programming test 1', '2025-12-12 15:39:29'),
(2, 1, 'PHP test 1', '2025-12-12 18:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `test_questions`
--

CREATE TABLE `test_questions` (
  `id` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL DEFAULT '"',
  `opt_1` varchar(255) NOT NULL DEFAULT '"',
  `opt_2` varchar(255) NOT NULL DEFAULT '"',
  `opt_3` varchar(255) NOT NULL DEFAULT '"',
  `opt_4` varchar(255) NOT NULL DEFAULT '"',
  `answer` int(1) NOT NULL DEFAULT 1,
  `points` int(2) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `test_questions`
--

INSERT INTO `test_questions` (`id`, `test_id`, `question`, `opt_1`, `opt_2`, `opt_3`, `opt_4`, `answer`, `points`) VALUES
(1, 1, 'Python — What is the output of <code data-start=\"264\" data-end=\"281\">print(type([]))</code>?', '&lt;class \'tuple\'&gt;', '&lt;class \'dict\'&gt;', '&lt;class \'list\'&gt;', '&lt;class \'set\'&gt;', 3, 2),
(2, 1, 'JavaScript — What is the result of <code data-start=\"447\" data-end=\"460\">typeof null</code>?', '\"null\"', '\"object\"', '\"undefined\"', '\"none\"', 2, 1),
(3, 1, '&nbsp;C++ — Which header is required for <code data-start=\"601\" data-end=\"614\">std::vector</code>?', '&lt;string&gt;', '&lt;vector&gt;', '&lt;array&gt;', '&lt;list&gt;', 2, 3),
(4, 1, 'Python — What does <code data-start=\"737\" data-end=\"751\">len(\"Hello\")</code> return?', '4', '5', ' 6', 'Error', 2, 1),
(5, 1, 'JavaScript — Which comparison checks both value AND type?', '==', '==', '===', '!=', 3, 2),
(6, 1, 'C++ — Which operator is used to allocate memory dynamically?', 'new', 'malloc', 'alloc', 'create', 1, 3),
(7, 1, 'Python — What is the output of <code data-start=\"1157\" data-end=\"1167\">bool(\"\")</code>?', 'True', 'False', '\"\"', 'Error', 2, 1),
(8, 1, '&nbsp;JavaScript — What does <code data-start=\"1279\" data-end=\"1305\">Array.isArray([1, 2, 3])</code> return?', 'false', 'true', '\"array\"', 'Error', 2, 1),
(9, 1, '9. C++ — Which of the following is a correct while loop?', 'while x &lt; 5 { ... }', 'while (x &lt; 5) { ... }', 'while x &lt; 5: ...', 'loop(x &lt; 5)', 2, 2),
(10, 1, 'Python — Which data type is <em data-start=\"1629\" data-end=\"1640\">immutable</em>?', 'List', 'Dictionary', 'Tuple', '&nbsp;Set', 3, 2),
(11, 2, 'Which symbol is used to declare a variable in PHP?', '#', '$', '@', '%', 2, 1),
(12, 2, 'What is the correct way to start a PHP block?', '&lt;php&gt;', '&lt;?php', '&lt;?php&gt;', '&lt;script php?', 2, 1),
(13, 2, 'Which function is used to output text in PHP?', 'echo()', 'console.log()', 'printf()', 'write()', 1, 2),
(14, 2, 'Which operator is used for string concatenation in PHP?', '+', '&amp;', '.', ':', 3, 1),
(15, 2, 'Which of the following is an array function?', 'count()', 'strlen()', 'indexOf()', 'slice()', 1, 3),
(16, 2, 'What does <code data-start=\"900\" data-end=\"909\">isset()</code> do?', 'Checks if a variable is empty', 'Checks if a variable exists and is not null', 'Deletes a variable', 'Converts a value to integer', 2, 2),
(17, 2, 'What is the correct way to write a comment in PHP?', '&lt;!-- comment --&gt;', '# comment', '// comment', 'Both B and C', 4, 1),
(18, 2, 'Which function returns the length of a string?', 'strlen()', 'size()', 'len()', 'count()', 1, 1),
(19, 2, 'How do you create an associative array in PHP?', '[\"name\" =&gt; \"John\"]', 'array(\"name\" = \"John\")', '{name: \"John\"}', '(\"name\" =&gt; \"John\")', 1, 2),
(20, 2, 'What is the default value of an uninitialized variable?', '\"null\"', 'undefined', '0', 'NULL', 4, 2),
(21, 2, 'Which superglobal contains form POST data?', '$_POST', '$_FORM', '$_REQUEST', '$_DATA', 1, 3),
(22, 2, 'How do you include a file in PHP?', 'include file.php', 'import \"file.php\"', 'include \"file.php\";', 'load(\"file.php\")', 3, 1),
(23, 2, 'Which function is used to stop script execution?', 'break()', 'stop()', 'halt()', 'exit()', 4, 1),
(24, 2, 'Which of the following is used to start a session?', 'session_begin()', 'start_session()', 'session_start()', 'init_session()', 3, 2),
(25, 2, 'What does <code data-start=\"2416\" data-end=\"2421\">===</code> check in PHP?', ' Value only', 'Type only', ' Value and type', 'Memory address', 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exam_results`
--
ALTER TABLE `exam_results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `exam_id` (`exam_id`);

--
-- Indexes for table `exam_start`
--
ALTER TABLE `exam_start`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_start_ibfk_1` (`test_id`);

--
-- Indexes for table `faculties`
--
ALTER TABLE `faculties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `faculty` (`faculty`);

--
-- Indexes for table `professors`
--
ALTER TABLE `professors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `prof_subjects`
--
ALTER TABLE `prof_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `prof_id` (`prof_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `student_answers`
--
ALTER TABLE `student_answers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_exam_id` (`student_exam_id`,`question_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `student_exam`
--
ALTER TABLE `student_exam`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`exam_id`),
  ADD KEY `exam` (`exam_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `faculty_id` (`faculty_id`);

--
-- Indexes for table `test_names`
--
ALTER TABLE `test_names`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prof_subject` (`prof_subject_id`);

--
-- Indexes for table `test_questions`
--
ALTER TABLE `test_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test_` (`test_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exam_results`
--
ALTER TABLE `exam_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `exam_start`
--
ALTER TABLE `exam_start`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `faculties`
--
ALTER TABLE `faculties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `professors`
--
ALTER TABLE `professors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `prof_subjects`
--
ALTER TABLE `prof_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `student_answers`
--
ALTER TABLE `student_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `student_exam`
--
ALTER TABLE `student_exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `test_names`
--
ALTER TABLE `test_names`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `test_questions`
--
ALTER TABLE `test_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exam_results`
--
ALTER TABLE `exam_results`
  ADD CONSTRAINT `exam_results_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `exam_results_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `exam_start` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `exam_start`
--
ALTER TABLE `exam_start`
  ADD CONSTRAINT `exam_start_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `test_names` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `prof_subjects`
--
ALTER TABLE `prof_subjects`
  ADD CONSTRAINT `prof_subjects_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prof_subjects_ibfk_2` FOREIGN KEY (`prof_id`) REFERENCES `professors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_answers`
--
ALTER TABLE `student_answers`
  ADD CONSTRAINT `student_answers_ibfk_1` FOREIGN KEY (`student_exam_id`) REFERENCES `student_exam` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `student_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `test_questions` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `student_exam`
--
ALTER TABLE `student_exam`
  ADD CONSTRAINT `exam` FOREIGN KEY (`exam_id`) REFERENCES `exam_start` (`id`),
  ADD CONSTRAINT `student_exam_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `faculty_id` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `test_names`
--
ALTER TABLE `test_names`
  ADD CONSTRAINT `prof_subject` FOREIGN KEY (`prof_subject_id`) REFERENCES `prof_subjects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `test_questions`
--
ALTER TABLE `test_questions`
  ADD CONSTRAINT `test_` FOREIGN KEY (`test_id`) REFERENCES `test_names` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
